import json
import os
import requests
from playwright.sync_api import sync_playwright

class BotMotoru:
    def __init__(self, config):
        self.config = config
        self.image_folder = "downloaded_images"

    def log(self, message):
        return f"[LOG] {message}"

    def ceviri_al(self, page, selector_name):
        i18n_selector = f"input[name='{selector_name}_i18n']"
        normal_selector = f"*[name='{selector_name}']"
        
        if page.locator(i18n_selector).count() > 0:
            try:
                val = page.input_value(i18n_selector)
                if val: return json.loads(val)
            except: pass
        
        if page.locator(normal_selector).count() > 0:
            return {"tr": page.input_value(normal_selector)}
        
        return {"tr": ""}

    def resim_indir(self, url, id_no):
        if not os.path.exists(self.image_folder): os.makedirs(self.image_folder)
        try:
            full_url = url if "http" in url else f"{self.config['url']['base']}{url}"
            ext = full_url.split('.')[-1].split('?')[0]
            if len(ext) > 5: ext = "jpg"
            filename = f"urun_{id_no}.{ext}"
            path = os.path.join(self.image_folder, filename)
            
            r = requests.get(full_url, timeout=10)
            if r.status_code == 200:
                with open(path, 'wb') as f: f.write(r.content)
                return {"url": full_url, "yerel_yol": path}
        except Exception as e:
            return None
        return None

    def calistir(self):
        yield self.log("Bot starting...")
        
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=False)
            page = browser.new_page()

            try:
                yield self.log("Logging in...")
                page.goto(self.config['url']['login'])
                page.fill("input[name='email']", self.config['credentials']['email'])
                page.fill("input[name='password']", self.config['credentials']['password'])
                page.click("button[type='submit']")
                page.wait_for_load_state("networkidle")
            except Exception as e:
                yield self.log(f"Login Error: {e}")
                return

            start = self.config['settings']['start_id']
            end = self.config['settings']['end_id']
            results = []

            for id_no in range(start, end + 1):
                url = f"{self.config['url']['base']}/admin/products/{id_no}/edit"
                try:
                    page.goto(url)
                    if "/edit" not in page.url:
                        yield self.log(f"ID {id_no}: Boş/Atlandı")
                        continue

                    page.wait_for_selector("input[name='name']", timeout=3000)
                    
                    item_data = {"eski_id": id_no}
                    
                    for field in self.config['fields']:
                        key = field['key']       
                        selector = field['selector'] 
                        f_type = field['type']  
                        
                        if f_type == 'translatable':
                            item_data[key] = self.ceviri_al(page, selector)
                        else:
                            sel = f"*[name='{selector}']"
                            if page.locator(sel).count() > 0:
                                item_data[key] = page.input_value(sel)
                            else:
                                item_data[key] = ""

                    cat_id = page.input_value("select[name='category_id']")
                    cat_name = page.eval_on_selector("select[name='category_id']", "el => el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : ''").strip()
                    item_data['kategori_adi'] = cat_name
                    item_data['eski_kategori_id'] = cat_id

                    img_sel = "div[data-field-name='image'] img"
                    if page.locator(img_sel).count() > 0:
                        src = page.locator(img_sel).first.get_attribute("src")
                        if src:
                            item_data['resim'] = self.resim_indir(src, id_no)

                    results.append(item_data)
                    yield self.log(f"ID {id_no}: [OK] {item_data.get('ad', {}).get('tr', 'İsimsiz')}")

                except Exception as e:
                    yield self.log(f"ID {id_no}: ERROR - {e}")

            with open('scraped_data.json', 'w', encoding='utf-8') as f:
                json.dump(results, f, ensure_ascii=False, indent=4)
            
            yield self.log("-" * 20)
            yield self.log(f"Process finished! {len(results)} records saved to 'scraped_data.json'.")
            browser.close()