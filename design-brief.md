# EverSolid Construction — Design Brief

## 1. 專案定位
單頁(1440px desktop,含 RWD)概念重設計演示,呈現為**真實官方公司網頁**(非明顯標示的作品集 demo)。對象是 EverSolid Construction——貝里斯的建築公司,服務涵蓋住宅、餐廳、五金/金屬工程、飯店。前端獨立專案,無真實後端。

**敘事主軸:建案實績導向**——以「我們蓋過什麼」為核心線索,而非強調服務廣度或匠人工藝。

## 2. 受眾設定
**B2C 終端客戶**:貝里斯當地的自建居家屋主、小型餐廳/飯店業主。
案例展示應場景化、故事化,強調信任感與溝通順暢度,而非數據化的預算/工期指標。

## 3. 成功判準
**模擬商業轉化指標**——假設這是真實公司網站,每個設計決策都以「這會不會讓真實客戶想透過 WhatsApp/Email 聯絡我們」為判斷標準。視覺創意服務於轉化,而非純粹炫技。

## 4. 視覺方向
**淡雅現代建築風**,參考 Vitruvius Built 的國際化中性調(黑白灰 + 一個強調色、簡極字體、大幅攝影跨頁)。在案例標籤、icon 等細節中加入少量貝里斯地方元素,避免完全去地方化。

## 5. 內容範圍與頁面結構(單頁五大區塊)
1. **Hero** — 全螢幕背景照片輪播,標語:「Building the Spaces Where Life Happens.」
2. **公司簡介** — 「EverSolid, a professional construction company helps you build your custom home or commercial space.」
3. **What We Build**
   - Residential — Custom homes and renovations built to last generations
   - Commercial — Restaurant, Hardware, Hotel
4. **Why Choose Us** — 4 大信任重點(客戶實際提供文案):
   - Fast & Professional Construction — 準時交付、不偷工減料,速度與品質並存
   - Planning & Material Guidance — 動工前協助客戶做出正確的材料與工法選擇
   - Great Communication — 清楚更新、誠實工期、直接聯繫窗口
   - Over 20 Years of Experience — 深耕貝里斯 20 年,熟悉當地氣候、法規與人脈
5. **CTA** — WhatsApp(主,+501 624-4333)/ Email(備選,info@eversolidbz.com)

整體風格:極簡但不空洞。

## 6. 技術路線
- **框架**:React + TypeScript + Vite + Tailwind CSS
- **渲染架構**:SSG 靜態輸出(如 vite-ssg 或 prerender 外掛),而非純 CSR——確保 SEO 與社群分享預覽(LINE/FB/WhatsApp 連結卡片)正確抓取內容
- **捲動/動畫引擎**:GSAP(含 ScrollTrigger)+ Lenis 平滑捲動
- **Hero 輪播**:與捲動動畫同一套 GSAP Timeline 控制(非純 CSS keyframes、非第三方輪播庫),5 張背景圖、約 3 秒換一張、fade + scale(1.06) ease-out 放大效果、降低 brightness 維持文字可讀性

## 7. 邊界情況(訪客未按預期互動)
提供**簡易 fallback**:
- 基礎 HTML 內容(文字、第一張 Hero 圖)在 JS/GSAP 載入失敗時仍可見,不依賴 JS 才能讀取核心資訊
- 尊重 `prefers-reduced-motion` 系統設定——關閉輪播自動播放,改為靜態圖或手動切換

## 8. CTA 終點
**WhatsApp 為主要 CTA**(點擊後透過 wa.me 連結直接開啟對話),**Email 為次要 CTA**。此排序符合貝里斯/拉丁美洲市場以 WhatsApp 為主流商業聯絡工具的使用習慣。

## 9. SEO 備註
因採 SSG,建置時輸出的靜態 HTML 需包含:
- 完整 meta 標籤(title、description、Open Graph、Twitter Card)
- 具語意的標題階層與 alt text(尤其 Hero 輪播圖與 What We Build 案例圖)
- sitemap.xml

---
*本 Brief 各項方向已於訪談中逐題拍板,無待決開放問題。確認後將據此產出 PRD。*
