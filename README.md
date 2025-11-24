# 医疗移动端项目

基于 React + Vite + Tailwind CSS 的移动端项目

## 技术栈

- React 18
- Vite 5
- React Router (Hash模式)
- Tailwind CSS 3

## 项目结构

```
src/
  ├── components/     # 公共组件
  ├── pages/          # 页面组件
  ├── App.jsx         # 主应用组件
  ├── main.jsx        # 入口文件
  └── index.css       # 全局样式
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 路由

项目使用 Hash 路由模式，访问地址示例：
- 首页: `http://localhost:3000/#/`
- 关于页: `http://localhost:3000/#/about`

