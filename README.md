# Kairoo Landing Page

一個現代化的landing page，用於展示Kairoo社交連接應用，並提供早期訪問註冊功能。

## 🚀 功能特色

- **響應式設計**: 適配所有設備尺寸
- **早期訪問註冊**: 收集用戶email進行產品發布通知
- **現代化UI**: 使用Tailwind CSS和React
- **SEO優化**: 包含完整的meta標籤和Open Graph標籤
- **快速加載**: 使用Vite進行優化構建

## 🛠️ 技術棧

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons

## 📦 安裝和運行

### 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev
```

### 構建生產版本

```bash
# 構建生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 🌐 部署選項

### 1. Netlify (推薦)

1. 將代碼推送到GitHub
2. 在Netlify中連接GitHub倉庫
3. 構建命令: `npm run build`
4. 發布目錄: `dist`

### 2. Vercel

1. 將代碼推送到GitHub
2. 在Vercel中導入GitHub倉庫
3. 框架選擇: Vite
4. 自動部署

### 3. GitHub Pages

```bash
# 安裝gh-pages
npm install --save-dev gh-pages

# 添加部署腳本到package.json
"deploy": "npm run build && gh-pages -d dist"

# 部署
npm run deploy
```

### 4. 其他靜態主機

構建後將`dist`目錄上傳到任何靜態主機服務。

## 📧 Email收集功能

目前使用localStorage作為臨時存儲。要集成真實的email服務，可以：

1. **SendGrid**: 發送email通知
2. **Mailchimp**: 管理郵件列表
3. **Supabase**: 數據庫存儲
4. **Firebase**: 完整的後端服務

### 集成示例 (SendGrid)

```typescript
// 在EarlyAccessForm.tsx中替換模擬API調用
const response = await fetch('/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});
```

## 🎨 自定義

### 顏色主題

在`tailwind.config.js`中修改顏色：

```javascript
theme: {
  extend: {
    colors: {
      orange: {
        50: '#fff7ed',
        600: '#ea580c',
        700: '#c2410c',
      }
    }
  }
}
```

### 內容修改

- 更新`App.tsx`中的文本內容
- 修改`index.html`中的meta標籤
- 替換圖片和logo

## 📱 響應式設計

網站已針對以下設備優化：
- 桌面 (1200px+)
- 平板 (768px - 1199px)
- 手機 (< 768px)

## 🔧 開發腳本

```bash
npm run dev      # 啟動開發服務器
npm run build    # 構建生產版本
npm run preview  # 預覽生產版本
npm run lint     # 代碼檢查
```

## 📄 許可證

MIT License

## 🤝 貢獻

歡迎提交Issue和Pull Request！

---

Made with ❤️ for Kairoo 