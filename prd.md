# EverSolid Construction — PRD

依據 `design-brief.md` 已拍板方向撰寫。

## 一、MoSCoW 功能清單

### Must Have
- Hero 全螢幕背景照片輪播(GSAP Timeline 控制,5 張圖、3 秒/張)
- 全頁 GSAP ScrollTrigger 進場動畫 + Lenis 平滑捲動
- 單頁五區塊結構:Hero / 公司簡介 / What We Build / Why Choose Us / CTA
- RWD(desktop 1440 / tablet / mobile 斷點)
- SSG 靜態輸出 + SEO meta(title、description、OG、Twitter Card、sitemap.xml)
- CTA:WhatsApp(主,wa.me 連結)+ Email(次,mailto 連結)
- 無 JS / prefers-reduced-motion 的簡易 fallback

### Should Have
- What We Build 四類案例(住宅/餐廳/五金/飯店)各附代表圖與短描述
- Why Choose Us 三大重點(溝通透明、主理人親自把關、工藝堅持)
- 案例區塊融入少量貝里斯地方視覺元素(icon/標籤)
- 所有圖片具語意化 alt text
- Hero 以外圖片 lazy-load

### Could Have
- Section 圖片的輕度 scroll-linked parallax(非 Hero)
- CTA 按鈕 hover 微互動(如輕微 scale 或顏色過渡)
- 案例卡片 hover 時的圖片放大效果

### Won't Have(本次範圍不做)
- 真實表單提交或任何後端串接(WhatsApp/Email 皆為純前端連結轉址)
- CMS / 內容管理後台
- 多頁面(不做獨立 /about、/projects、/contact 頁)
- 部落格
- 報價試算或線上預約系統
- 會員 / 登入系統
- 多語言切換(除非後續於開放問題中拍板)
- 任何分析追蹤工具串接(GA 等)

## 二、逐功能驗收條件

**Hero 輪播**
- Hero 標語文字為「Building the Spaces Where Life Happens.」,可依版面斷行、不要求單行呈現
- 5 張圖以 GSAP Timeline 播放,每張顯示 3000ms 後淡入淡出切換至下一張,切換同時觸發 `scale(1) → scale(1.06)` ease-out forwards 放大效果
- 背景圖疊加暗化處理,使 Hero 文字與背景對比度達 WCAG AA 標準(一般文字 ≥4.5:1,大標題 ≥3:1)
- 瀏覽器分頁切至背景(`document.hidden === true`)時 Timeline 自動 pause,回到前景時 resume
- 開啟系統 `prefers-reduced-motion: reduce` 時,輪播不自動播放且不執行 scale 動畫,僅顯示第一張圖

**頁面捲動與進場動畫**
- 頁面使用 Lenis 初始化平滑捲動
- 各 section 於進入視窗 80% 時觸發一次進場動畫(如 fade-up),不重複觸發
- 停用 JavaScript 時,頁面仍維持一般文件流可捲動(非因動畫函式庫初始化失敗而卡死或空白)

**RWD**
- 於 1440px / 768px / 375px 三個斷點下皆無橫向捲動,文字與圖片不重疊、不溢出容器
- Hero 於 mobile 斷點下仍以全螢幕呈現(圖片數量與輪播行為見開放問題)

**SEO**
- 對靜態輸出的 HTML 執行 `curl` 或檢視原始碼(無需執行 JS),可直接讀到完整 `<title>`、`meta description`、Open Graph 與 Twitter Card 標籤
- `sitemap.xml` 存在且可透過瀏覽器直接存取
- 所有 `<img>` 皆有具體描述性 alt text(非空字串或檔名)

**CTA**
- 主要 CTA 按鈕為 `<a href="https://wa.me/5016244333">` 連結(對應 +501 624-4333),點擊於新分頁開啟 WhatsApp 對話
- 次要 CTA 按鈕為 `<a href="mailto:info@eversolidbz.com">` 連結,點擊開啟系統預設郵件客戶端並帶入預填主旨
- 主要與次要 CTA 於視覺上尺寸、顏色權重明顯不同(如主要為實心填色、次要為外框樣式)

**Why Choose Us**
- 呈現以下 4 個重點區塊,各自包含 icon/圖示 + 標題 + 描述文字,文案採用客戶提供內容(不得改寫核心語意):
  1. Fast & Professional Construction — We deliver projects on schedule without cutting corners — speed and quality are not trade-offs.
  2. Planning & Material Guidance — We help you make the right choices for your project — from materials to methods, before ground breaks.
  3. Great Communication — Clear updates, honest timelines, and direct access. You are never left wondering what is happening.
  4. Over 20 Years of Experience — Two decades of building in Belize. We know the climate, the regulations, and the people.

**What We Build**
- 呈現以下 2 大類別,各類別至少 1 張代表圖:
  1. Residential — Custom homes and renovations built to last generations
  2. Commercial — Restaurant, Hardware, Hotel(可視覺上拆為 3 個子項或以 icon 群組呈現)

**Fallback / 邊界情況**
- 於瀏覽器 devtools 停用 JavaScript 後重新整理,頁面文字內容與至少一張 Hero 圖片仍可見
- 開啟系統 reduce motion 設定後重新整理,確認輪播與 ScrollTrigger 進場動畫皆不自動播放

## 三、非目標(明確不做)
- 不處理任何真實使用者資料收集、儲存或傳送(表單、電子報訂閱等)
- 不建置後端 API 或資料庫
- 不做 CMS 或任何內容可由非工程師編輯的後台
- 不做除首頁外的其他頁面路由
- 不做多語言介面切換
- 不整合第三方分析或行銷追蹤工具
- 不做無障礙以外的瀏覽器相容性保證(僅保證主流現代瀏覽器 Chrome/Safari/Edge/Firefox 最新兩個版本)

## 四、開放問題(尚未拍板,待確認)
- Hero 在 mobile/tablet 斷點下的圖片張數與輪播行為,是否與 desktop 的 5 張/3 秒相同,或需簡化(如改為靜態單圖)
- WhatsApp 主要 CTA 是否需要預填訊息文字(目前僅確認號碼 +501 624-4333,尚未提供預填文案)
- 品牌視覺資產:Logo、主要字型、強調色(accent color)色碼尚未提供
- Hero 與 What We Build 所需的實際案例照片素材來源、數量與規格
- 網域名稱與部署平台(Vercel / Netlify / GitHub Pages 等)
- 網站語言範圍(僅英文,或需涵蓋西班牙文/中文)
- Favicon、PWA manifest 等基礎站台資產是否需要準備

已解決(原開放問題,現已拍板):
- WhatsApp 聯絡號碼:+501 624-4333
- Email 聯絡地址:info@eversolidbz.com
- Hero 標語、公司簡介、What We Build、Why Choose Us 文案內容(見上方各章節)
