# EverSolid Hero Page — Design Review
調整項目(依優先順序)

### 1. 遮罩改成方向性漸層
目前是整張圖等強度的黑色半透明,文字對比不足且畫面層次被壓平。
```
background: linear-gradient(to top right,
  rgba(0,0,0,0.75) 0%,
  rgba(0,0,0,0.4) 45%,
  rgba(0,0,0,0.1) 100%);
```
左下文字區最深、右上天空最淡,文字對比提升同時保留照片層次感。

### 2. Nav 改透明,捲動後才變實色
目前實心白色 nav 直接壓在深色照片上,形成很硬的分界線。
- 初始狀態:nav 背景 `transparent`,文字/logo 改白色,疊在 Hero 照片上
- 監聽 scroll:捲動超過 Hero 高度(例如 80vh)後,nav 才切換成現在這種實心白底
- 效果:進頁第一眼是照片與文字融合的沉浸感,不會被硬邊界切成上下兩塊

### 3. Hero 缺主要 CTA → 改放在 nav 常駐
- 目前 Hero 內完全沒有 CTA 按鈕(使用者選擇維持 Hero 簡潔,此為明確設計取捨)
- 建議:在 nav 右側(EN 切換器左邊)加一個常駐小型 CTA,如外框樣式「Get a Quote」或 WhatsApp icon,連到 wa.me 連結
- 效果:Hero 本身維持乾淨無按鈕,但訪客整頁捲動時永遠有轉化入口在視線內,呼應「模擬商業轉化」的成功判準

### 4. 副標題拉開層次
「BELIZE CONSTRUCTION, BUILT ON TWENTY YEARS OF PROVEN WORK.」目前字重、字距與 nav 項目幾乎一樣,看起來像 UI 元素而非 Hero 敘事延伸。
- 字重從 regular/light 調到 medium(500–600)
- letter-spacing 加大到約 `0.08em`
- 與標題最後一行的 margin-top 從目前 ~16px 拉開到 32–40px

### 5.(可選)橘色標題行視覺重量微調
若想讓橘色更精緻而非「特賣感」,可將「Where Life Happens.」的飽和度降一階(例如帶一點咖啡調的橘,如 `#D9531F` 混一點灰階),與照片中木頭、磚土的自然色調更協調。純美感調整,對目前橘色已滿意可跳過。

---
