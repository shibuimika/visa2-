/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 2色 + グレー のシンプルパレット
        // ブルー: アクセント、承認、リンク、ボタン
        primary: {
          50: '#e8f0f8',
          100: '#c5d9ed',
          200: '#9ec1e0',
          300: '#6fa3cf',
          400: '#4d8ac3',
          500: '#3D74B6', // メイン
          600: '#3566a3',
          700: '#2b548a',
          800: '#224471',
          900: '#1a3558',
        },
        // レッド: 警告、緊急、要修正のみ
        alert: {
          50: '#fdf3f2',
          100: '#fbe5e3',
          200: '#f8ccc7',
          300: '#f2a59d',
          400: '#e8736a',
          500: '#DC3C22', // メイン
          600: '#c42f19',
          700: '#a52616',
        },
        // グレーはTailwindデフォルトを使用
      },
      fontFamily: {
        sans: ['Inter', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
