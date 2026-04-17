/*kintaro floating textbox*/

document.addEventListener("DOMContentLoaded", function () {
  const kintaroFloatingTextbox = document.querySelector(
    '[data-kintaro="kintaro-floating-textbox-1"]',
  );
  const kintaroFloatingTextboxLabel = document.querySelector(
    '[data-kintaro="kintaro-floating-textbox-label-1"]',
  );

  function kintaroFloatingTextboxLabelInteraction() {
    if (kintaroFloatingTextbox.value) {
      kintaroFloatingTextboxLabel.classList.add(
        "kintaro-floating-textbox-label-motion",
      );
    } else {
      kintaroFloatingTextboxLabel.classList.remove(
        "kintaro-floating-textbox-label-motion",
      );
    }
  }

  kintaroFloatingTextbox.addEventListener(
    "focus",
    kintaroFloatingTextboxLabelInteraction,
  );
  kintaroFloatingTextbox.addEventListener(
    "blur",
    kintaroFloatingTextboxLabelInteraction,
  );
  kintaroFloatingTextbox.addEventListener(
    "input",
    kintaroFloatingTextboxLabelInteraction,
  );

  kintaroFloatingTextboxLabelInteraction();
});

/*kintaro floating textbox end*/

/*kintaro floating icon textbox*/

document.addEventListener("DOMContentLoaded", function () {
  const kintaroFloatingIconTextbox = document.querySelector(
    '[data-kintaro="kintaro-floating-icon-textbox-1"]',
  );
  const kintaroFloatingIconTextboxLabel = document.querySelector(
    '[data-kintaro="kintaro-floating-icon-textbox-label-1"]',
  );
  const kintaroFloatingIconTextboxImage = document.querySelector(
    '[data-kintaro="kintaro-floating-icon-textbox-image-1"]',
  );

  function kintaroFloatingIconTextboxInteraction() {
    if (kintaroFloatingIconTextbox.value) {
      kintaroFloatingIconTextboxLabel.classList.add(
        "kintaro-floating-icon-textbox-label-motion",
      );
      kintaroFloatingIconTextboxImage.classList.add(
        "kintaro-floating-icon-textbox-image-display",
      );
    } else {
      kintaroFloatingIconTextboxLabel.classList.remove(
        "kintaro-floating-icon-textbox-label-motion",
      );
      kintaroFloatingIconTextboxImage.classList.remove(
        "kintaro-floating-icon-textbox-image-display",
      );
    }
  }

  kintaroFloatingIconTextbox.addEventListener(
    "focus",
    kintaroFloatingIconTextboxInteraction,
  );
  kintaroFloatingIconTextbox.addEventListener(
    "blur",
    kintaroFloatingIconTextboxInteraction,
  );
  kintaroFloatingIconTextbox.addEventListener(
    "input",
    kintaroFloatingIconTextboxInteraction,
  );

  kintaroFloatingIconTextboxInteraction();
});

/*kintaro floating icon textbox end*/

/*kintaro floating multiline*/

document.addEventListener("DOMContentLoaded", function () {
  const kintaroFloatingMultiline = document.querySelector(
    '[data-kintaro="kintaro-floating-multiline-1"]',
  );
  const kintaroFloatingMultilineLabel = document.querySelector(
    '[data-kintaro="kintaro-floating-multiline-label-1"]',
  );

  function kintaroFloatingMultilineInteraction() {
    if (kintaroFloatingMultiline.value) {
      kintaroFloatingMultilineLabel.classList.add(
        "kintaro-floating-multiline-label-motion",
      );
    } else {
      kintaroFloatingMultilineLabel.classList.remove(
        "kintaro-floating-multiline-label-motion",
      );
    }
  }

  kintaroFloatingMultiline.addEventListener(
    "focus",
    kintaroFloatingMultilineInteraction,
  );
  kintaroFloatingMultiline.addEventListener(
    "blur",
    kintaroFloatingMultilineInteraction,
  );
  kintaroFloatingMultiline.addEventListener(
    "input",
    kintaroFloatingMultilineInteraction,
  );

  kintaroFloatingMultilineInteraction();
});

/*kintaro floating multiline end*/

/*kintaro floating icon multiline*/

document.addEventListener("DOMContentLoaded", function () {
  const kintaroFloatingIconMultiline = document.querySelector(
    '[data-kintaro="kintaro-floating-icon-multiline-1"]',
  );
  const kintaroFloatingIconMultilineLabel = document.querySelector(
    '[data-kintaro="kintaro-floating-icon-multiline-label-1"]',
  );
  const kintaroFloatingIconMultilineImage = document.querySelector(
    '[data-kintaro="kintaro-floating-icon-multiline-image-1"]',
  );

  function kintaroFloatingIconMultilineInteraction() {
    if (kintaroFloatingIconMultiline.value) {
      kintaroFloatingIconMultilineLabel.classList.add(
        "kintaro-floating-icon-multiline-label-motion",
      );
      kintaroFloatingIconMultilineImage.classList.add(
        "kintaro-floating-icon-multiline-image-display",
      );
    } else {
      kintaroFloatingIconMultilineLabel.classList.remove(
        "kintaro-floating-icon-multiline-label-motion",
      );
      kintaroFloatingIconMultilineImage.classList.remove(
        "kintaro-floating-icon-multiline-image-display",
      );
    }
  }

  kintaroFloatingIconMultiline.addEventListener(
    "focus",
    kintaroFloatingIconMultilineInteraction,
  );
  kintaroFloatingIconMultiline.addEventListener(
    "blur",
    kintaroFloatingIconMultilineInteraction,
  );
  kintaroFloatingIconMultiline.addEventListener(
    "input",
    kintaroFloatingIconMultilineInteraction,
  );

  kintaroFloatingIconMultilineInteraction();
});

/*kintaro floating icon multiline end*/
