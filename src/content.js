// 个人资料与作品内容集中维护；空链接保持待补充状态。
export const profile = {
  name: '杨缘馨', role: 'AI Builder / AI 创意开发', city: '北京',
  tagline: 'AI Coding · Game Prototyping · Agentic Workflow · Creative Development',
  introduction: [
    '热爱游戏与创意开发，擅长结合 AI Coding 与软件工程能力，将玩法构思、视觉创意及复杂业务需求转化为可运行的交互原型。',
    '独立完成多个不同风格的游戏 Demo 与三维创意作品，主导搭建 多 Agent 协作任务编排器，具备 AI 协作开发、Agentic Workflow 设计及 Skills 能力复用实践。',
    '拥有五年半相关软件开发经验，具备从需求分析、技术实现到项目交付的完整工程能力。',
  ],
  email: 'yyx99333333@163.com', resumeUrl: '', githubUrl: '',
  socials: [
    { label: '小红书', url: 'https://www.xiaohongshu.com/user/profile/659cfc4a00000000220172dc' },
    { label: '抖音', url: 'https://v.douyin.com/s065aETs_2c/' },
  ],
}
export const impact = [ { value: '5,000+', label: '新增粉丝' }, { value: '40,685', label: '作品获赞' }, { value: '3,500+', label: 'Prompt 转发量' } ]
export const games = [
  { title: 'VELORA — 3D 城市驾驶', type: '3D DRIVING / AI CODING / STYLIZED ENVIRONMENT', description: '以雨夜霓虹都市为背景的三维驾驶游戏原型，实现车辆驾驶、氮气加速、动态镜头跟随及车库车漆颜色更换。通过 AI Coding 完成城市场景构建、车辆交互及视觉效果迭代，探索驾驶体验与沉浸式场景氛围的结合。', visual: 'city', tags: ['3D 驾驶', 'AI Coding', '风格化场景'], cover: '/images/velora/cover-clean.png', gallery: [{src:'/images/velora/cover-clean.png',label:'宣传封面'}, {src:'/images/velora/driving.png',label:'实机 · 雨夜城市驾驶'}, {src:'/images/velora/nitro.png',label:'实机 · 氮气加速'}, {src:'/images/velora/character.png',label:'实机 · 角色与车辆'}, {src:'/images/velora/paint.png',label:'实机 · 车漆工坊'}], videoUrl: 'https://www.xiaohongshu.com/discovery/item/6b03f523000000002500b467?source=webshare&xhsshare=pc_web&xsec_token=ABw15fj_XWOh4pFUskE073FlWVuIO63wMOpUThRS2dc_k=&xsec_source=pc_share', playUrl: 'https://neta.art/w/yyx99030303033/pelican-coast/velora-rain-night' },
  { title: '食堂打饭模拟', type: 'PIXEL ART / CASUAL GAME / SIMULATION', description: '以日常食堂打饭为灵感的像素风休闲模拟游戏。玩家扮演食堂阿姨，体验餐食打取及特色「抖勺」交互。将具有生活共鸣的趣味现象转化为轻量游戏机制，探索生活化题材与休闲游戏玩法的结合。', visual: 'pixel', tags: ['像素风', '休闲游戏', '模拟'], cover: '/images/canteen/cover.png', gallery: [{src:'/images/canteen/cover.png',label:'宣传封面'},{src:'/images/canteen/tutorial.png',label:'实机 · 新手练习与抖勺'},{src:'/images/canteen/rush-hour.png',label:'实机 · 晚高峰打饭'},{src:'/images/canteen/kebab.png',label:'实机 · 土耳其烤肉饭'},{src:'/images/canteen/burger.png',label:'实机 · 汉堡档'}], videoUrl: '', playUrl: 'https://neta.art/w/yyx99030303033/pelican-coast/third-canteen' },
  { title: '分羊羊', type: 'COZY GAME / CASUAL ARCADE / 3D', description: '治愈系卡通 3D 休闲游戏，玩家需要将大羊、小羊送入对应羊圈，随着游戏节奏逐渐加快，形成持续性的反应挑战。作品已获得真实用户试玩反馈，并围绕玩法重复性、内容丰富度及持续游玩体验进行后续设计思考。', visual: 'anime', tags: ['治愈系', '休闲街机', '3D'], cover: '/images/sheep/cover-v1.png', gallery: [{src:'/images/sheep/cover-v1.png',label:'宣传封面'},{src:'/images/sheep/sorting.png',label:'实机 · 大小羊分流'},{src:'/images/sheep/costume.png',label:'实机 · 趣味装扮'},{src:'/images/sheep/peacock.png',label:'实机 · 孔雀装扮羊'},{src:'/images/sheep/collection.png',label:'实机 · 羊的图鉴'},{src:'/images/sheep/tutorial.png',label:'实机 · 新手引导'},{src:'/images/sheep/wolf.png',label:'实机 · 披羊皮的狼'},{src:'/images/sheep/dog.png',label:'实机 · 牧羊犬帮忙'}], videoUrl: '', playUrl: 'https://neta.art/w/yyx99030303033/pelican-coast/sheep-gate' },
  { title: '风眠花庭', type: '2D / WALKING EXPERIENCE', description: '以森林与花庭为背景的治愈系 2D 散步小游戏。玩家提灯漫步于紫藤花径与林间，体验跳跃、场景互动与「风的信物」收集，在轻量探索中感受自然氛围。', visual: 'garden', tags: ['平面 2D', '散步式体验'], cover: '/images/whispering-woods/panorama.png', gallery: [{src:'/images/whispering-woods/panorama.png',label:'场景展示拼图'}, {src:'/images/whispering-woods/title.png',label:'游戏首页'}, {src:'/images/whispering-woods/courtyard.png',label:'实机 · 花庭漫步'}, {src:'/images/whispering-woods/jump.png',label:'实机 · 蘑菇送风'}, {src:'/images/whispering-woods/detail.png',label:'实机 · 角色与场景细节'}, {src:'/images/whispering-woods/flowers.png',label:'实机 · 紫藤花径'}, {src:'/images/whispering-woods/forest.png',label:'实机 · 林间探索'}], videoUrl: 'https://v.douyin.com/_OLuwlpOzMY/', playUrl: '' },
]
export const creativeWorks = [
  { title: '悉尼蓝花楹', description: '以悉尼蓝花楹街角为主题的三维微缩景观，将奶油色转角建筑、紫色花树、长椅与街边陈设融入同一场景，探索日夜光照下的色彩层次与空间氛围。', displayUrl: 'https://v.douyin.com/MBeYNPJtVAY/', displayLabel: '看抖音视频', images: [{src:'/images/sydney-jacaranda/night-overview.png',label:'夜景全貌'}, {src:'/images/sydney-jacaranda/warm-daylight.png',label:'暖光街角'}, {src:'/images/sydney-jacaranda/daylight.png',label:'日景全貌'}, {src:'/images/sydney-jacaranda/harbour.png',label:'海港画面'}, {src:'/images/sydney-jacaranda/bench.png',label:'街角长椅与陈设'}] },
  { title: '樱花河畔', description: '以樱花落下的河畔为主题，结合沿岸花树、暖光灯笼、木桥与小船，营造静谧的春夜氛围，并以春日明信片呈现场景中的留念细节。', displayUrl: 'https://www.xiaohongshu.com/discovery/item/6ae7117a0000000026024ba8?source=webshare&xhsshare=pc_web&xsec_token=ABtJGx8dT4cBJlVRwwdUTUCvj8c3jwpH-PExAuIHLtGPg=&xsec_source=pc_share', displayLabel: '看小红书笔记', images: [{src:'/images/sakura-riverside/overview.png',label:'河畔夜景'}, {src:'/images/sakura-riverside/boat.png',label:'樱花与小船'}, {src:'/images/sakura-riverside/postcard.png',label:'春日明信片'}] },
  { title: '伦敦秋雨', description: '以伦敦秋日街角为主题的三维微缩场景，将金色银杏、街角咖啡馆、红色双层巴士与电话亭融入同一画面，通过日景、黄昏和夜景的光照变化，呈现落叶环绕的城市氛围。', images: [{src:'/images/london-autumn/night.png',label:'秋夜街角'}, {src:'/images/london-autumn/golden-hour.png',label:'黄昏暖光'}, {src:'/images/london-autumn/daylight.png',label:'日景全貌'}] },
  { title: '京都雪庭', description: '以冬日京都庭院为主题，将覆雪树木、日式木屋、露天汤池与室内炉火融入微缩场景，通过清晨、暮色与雪夜的光照变化，呈现冷暖交织的冬日氛围。', displayUrl: 'https://www.xiaohongshu.com/discovery/item/6ada13660000000031027182?source=webshare&xhsshare=pc_web&xsec_token=ABRcd8FrkUmI_j73XnHmgSwEO-iQf9EyWjHv_i38qLC5M=&xsec_source=pc_share', displayLabel: '看小红书笔记', images: [{src:'/images/kyoto-snow/night.png',label:'雪夜全景'}, {src:'/images/kyoto-snow/dusk.png',label:'暮色雪庭'}, {src:'/images/kyoto-snow/morning.png',label:'清晨雪庭'}, {src:'/images/kyoto-snow/interior.png',label:'炉火与室内细节'}] },
  { title: '蓝花楹车站', description: '以蓝花楹树下的车站为主题，结合紫色巴士、候车亭、花卉与街边陈设，呈现晴日、晚霞与花夜的场景氛围，并展示候车杂志与花瓣车票细节。', displayUrl: 'https://v.douyin.com/J2byH3CcV64/', displayLabel: '看抖音视频', images: [{src:'/images/jacaranda-station/night.png',label:'花夜车站'}, {src:'/images/jacaranda-station/dusk.png',label:'晚霞车站'}, {src:'/images/jacaranda-station/day.png',label:'晴日车站'}, {src:'/images/jacaranda-station/bench.png',label:'候车亭与杂志'}, {src:'/images/jacaranda-station/ticket.png',label:'花瓣车票'}] },
  { title: '魁地奇球场', description: '以魁地奇比赛为灵感的像素风微缩场景，将城堡、看台、环形球门与飞行队员融入等距构图，展示晴天、雨天与雪天三种不同天气氛围。', displayUrl: 'https://www.xiaohongshu.com/discovery/item/6ae8ac1800000000340038ac?source=webshare&xhsshare=pc_web&xsec_token=ABVFYq6NTZEhEWCfPLQMAkXFzJnE5tKUjNFIkpJhP4Z4I=&xsec_source=pc_share', displayLabel: '看小红书笔记', images: [{src:'/images/quidditch/clear.png',label:'晴天球场'}, {src:'/images/quidditch/rain.png',label:'雨天球场'}, {src:'/images/quidditch/snow.png',label:'雪天球场'}] },
  { title: '樱花小屋', description: '以樱花环绕的日式小屋为主题，将榻榻米、木廊、茶具与庭前水景融入微缩庭院，呈现清晨、黄昏与入夜的不同光照氛围。', displayUrl: 'https://www.xiaohongshu.com/discovery/item/6ad6236c0000000026031db8?source=webshare&xhsshare=pc_web&xsec_token=ABeV3HsdvOt56D1Si11ldSElS8aCAWzev2F6gFLupV2X4=&xsec_source=pc_share', displayLabel: '看小红书笔记', images: [{src:'/images/sakura-cottage/night.png',label:'入夜庭院'}, {src:'/images/sakura-cottage/dusk.png',label:'黄昏小屋'}, {src:'/images/sakura-cottage/morning.png',label:'清晨小屋'}] },
]
export const workflow = [
  { title: 'AI Coding / 研发实践', label: 'BUILD & ITERATE', text: '以 Codex 为主要开发工具，结合 Claude Code 等工具完成需求拆解、代码实现、调试与迭代。独立制作不同风格的游戏 Demo、三维场景与交互作品，将 AI 生成结果整合到实际工程中，持续验证功能、交互与视觉表现。', evidence: '实践：游戏 Demo · 三维交互 · 工业数字孪生' },
  { title: '上下文工程', label: 'CONTEXT ENGINEERING', text: '围绕开发任务组织项目背景、参考素材、技术约束与验收要求，通过提示词和项目规则传递目标。在持续迭代与阶段交接中补充有效信息，延续已确认的设计与实现方向，让 AI 协作围绕具体项目推进。', evidence: '实践：项目规则 · 参考资料 · 阶段交接' },
  { title: 'Agentic Workflow', label: 'MULTI-AGENT ORCHESTRATION', text: '主导搭建多 Agent 协作任务编排器，将需求分析、架构设计、开发执行、自检与验收组织为多阶段工作流。应用于公司工业数字孪生项目，围绕场景搭建、设备动画与业务流程实现，持续优化任务分工、交接与结果验收。', evidence: '实践：多阶段编排 · 公司项目应用 · 交付验收' },
  { title: 'Skills 设计与能力复用', label: 'SKILL DESIGN & REUSE', text: '围绕三维场景开发，将树木生成方法、场景构建规范与视觉质量要求沉淀为可复用 Skills，组织 AI 执行任务所需的方法与约束。探索画笔式批量生成与单棵树木调整，在不同场景中复用既有制作经验，减少重复描述与重复开发。', evidence: '实践：生成方法封装 · 场景规范 · 跨场景复用' },
  { title: 'MCP 工具集成', label: 'TOOL USE & MCP', text: '使用 MCP 将 AI 与外部工具连接，结合具体任务理解工具输入、输出与调用约束。尝试使用 Blender MCP 连接自然语言指令与 Blender 操作，探索 AI 辅助三维内容制作，将工具使用与场景创作结合。', evidence: '实践：MCP 使用 · Blender MCP · 三维制作探索' },
  { title: 'AI 应用开发与效率工具', label: 'AI APPLICATION DEVELOPMENT', text: '参与 AI Agent 前端开发，实现 LLM 流式响应与 Function Calling 过程可视化，连接模型交互与业务界面。另开发 MySQL + IoTDB 跨数据库查询工具，简化设备测点查询与数据核对，将软件工程能力用于业务研发与效率优化。', evidence: '实践：流式交互 · 工具调用可视化 · 跨数据库查询' },
]
export const stack = [
  { title: 'AI 开发工具', text: 'Codex（主用）、Claude Code、Grok、DeepSeek、MiniMax、WorkBuddy、Trae、Hi3D、Prompt Engineering' },
  { title: 'AI 工作流', text: 'Agentic Workflow、多 Agent 任务编排、多 Agent 协作、Skills、MCP' },
  { title: '软件开发', text: 'JavaScript、TypeScript、Vue 2/3、uni-app、Three.js、Vite、WebSocket' },
  { title: '创意开发', text: '游戏原型、三维场景构建、交互设计、视觉风格迭代、玩法验证' },
]
export const playerExperience = [
  '长期热爱游戏，保持跨平台、跨品类的游戏体验。涉猎涵盖国内外 3A 大作、开放世界、动作冒险、角色扮演、生存恐怖、悬疑解谜、模拟经营、多人竞技、独立游戏及休闲小游戏等，覆盖 PC、移动端及微信小游戏等不同平台。',
  '持续关注国内外新游动态，乐于尝试不同体量、题材和美术风格的作品。既享受大型游戏的沉浸式体验，也关注独立游戏的创意表达与小游戏的轻量化玩法。',
  '习惯从玩家视角观察玩法机制、交互反馈与美术表现，并记录个人评价和改进想法。',
  '希望从游戏玩家走向创作者，借助 AI Coding 将自己感兴趣的玩法与创意转化为真正可体验的游戏作品。',
]


export const industrialWorks = [
  { title: '铝热轧 / 冷轧全流程', type: 'INDUSTRIAL SIMULATION / DIGITAL TWIN', description: '以铝加工产线为主题的三维数字孪生展示，串联电解铝与熔铸、铸锭准备与加热、热粗轧、热精轧连轧、冷轧及退火精整等工序。结合产线总览、设备参数、作业动态与线框视图，并通过工艺知识和下游应用页面呈现从原料到工业铝制品的完整流程。', visual: 'factory', tags: ['工业仿真', '数字孪生', '铝加工流程'], cover: '/images/aluminum-rolling/overview.png', gallery: [
    {src:'/images/aluminum-rolling/overview.png',label:'铝热轧冷轧全流程总览'},
    {src:'/images/aluminum-rolling/smelting.png',label:'电解铝与熔铸'},
    {src:'/images/aluminum-rolling/rough-rolling.png',label:'热粗轧'},
    {src:'/images/aluminum-rolling/finish-rolling.png',label:'热精轧连轧'},
    {src:'/images/aluminum-rolling/production-line.png',label:'轧制产线全景'},
    {src:'/images/aluminum-rolling/wireframe.png',label:'产线线框模式'},
    {src:'/images/aluminum-rolling/process-map.png',label:'全流程与核心工艺知识'},
    {src:'/images/aluminum-rolling/applications.png',label:'下游工业铝制品与材料'}
  ], playUrl: '' },
  { title: '食品饮料灌装全流程', type: 'INDUSTRIAL SIMULATION / DIGITAL TWIN', description: '以食品饮料灌装产线为主题的三维数字孪生展示，串联上瓶清洗、回转式灌装、封盖、贴标喷码、杀菌冷却及检测装箱码垛等环节，结合工序视角切换、产线运行状态与设备参数面板，呈现生产流程与设备协同。', visual: 'factory', tags: ['工业仿真', '数字孪生', '灌装全流程'], cover: '/images/beverage-filling/overview.png', gallery: [
    {src:'/images/beverage-filling/overview.png',label:'灌装全流程总览'},
    {src:'/images/beverage-filling/rinsing.png',label:'上瓶与高压冲洗'},
    {src:'/images/beverage-filling/filling.png',label:'回转式灌装'},
    {src:'/images/beverage-filling/capping.png',label:'上盖与旋盖'},
    {src:'/images/beverage-filling/labeling.png',label:'贴标与激光喷码'},
    {src:'/images/beverage-filling/packing.png',label:'灯检称重与装箱码垛'}
  ], playUrl: '' },
  { title: '铝用炭素全流程', type: 'INDUSTRIAL SIMULATION / PROCESS VISUALIZATION', description: '以预焙阳极生产为主题的三维工艺展示，串联原料仓储、煅烧、破碎磨粉配料、混捏成型、焙烧、加工检验组装及净化固废等环节。结合厂区关系平面图、工艺知识卡片和物料跟拍，呈现工序衔接、物料流转与残极回收关系。', visual: 'factory', tags: ['工业仿真', '预焙阳极', '工艺可视化'], cover: '/images/aluminum-carbon/overview.png', gallery: [
    {src:'/images/aluminum-carbon/overview.png',label:'厂区总览与流程关系'},
    {src:'/images/aluminum-carbon/batching.png',label:'破碎磨粉配料'},
    {src:'/images/aluminum-carbon/forming.png',label:'混捏与成型'},
    {src:'/images/aluminum-carbon/baking.png',label:'环式焙烧炉'},
    {src:'/images/aluminum-carbon/tracking.png',label:'生坯物料跟拍'}
  ], playUrl: '' },
  { title: '煤化工全流程', type: 'INDUSTRIAL SIMULATION / PROCESS VISUALIZATION', description: '以煤制甲醇为主题的三维工艺展示，串联备煤制浆、煤气化、变换净化、甲醇合成、分离精制及成品储存等工序。结合厂区设备与管廊、物料主线、工序导览、示意工艺事件流和线框视图，呈现从原煤到精甲醇及成品外运的流程关系。', visual: 'factory', tags: ['工业仿真', '煤制甲醇', '工艺可视化'], cover: '/images/coal-chemical/overview.png', gallery: [
    {src:'/images/coal-chemical/overview.png',label:'煤制甲醇全流程总览'},
    {src:'/images/coal-chemical/gasification.png',label:'煤气化与工序导览'},
    {src:'/images/coal-chemical/storage.png',label:'成品储存与外运 · 线框视图'}
  ], playUrl: '' },
]

export const creatureWorks = [{ title: '倒生者', description: '以异生物观察室为主题的三维交互展示作品，通过标本全貌、头部与底层结构观察，以及行走状态展示，探索暗色场景氛围、生物造型与观察界面的结合。', displayUrl: 'https://v.douyin.com/uhQeo96xwIs/', displayLabel: '看抖音视频', images: [{src:'/images/reverse-molter/specimen.png',label:'完整标本'}, {src:'/images/reverse-molter/head.png',label:'头部细节'}, {src:'/images/reverse-molter/base.png',label:'底层结构'}, {src:'/images/reverse-molter/walking.png',label:'行走状态'}] }]
