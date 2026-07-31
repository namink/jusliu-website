import { reactive, computed } from 'vue'

const zh = {
  home: '首页', works: '作品', about: '关于',
  browseWorks: '浏览作品', learnMore: '了解更多',
  since: 'since 2022',
  taglineTop: '从 0 到 1', taglineSub: '连接艺术与技术的桥梁',
  contactEmail: 'conti_717@163.com',
  scroll: 'SCROLL',

  portfolio: 'PORTFOLIO', portfolioSub: '作品集',
  portfolioHint: '点击卡片图片可全屏预览 · 点击带 VIDEO 标识播放演示',
  all: '全部', aiPlatform: 'AI 平台', toolDev: '工具开发',
  sceneRender: '场景渲染', materialDev: '材质研发',
  procedural: '程序化', techDev: '技术研发', projectSupport: '项目支持',

  aboutTitle: 'ABOUT', aboutSub: '关于',
  coreSkills: 'CORE SKILLS', toolsTech: 'TOOLS & TECH',
  langFoundation: 'LANGUAGE FOUNDATION',
  workExp: 'WORK EXPERIENCE', education: 'EDUCATION',
  eduSchool: '江西软件职业技术大学', eduDegree: '计算机应用工程 · 本科 · 2019 - 2023',

  audioOn: 'ON', audioOff: 'OFF',
  audioPause: '暂停音乐', audioPlay: '播放音乐',
  ndaLabel: '内容保密', ndaHint: '持续完善中',
  previewHint: '点击图片可放大 · 点击 VIDEO 播放演示',
  langBtn: '中',

  bio1: '4 年影视游戏行业工作经验，涵盖 UE 技术美术、材质研发、管线工具开发，以及 AI 内容生成平台从 0 到 1 的构建。',
  bio2: '编程基础为 C++ / C# / C，工作中主要使用 Python，借助 AI 辅助完成日常开发任务。具备 PyQt 桌面应用开发与 Unreal Python API 使用经验。',
  bio3: '独立完成 AI 内容生成平台的完整前端界面构建，包括节点式工作流编辑器、3D 实时导演台、PBR 材质编辑器等功能模块。',
  bio4: '参与过哪吒之魔童闹海、熊出没之重启未来、王者荣耀 CG 动画等知名项目，积累了丰富的影视级资产制作与技术支持经验。',

  skills: ['Unreal Engine 5/4', 'Maya', 'Python / AI 辅助开发', 'SpeedTree', 'ComfyUI / AI 流程', 'Substance Painter', 'Gaea / WorldCreator', 'Deadline 渲染农场', 'Git / rez 包管理', 'ZBrush'],

  timelinePeriods: ['2025.12 - 至今', '2023.10 - 2025.11', '2023.02 - 2023.06', '2022.06 - 2023.01'],
  timelineRoles: ['TD (技术指导)', 'UE 美术', '平面设计师助理', 'UE 美术'],
  timelineComps: ['长沙神漫文化科技有限公司', '湖南极也视界文化艺术有限公司', '有只蚂蚁品牌设计有限公司', '北京原子比特科技有限公司'],
  timelineDetails: [
    ['DCC 软件工具开发与流程优化', 'Python/PyQt 管线工具开发', 'Deadline 渲染农场管理', 'AI 生成软件前端界面开发'],
    ['三渲二风格材质研发', 'UE 场景搭建与渲染', 'AI 数字人流程研发', '参与哪吒、熊出没、王者荣耀 CG 等项目'],
    ['产品图建模渲染', '海报与详情页设计'],
    ['根据分镜搭建 UE 白盒场景', '灯光、雾效、后处理氛围塑造', 'Sequence 动画与 360 全景序列帧图输出']
  ]
}

const en = {
  home: 'Home', works: 'Works', about: 'About',
  browseWorks: 'Browse Works', learnMore: 'Learn More',
  since: 'since 2022',
  taglineTop: 'From 0 to 1', taglineSub: 'Bridging Art & Technology',
  contactEmail: 'conti_717@163.com',
  scroll: 'SCROLL',

  portfolio: 'PORTFOLIO', portfolioSub: 'Portfolio',
  portfolioHint: 'Click image to preview · Click VIDEO to play',
  all: 'All', aiPlatform: 'AI Platform', toolDev: 'Tool Dev',
  sceneRender: 'Scene Render', materialDev: 'Material Dev',
  procedural: 'Procedural', techDev: 'Tech R&D', projectSupport: 'Project Support',

  aboutTitle: 'ABOUT', aboutSub: 'About',
  coreSkills: 'CORE SKILLS', toolsTech: 'TOOLS & TECH',
  langFoundation: 'LANGUAGE FOUNDATION',
  workExp: 'WORK EXPERIENCE', education: 'EDUCATION',
  eduSchool: 'Jiangxi Software University', eduDegree: 'Computer Engineering · Bachelor · 2019 - 2023',

  audioOn: 'ON', audioOff: 'OFF',
  audioPause: 'Pause Music', audioPlay: 'Play Music',
  ndaLabel: 'Confidential', ndaHint: 'In Progress',
  previewHint: 'Click to preview · Click VIDEO to play',
  langBtn: 'EN',

  bio1: '4 years in film, TV & game industry, covering UE tech art, material R&D, pipeline tooling, and building an AI content platform from 0 to 1.',
  bio2: 'Programming foundation in C++/C#/C. Primarily use Python at work, leveraging AI-assisted development. Experienced with PyQt desktop apps and Unreal Python API.',
  bio3: 'Independently built the full frontend of an AI content platform, including a node-based workflow editor, real-time 3D director, and PBR material editor.',
  bio4: 'Contributed to major projects including Nezha, Boonie Bears, and Honor of Kings CG animation, gaining extensive asset production and technical support experience.',

  skills: ['Unreal Engine 5/4', 'Maya', 'Python / AI-assisted Dev', 'SpeedTree', 'ComfyUI / AI Pipeline', 'Substance Painter', 'Gaea / WorldCreator', 'Deadline Render Farm', 'Git / rez Package Mgmt', 'ZBrush'],

  timelinePeriods: ['2025.12 - Present', '2023.10 - 2025.11', '2023.02 - 2023.06', '2022.06 - 2023.01'],
  timelineRoles: ['TD (Technical Director)', 'UE Artist', 'Graphic Designer Asst.', 'UE Artist'],
  timelineComps: ['Changsha Shenman Culture Tech', 'Hunan Jiye Vision Culture Art', 'Youzhi Ant Brand Design', 'Beijing Atom Bit Tech'],
  timelineDetails: [
    ['DCC tooling & pipeline optimization', 'Python/PyQt pipeline dev', 'Deadline render farm mgmt', 'AI web UI development'],
    ['NPR material R&D', 'UE scene building & rendering', 'AI digital human pipeline', 'Supported Nezha, Boonie Bears, HOK CG'],
    ['Product image modeling & rendering', 'Poster & detail page design'],
    ['UE white-box from storyboards', 'Lighting, fog & post-processing', 'Sequence anim & 360° panorama export']
  ]
}

type Locale = 'zh' | 'en'
type Messages = typeof zh

const state = reactive({
  locale: (localStorage.getItem('lang') || 'zh') as Locale
})

export function useI18n() {
  const messages = computed<Messages>(() => state.locale === 'zh' ? zh : en)
  const locale = computed(() => state.locale)

  function t(key: string): string {
    const val = (messages.value as any)[key]
    return typeof val === 'string' ? val : key
  }

  function tArr(key: string): string[] {
    const val = (messages.value as any)[key]
    return Array.isArray(val) ? val : []
  }

  function toggleLocale() {
    state.locale = state.locale === 'zh' ? 'en' : 'zh'
    localStorage.setItem('lang', state.locale)
  }

  return { t, tArr, locale, toggleLocale }
}
