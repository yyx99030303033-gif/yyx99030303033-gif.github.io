# AI Builder 个人作品集

Vue 3 + Vite 静态单页，无后端、无数据库。真实作品资料集中在 `src/content.js`，首页与其余结构在 `src/App.vue`，样式在 `src/style.css`。

## 本地开发

需要 Node.js 20.19+ 或 22.12+（建议当前 LTS）。

```powershell
cd D:\codex_Files\游戏\ai-builder-portfolio
npm install
npm run dev
```

打开命令行显示的 Local 地址。停止服务按 Ctrl+C。

## 替换内容

- 修改 `src/content.js` 中的姓名、介绍、邮箱、简历地址和项目资料。
- 图片放入 `public/images/`，对应 `cover` 填 `/images/文件名.webp`。
- 简历放入 `public/resume.pdf`，`resumeUrl` 填 `/resume.pdf`。
- `playUrl` / `videoUrl` 填真实 HTTPS 链接；空值只显示待补充状态。
- 游戏经历与工作流章节目前为待填写结构，补充实际记录后再正式用于投递。
- 占位封面使用 CSS 图形，并明确标注不是实际作品画面。不要把占位示意当成项目成果。
- 当前 Three.js 部分仅是作品展示位置，未加载 Three.js 场景或复杂动画。

## 生产打包

```powershell
npm run build
npm run preview
```

`dist/` 是可部署成品。开发源码和 `node_modules/` 不需要上传。

重新生成 Direct Upload ZIP（在项目目录运行）：

```powershell
Compress-Archive -Path .\dist\* -DestinationPath .\cloudflare-pages-upload.zip -Force
```

ZIP 根目录应直接包含 `index.html`、`assets/` 和 `favicon.svg`，不能再套一层项目文件夹。

## Cloudflare Pages 免费部署（Direct Upload）

1. 登录 https://dash.cloudflare.com/ ，进入 **Workers & Pages**。
2. 点击 **Create application**，找到 **Pages**，选择 **Get started / Drag and drop your files**（上传静态文件）。控制台文案可能略有不同，确保创建的是 Pages 的 Direct Upload 项目。
3. 输入项目名，例如 `my-ai-builder-portfolio`；不连接 GitHub 或 GitLab。
4. 上传本项目的 `cloudflare-pages-upload.zip`，或直接拖入 `dist` 文件夹。
5. 点击 **Deploy site / Save and Deploy**。
6. 等待成功后打开 Cloudflare 返回的 `https://项目名.pages.dev`。名称被占用时可能会附加字符，以控制台显示为准。
7. 检查首页、作品锚点、移动菜单，以及浏览器刷新；手机也打开同一个 HTTPS 地址验证。

无需购买域名或公开源码仓库。选择免费计划即可；不需要启用数据库、Functions 或付费服务。上传的是可公开访问的网页成品，浏览器可读取其 HTML/CSS/JS，因此不要把密钥或私人资料放入前端。

更新网站：修改内容 → `npm run build` → 重新生成 ZIP → 项目中 **Create a new deployment** → 选择 **Production** → 上传新包。正式地址保持不变。

Direct Upload 项目后续不能原地切换为 Git 集成，需要时另外创建 Git 集成项目。

官方说明：https://developers.cloudflare.com/pages/get-started/direct-upload/

## 本轮范围

基础视觉、响应式布局、手机菜单、锚点跳转、键盘焦点和减少动态效果偏好已实现。没有虚构业绩、奖项或项目指标。参考 https://hafsausmani.com/ 的大标题和作品优先的信息组织，未复制其个人内容或资源。

## 原创粒子花谷首屏

`src/ParticleValley.vue` 使用 Three.js 和自定义 GLSL 绘制程序化五瓣花粒子、两侧山谷与空中微尘，不依赖参考网站的素材、脚本或音频。首屏具有缓慢镜头漂移、鼠标扰动和探索按钮悬停散开效果。下方内容通过 IntersectionObserver 渐入。

移动端减少粒子和像素比，离开首屏或页面隐藏时暂停渲染；尊重系统减少动态效果设置。WebGL 不可用时保留渐变夜色背景和完整页面文字。没有添加背景音频。

已检查桌面与 390px 手机布局、生产预览、菜单展开与关闭、作品锚点和章节显现；检查时浏览器未报告渲染错误。

## 粒子雕塑升级

首屏现为原创 GPU 粒子雕塑，桌面约 38,000 粒子，手机初始加载约 14,000 粒子。支持星核、流结、星环三种程序化形态平滑切换，点击空白触发爆破后重聚，滚动按进度解体、回滚重新聚合。桌面采用辉光后处理，移动端省略该处理。作品卡片增加鼠标追光与透视倾斜，并加入滚动字带与章节渐入。参考 React Bits 的粒子交互思路，仍为 Vue 3 + Three.js 实现，没有引入 React 或参考站素材。

## 参考站动效改编

参考 https://www.adit.engineer/ 的开场、分段入场、逐字身份切换、浮动标签、滚动叙事与技能交互思路，使用独立 Vue 组件重新实现，未复制参考站脚本、素材、配色或个人内容。
- MotionIntro.vue：可点击跳过的开场，自动在短暂展示后收起。
- usePortfolioMotion.js：逐字切换、滚动进度、章节显现、成果数字递增和叙事点亮。
- SkillConstellation.vue：技能关系图、拖动、悬停说明、列表切换。关系表达工具协作，不代表能力分数。
- 无粒子首页保存在 versions/before-reference-motion/，手稿独立版保持原样。
- 尊重系统减少动态效果偏好；移动端默认技能列表。
