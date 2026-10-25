# 个人网站技术 Q&A

---

## Q1: 技术栈是什么？

**前端**：Vue 3.5（Composition API + `<script setup>`）+ TypeScript + Vite 8  
**样式**：Tailwind CSS v4  
**动画**：GSAP（页面过渡、惯性拖拽）+ CSS @keyframes  
**3D**：Three.js（雪花粒子背景）  
**路由**：Vue Router 4（History Mode）

---

## Q2: 怎么部署的？

```
GitHub 仓库（namink/jusliu-website）
  ↓ git push
Cloudflare Pages（免费）
  ↓ 自动构建 npm run build → dist/
Cloudflare CDN 全球分发
```

构建命令：`npm run build`，输出目录：`dist`

---

## Q3: 怎么配的自定义域名？

1. **阿里云** 购买 `voxoart.com`
2. DNS 修改 → Nameserver 指向 Cloudflare（carlos.ns.cloudflare.com / crystal.ns.cloudflare.com）
3. Cloudflare Pages → 自定义域 → 绑定 `voxoart.com`
4. **自动 HTTPS**（Cloudflare SSL 免费）

全程无需 ICP 备案（境外托管）。

---

## Q4: 图片和视频放哪？

**Cloudflare R2 对象存储**（免费套餐）

| 指标 | 额度 |
|------|------|
| 存储 | 10 GB |
| 出站流量 | 无限 |
| A 类操作 | 100 万次/月 |
| B 类操作 | 1000 万次/月 |

托管内容：图片(.jpg)、视频(.mp4)、图标(.png)、音频(.mp3)。  
公开 URL 前缀：`https://pub-xxx.r2.dev/works/...`

---

## Q5: 项目怎么组织的？

```
src/
├── views/        3 页（首页 / 作品集 / 关于）
├── components/   11 组件（轮播/导航/技能/时间轴/粒子/图片预览...）
├── composables/  5 逻辑复用（拖拽滚动/i18n/视频预加载/GSAP过渡/滚轮导航）
├── data/         数据源（30 件作品，7 分类）
├── router/       Vue Router 配置
└── styles/       Tailwind + 自定义动画
```

---

## Q6: 有哪些功能亮点？

| 功能 | 实现方式 |
|------|---------|
| 胶片卡片轮播 | JS rAF 驱动 + 3 倍数据无缝循环 + 触屏拖拽 |
| 拖拽惯性 | 松手后 velocity × 0.94 衰减 |
| 全屏图片预览 | Teleport + 遮罩 + ESC 关闭 |
| 视频内联播放 | poster 封面 + controls + 鼠标移出暂停 |
| 中英文切换 | composable useI18n + localStorage 持久化 |
| Three.js 粒子 | 1500 雪花粒子 + 鼠标视差 |
| GSAP 页面过渡 | Vue Transition + GSAP Timeline |
| 对角线文字飘带 | CSS animation + transform rotate |
| 背景音乐 | Audio API + 播放态指示点 |

---

## Q7: 本地怎么跑？

```powershell
git clone https://github.com/namink/jusliu-website.git
cd jusliu-website
npm install
npm run dev        # → http://localhost:5173
```

要求：Node.js ≥ 18，npm ≥ 9

---

## Q8: 怎么更新上线？

```powershell
# 修改代码后
npm run build        # 本地验证
git add .
git commit -m "描述改动"
git push origin main
```

Cloudflare Pages 自动检测 GitHub push → 构建 → 部署，**2 分钟内上线**。
