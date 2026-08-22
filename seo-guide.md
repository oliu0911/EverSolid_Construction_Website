# EverSolid Construction — SEO 落地指引

依 `design-brief.md` / `prd.md` 已拍板的技術路線(SSG 靜態輸出)與定位(貝里斯在地 B2C 建築公司)整理,依優先順序排列。

## 1. 技術 SEO(架構層,最優先)
- 用 vite-ssg 或 prerender 外掛建置,確認 `view-source` 能直接看到完整文字(不依賴 JS 執行)
- 每頁補上 `<title>`、meta description(獨特、含關鍵字,控制在 150–160 字內)
- 加入 Open Graph 與 Twitter Card meta(`og:title`、`og:image`、`og:description`),讓 WhatsApp/FB 分享連結有正確預覽圖
- 產出 `sitemap.xml` 與 `robots.txt`,並提交至 Google Search Console
- 所有圖片(Hero 1 張、案例圖)皆需具體描述性 alt text,不可空字串或檔名

## 2. 在地 SEO(Local SEO,對建築業最關鍵)
- 註冊並完整填寫 Google Business Profile(公司名稱、地址、電話 +501 624-4333、營業類別選 General Contractor)
- 於頁面(如 footer 或 CTA 區塊)加入結構化資料 `schema.org` 的 `LocalBusiness`/`GeneralContractor` 標記(含地址、電話、服務範圍)
- 確保網站上的公司名稱、電話、地址(NAP:Name, Address, Phone)與 Google Business Profile 完全一致
- 內文自然帶入地名關鍵字,如「Belize construction company」「custom home builder Belize」「commercial construction Belize」

## 3. 內容/On-page SEO
- 標題階層需有語意:H1 用 Hero 標語或公司名+核心服務;H2 對應 What We Build / Why Choose Us 各區塊
- Why Choose Us 與 What We Build 文案中自然融入服務關鍵字(residential construction、commercial construction、renovation)
- 確認頁面語言標記 `<html lang="en">`
- 若後續有案例照片,檔名使用具語意的英文命名(而非 IMG_1234.jpg)

## 4. 效能與行動裝置(影響排名的隱性因素)
- Hero 背景圖使用現代格式(WebP/AVIF)並適當壓縮,避免單張圖過大拖慢首屏
- 非 Hero 圖片(Gallery section)做 lazy-load(PRD 已列為 Should Have)
- 用 Lighthouse 或 PageSpeed Insights 檢查 SSG 輸出後成績,目標 Performance 分數 90+
- 行動裝置優先測試(mobile-first indexing),確保手機版排版與載入速度優先於桌機版

---
