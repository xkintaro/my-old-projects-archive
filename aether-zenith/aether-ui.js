/* ==========================================================================
   AETHER CORE UI - Headless & Utility-First Controller
   ========================================================================== */

const AetherUI = {
  // --- CONFIGURATION ---
  config: {
    hiddenClass: "hidden",
    blockScrollClass: "overflow-hidden",
    themeStorageKey: "theme",
    domRefreshDebounce: 150,
    resizeDebounce: 300,
    transitionBuffer: 50,
    syncUrl: true,
  },

  // --- STATE & CACHE ---
  state: {},
  openStack: [],
  initialized: false,
  observer: null,
  focusHandlers: new WeakMap(),
  _scrollbarWidth: undefined,
  _resizeHandler: null,

  init() {
    if (this.initialized) return;

    try {
      this.handleGlobalClick = this.handleGlobalClick.bind(this);
      this.handleGlobalKey = this.handleGlobalKey.bind(this);
      this.handlePopstate = this.handlePopstate.bind(this);

      this.initTheme();
      this.bindEvents();
      this.refreshDOM();
      this.observeDOM();
      this.handleHashOnLoad();

      this._resizeHandler = this.debounce(() => {
        this._scrollbarWidth = undefined;
      }, this.config.resizeDebounce);
      window.addEventListener("resize", this._resizeHandler);
      window.addEventListener("popstate", this.handlePopstate);

      this.initialized = true;
      console.log("💎 AetherUI v1.0.0.2 Ready (Modal Stack Fix)");
    } catch (err) {
      console.error("AetherUI Init Error:", err);
    }
  },

  destroy() {
    this.observer?.disconnect();
    this.unbindEvents();
    if (this._resizeHandler) {
      window.removeEventListener("resize", this._resizeHandler);
      this._resizeHandler = null;
    }
    window.removeEventListener("popstate", this.handlePopstate);
    document.body.classList.remove(this.config.blockScrollClass);
    document.body.style.paddingRight = "";
    this.initialized = false;
    this.openStack = [];
    this.state = {};
    this.focusHandlers = new WeakMap();
    this._scrollbarWidth = undefined;
  },

  debounce(fn, wait = 100) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  },

  forceReflow(el) {
    void el.offsetWidth;
  },

  dispatch(el, eventName, detail = {}) {
    if (el)
      el.dispatchEvent(
        new CustomEvent(`aether:${eventName}`, { bubbles: true, detail })
      );
  },

  updateHash(id) {
    if (!this.config.syncUrl || !id) return;
    history.replaceState(null, null, `#${id}`);
  },

  clearHash(id) {
    if (!this.config.syncUrl) return;
    if (window.location.hash === `#${id}`) {
      history.replaceState(
        null,
        null,
        window.location.pathname + window.location.search
      );
    }
  },

  handlePopstate() {
    const hash = window.location.hash.substring(1);
    if (!hash) {
      const lastOpen = this.openStack[this.openStack.length - 1];
      if (lastOpen) this.closeElement(lastOpen);
    } else {
      this.handleHashOnLoad();
    }
  },

  handleHashOnLoad() {
    if (!this.config.syncUrl) return;
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const target = document.getElementById(hash);
    if (!target) return;

    if (target.getAttribute("data-ui") === "tab-panel") {
      const group = target.closest('[data-ui="tab-group"]');
      if (group && group.hasAttribute("data-sync-url")) {
        const trigger = group.querySelector(
          `[data-trigger="tab"][data-target="${hash}"]`
        );
        if (trigger) this.activateTab(trigger, true);
      }
    } else {
      const trigger = document.querySelector(
        `[data-trigger="ui-control"][data-target="${hash}"]`
      );
      if (
        trigger &&
        trigger.hasAttribute("data-sync-url") &&
        !this.state[hash]
      ) {
        this.toggle(trigger, "show");
      }
    }
  },

  get prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  get scrollbarWidth() {
    if (this._scrollbarWidth === undefined) {
      const outer = document.createElement("div");
      outer.style.cssText =
        "visibility:hidden;overflow:scroll;position:absolute;top:-9999px";
      document.body.appendChild(outer);
      const inner = document.createElement("div");
      outer.appendChild(inner);
      this._scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
      outer.remove();
    }
    return this._scrollbarWidth;
  },

  getClasses: (el, attr) =>
    (el.getAttribute(attr) || "").split(" ").filter(Boolean),
  getAllTriggers: (id) => document.querySelectorAll(`[data-target="${id}"]`),
  getScopedChildren(parent, selector, groupSelector) {
    return Array.from(parent.querySelectorAll(selector)).filter(
      (el) => el.closest(groupSelector) === parent
    );
  },

  observeDOM() {
    if (this.observer) return;
    this.observer = new MutationObserver((mutations) => {
      const relevant = mutations.some(
        (m) =>
          m.type === "childList" ||
          (m.type === "attributes" && m.attributeName.startsWith("data-"))
      );
      if (relevant)
        this.debounce(
          () => this.refreshDOM(),
          this.config.domRefreshDebounce
        )();
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-ui", "data-trigger", "data-target"],
    });
  },

  refreshDOM() {
    this.setupAccessibility();
    this.initTabs();
    this.initAccordions();
  },

  getTransitionDuration(el) {
    if (this.prefersReducedMotion) return 0;
    const s = getComputedStyle(el);
    const parse = (v) =>
      (v ? (v.endsWith("ms") ? parseFloat(v) : parseFloat(v) * 1000) : 0) || 0;
    const dur = (s.transitionDuration || "0s").split(",").map(parse);
    const del = (s.transitionDelay || "0s").split(",").map(parse);
    return Math.max(...dur) + Math.max(...del);
  },

  ensureTransitionEnd(el, cb) {
    const dur = this.getTransitionDuration(el);
    if (dur === 0) return cb();
    let fired = false;
    const fn = (e) => {
      if (!fired && (!e || e.target === el)) {
        fired = true;
        el.removeEventListener("transitionend", fn);
        cb();
      }
    };
    el.addEventListener("transitionend", fn, { once: true });
    setTimeout(fn, dur + this.config.transitionBuffer);
  },

  applyStateClasses(el, isActive, manageVis = true, skipAnim = false) {
    if (this.prefersReducedMotion) skipAnim = true;
    const activeCls = this.getClasses(el, "data-active-class");
    const inactiveCls = this.getClasses(el, "data-inactive-class");
    const hasTrans =
      (activeCls.length || inactiveCls.length) &&
      this.getTransitionDuration(el) > 0;

    if (isActive) {
      if (manageVis) el.classList.remove(this.config.hiddenClass);
      const apply = () => {
        if (inactiveCls.length) el.classList.remove(...inactiveCls);
        if (activeCls.length) el.classList.add(...activeCls);
      };
      if (hasTrans && !skipAnim) {
        this.forceReflow(el);
        requestAnimationFrame(apply);
      } else apply();
    } else {
      const explicitlyHidden = inactiveCls.includes(this.config.hiddenClass);
      const apply = () => {
        if (activeCls.length) el.classList.remove(...activeCls);
        if (inactiveCls.length) el.classList.add(...inactiveCls);
      };
      if (hasTrans && !skipAnim && !explicitlyHidden) {
        apply();
        if (manageVis) {
          this.ensureTransitionEnd(el, () => {
            const current = Array.from(el.classList);
            if (!activeCls.some((c) => current.includes(c)))
              el.classList.add(this.config.hiddenClass);
          });
        }
      } else {
        apply();
        if (manageVis) el.classList.add(this.config.hiddenClass);
      }
    }
  },

  trapFocus(el) {
    const getFocusable = () =>
      el.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
    const focusable = getFocusable();

    if (focusable.length === 0) {
      el.setAttribute("tabindex", "-1");
      el.focus();
      return;
    }

    const handler = (e) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (!items.length) return;
      const first = items[0],
        last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    this.focusHandlers.set(el, handler);
    el.addEventListener("keydown", handler);
    try {
      focusable[0].focus();
    } catch (err) {
      console.warn("AetherUI: Focus error", err);
    }
  },

  untrapFocus(el) {
    const handler = this.focusHandlers.get(el);
    if (handler) {
      el.removeEventListener("keydown", handler);
      this.focusHandlers.delete(el);
    }
  },

  closeElement(id) {
    const el = document.getElementById(id);
    const state = this.state[id];
    if (!state) return;

    this.openStack = this.openStack.filter((i) => i !== id);

    try {
      if (el) {
        if (state.trapFocus) this.untrapFocus(el);
        this.applyStateClasses(el, false, true);
        el.querySelectorAll("[data-active-class]").forEach((c) =>
          this.applyStateClasses(c, false, false)
        );
        this.getAllTriggers(id).forEach((t) => {
          t.setAttribute("aria-expanded", "false");
          this.applyStateClasses(t, false, false);
        });
        this.dispatch(el, "close");
        this.clearHash(id);
      }
    } catch (e) {
      console.error("AetherUI Close Error:", e);
    } finally {
      const wasLocked = state.scrollLock;
      const returnTo = state.returnFocusTo;
      delete this.state[id];
      if (wasLocked) this.manageScrollLock();

      if (returnTo && document.body.contains(returnTo)) {
        returnTo.focus();
      }
    }
  },

  toggle(trigger, action) {
    const id = trigger.getAttribute("data-target");
    const el = document.getElementById(id);
    if (!el) return console.warn(`AetherUI: Target "${id}" not found.`);

    if (action === "remove") {
      this.applyStateClasses(el, false, true);
      this.ensureTransitionEnd(el, () => {
        el.remove();
        if (this.state[id]) {
          const wasLocked = this.state[id].scrollLock;
          this.openStack = this.openStack.filter((i) => i !== id);
          delete this.state[id];
          if (wasLocked) this.manageScrollLock();
        }
      });
      return;
    }

    const isExp = trigger.getAttribute("aria-expanded") === "true";
    const active =
      action === "show" ? true : action === "hide" ? false : !isExp;

    if (active && this.state[id]) return;

    if (active) {
      [...this.openStack].reverse().forEach((openId) => {
        const openEl = document.getElementById(openId);
        if (!openEl) return;

        if (openEl.contains(el)) return;

        if (openEl.hasAttribute("data-scroll-lock")) return;

        if (openEl.hasAttribute("data-click-outside")) {
          this.closeElement(openId);
        }
      });
    }

    this.getAllTriggers(id).forEach((t) => {
      t.setAttribute("aria-expanded", active);
      this.applyStateClasses(t, active, false);
    });
    this.applyStateClasses(el, active, true);
    el.querySelectorAll("[data-active-class]").forEach((c) =>
      this.applyStateClasses(c, active, false)
    );

    if (active) {
      const isModal = el.hasAttribute("data-scroll-lock");
      this.state[id] = {
        clickOutside: el.hasAttribute("data-click-outside"),
        scrollLock: isModal,
        trapFocus: isModal,
        returnFocusTo: trigger,
      };
      this.openStack.push(id);
      this.dispatch(el, "open");

      if (this.config.syncUrl && trigger.hasAttribute("data-sync-url")) {
        this.updateHash(id);
      }

      if (isModal) {
        this.manageScrollLock();
        this.ensureTransitionEnd(el, () => {
          if (this.state[id] && this.state[id].trapFocus) this.trapFocus(el);
        });
      }
    } else {
      this.closeElement(id);
    }
  },

  manageScrollLock() {
    const hasLocks = Object.values(this.state).some((s) => s.scrollLock);
    const b = document.body;
    if (hasLocks) {
      if (!b.classList.contains(this.config.blockScrollClass)) {
        if (document.documentElement.scrollHeight > window.innerHeight)
          b.style.paddingRight = `${this.scrollbarWidth}px`;
        b.classList.add(this.config.blockScrollClass);
      }
    } else {
      b.classList.remove(this.config.blockScrollClass);
      b.style.paddingRight = "";
    }
  },

  initTabs() {
    document.querySelectorAll('[data-ui="tab-group"]').forEach((g) => {
      if (g.dataset.init) return;
      const triggers = this.getScopedChildren(
        g,
        '[data-trigger="tab"]',
        '[data-ui="tab-group"]'
      );
      const panels = this.getScopedChildren(
        g,
        '[data-ui="tab-panel"]',
        '[data-ui="tab-group"]'
      );
      let def = null;
      const defaultId = g.dataset.defaultTab;
      if (defaultId) def = triggers.find((t) => t.dataset.target === defaultId);
      if (!def && triggers.length > 0) def = triggers[0];

      const activeId = def?.dataset.target;

      panels.forEach((p) => {
        p.setAttribute("role", "tabpanel");
        p.id !== activeId
          ? (p.classList.add(this.config.hiddenClass),
            p.setAttribute("aria-hidden", "true"))
          : p.setAttribute("aria-hidden", "false");
      });
      triggers.forEach((t) => {
        t.setAttribute("role", "tab");
        t.setAttribute("aria-selected", "false");
        t.setAttribute("tabindex", "-1");
      });
      if (def) this.activateTab(def, true);
      g.dataset.init = "true";
    });
  },

  activateTab(t, skip = false) {
    const g = t.closest('[data-ui="tab-group"]');
    const id = t.dataset.target;
    if (!g || !id) return;
    const triggers = this.getScopedChildren(
      g,
      '[data-trigger="tab"]',
      '[data-ui="tab-group"]'
    );
    const panels = this.getScopedChildren(
      g,
      '[data-ui="tab-panel"]',
      '[data-ui="tab-group"]'
    );

    triggers.forEach((b) => {
      b.setAttribute("aria-selected", "false");
      b.setAttribute("tabindex", "-1");
      this.applyStateClasses(b, false, false, skip);
    });
    panels.forEach((p) => {
      this.applyStateClasses(p, false, true, true);
      p.setAttribute("aria-hidden", "true");
    });

    t.setAttribute("aria-selected", "true");
    t.setAttribute("tabindex", "0");
    this.applyStateClasses(t, true, false, skip);
    const active = panels.find((p) => p.id === id);
    if (active) {
      this.applyStateClasses(active, true, true, skip);
      active.setAttribute("aria-hidden", "false");
      this.dispatch(active, "tab-change", { id });

      if (this.config.syncUrl && g.hasAttribute("data-sync-url")) {
        this.updateHash(id);
      }
    }
  },

  initAccordions() {
    document.querySelectorAll('[data-ui="accordion-group"]').forEach((g) => {
      if (g.dataset.init) return;
      const defs = this.getScopedChildren(
        g,
        "[data-default-accordion]",
        '[data-ui="accordion-group"]'
      );
      const triggers = this.getScopedChildren(
        g,
        '[data-trigger="accordion"]',
        '[data-ui="accordion-group"]'
      );
      const panels = this.getScopedChildren(
        g,
        '[data-ui="accordion-panel"]',
        '[data-ui="accordion-group"]'
      );
      const ids = defs.map((t) => t.dataset.target);

      panels.forEach((p) => {
        ids.includes(p.id)
          ? p.setAttribute("aria-hidden", "false")
          : (p.classList.add(this.config.hiddenClass),
            p.setAttribute("aria-hidden", "true"));
      });
      triggers.forEach((t) => {
        t.setAttribute("role", "button");
        t.setAttribute("aria-expanded", defs.includes(t) ? "true" : "false");
        if (t.dataset.target) t.setAttribute("aria-controls", t.dataset.target);
      });
      defs.forEach((t) => this.toggleAccordion(t, true, true));
      g.dataset.init = "true";
    });
  },

  toggleAccordion(t, force, skip = false) {
    const g = t.closest('[data-ui="accordion-group"]');
    if (!g) return;
    const id = t.dataset.target;
    const p = this.getScopedChildren(
      g,
      `[data-ui="accordion-panel"][id="${id}"]`,
      '[data-ui="accordion-group"]'
    )[0];
    if (!p) return;

    const active = force ?? !(t.getAttribute("aria-expanded") === "true");
    if (active && !g.hasAttribute("data-allow-multiple")) {
      const otherTriggers = this.getScopedChildren(
        g,
        '[data-trigger="accordion"][aria-expanded="true"]',
        '[data-ui="accordion-group"]'
      );
      otherTriggers.forEach((ot) => {
        if (ot !== t) {
          ot.setAttribute("aria-expanded", "false");
          this.applyStateClasses(ot, false, false, skip);
          const op = this.getScopedChildren(
            g,
            `[data-ui="accordion-panel"][id="${ot.dataset.target}"]`,
            '[data-ui="accordion-group"]'
          )[0];
          if (op) {
            this.applyStateClasses(op, false, true, skip);
            op.setAttribute("aria-hidden", "true");
          }
        }
      });
    }
    t.setAttribute("aria-expanded", active);
    this.applyStateClasses(t, active, false, skip);
    this.applyStateClasses(p, active, true, skip);
    p.setAttribute("aria-hidden", !active);
    if (active) this.dispatch(p, "accordion-open");
  },

  setupAccessibility: () =>
    document
      .querySelectorAll('[data-ui="tab-group"]')
      .forEach((g) => g.setAttribute("role", "tablist")),
  initTheme() {
    const set = (t) => {
      document.documentElement.classList.remove("light", "dark");
      if (
        t === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      )
        document.documentElement.classList.add("dark");
      else if (t !== "system") document.documentElement.classList.add(t);
    };
    const stored =
      localStorage.getItem(this.config.themeStorageKey) || "system";
    set(stored);
    this.setTheme = (t) => {
      localStorage.setItem(this.config.themeStorageKey, t);
      set(t);
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        if (
          (localStorage.getItem(this.config.themeStorageKey) || "system") ===
          "system"
        )
          set("system");
      });
  },

  handleRoving(e, items, cur, loop = true) {
    const idx = items.indexOf(cur),
      max = items.length - 1;
    let n = null;
    if (["ArrowRight", "ArrowDown"].includes(e.key))
      n = idx >= max ? (loop ? 0 : max) : idx + 1;
    else if (["ArrowLeft", "ArrowUp"].includes(e.key))
      n = idx <= 0 ? (loop ? max : 0) : idx - 1;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = max;
    if (n !== null) {
      e.preventDefault();
      items[n].focus();
      return items[n];
    }
  },

  handleGlobalClick(e) {
    const th = e.target.closest("[data-theme]");
    if (th) return this.setTheme(th.dataset.theme);
    const tr = e.target.closest("[data-trigger]");
    if (tr) {
      if (tr.tagName === "A") e.preventDefault();
      const type = tr.dataset.trigger,
        act = tr.dataset.action || "toggle";
      if (type === "ui-control") this.toggle(tr, act);
      else if (type === "tab") this.activateTab(tr);
      else if (type === "accordion") this.toggleAccordion(tr);
      return;
    }
    const last = this.openStack[this.openStack.length - 1];
    if (!last) return;
    const st = this.state[last],
      el = document.getElementById(last);
    if (
      st?.clickOutside &&
      el &&
      !e.target.closest(`[data-target="${last}"]`)
    ) {
      if (
        (st.scrollLock && e.target === el) ||
        (!st.scrollLock && !el.contains(e.target))
      )
        this.closeElement(last);
    }
  },

  handleGlobalKey(e) {
    if (e.target.matches("input,textarea,select,[contenteditable]")) {
      if (e.key === "Escape") e.target.blur();
      return;
    }
    if (e.key === "Escape") {
      const last = this.openStack[this.openStack.length - 1];
      if (
        last &&
        (this.state[last].clickOutside || this.state[last].scrollLock)
      ) {
        e.preventDefault();
        this.closeElement(last);
      }
      return;
    }
    const tab = e.target.closest('[role="tab"]'),
      acc = e.target.closest('[data-trigger="accordion"]');
    if (tab) {
      const group = tab.closest('[role="tablist"]');
      const items = this.getScopedChildren(
        group,
        '[role="tab"]:not([disabled])',
        '[role="tablist"]'
      );
      const next = this.handleRoving(e, items, tab);
      if (next) this.activateTab(next);
    } else if (acc) {
      const group = acc.closest('[data-ui="accordion-group"]');
      const items = this.getScopedChildren(
        group,
        '[data-trigger="accordion"]:not([disabled])',
        '[data-ui="accordion-group"]'
      );
      this.handleRoving(e, items, acc);
    } else if (["Enter", " "].includes(e.key)) {
      const t = e.target.closest("[data-trigger]");
      if (t && t.tagName !== "BUTTON") {
        e.preventDefault();
        t.click();
      }
    }
  },

  bindEvents() {
    document.addEventListener("click", this.handleGlobalClick);
    document.addEventListener("keydown", this.handleGlobalKey);
  },
  unbindEvents() {
    document.removeEventListener("click", this.handleGlobalClick);
    document.removeEventListener("keydown", this.handleGlobalKey);
  },
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => AetherUI.init());
} else {
  AetherUI.init();
}
