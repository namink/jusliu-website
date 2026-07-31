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

  skills: ['Unreal Engine 5/4', 'Maya', 'Python / AI 辅助开发', 'SpeedTree', 'ComfyUI / AI 流程', 'Substance Painter', 'Gaea / WorldCreator', 'Deadline 渲染农场', 'Git / rez 包管理', 'ZBrush'],

  timelineRoles: ['TD (技术指导)', 'UE 美术', '平面设计师助理', 'UE 美术'],
  timelineComps: ['长沙神漫文化科技有限公司', '湖南极也视界文化艺术有限公司', '有只蚂蚁品牌设计有限公司', '北京原子比特科技有限公司'],
  timelineDetails: [
    ['DCC 软件工具开发与流程优化', 'Python/PyQt 管线工具开发', 'Deadline 渲染农场管理', 'AI 生成软件前端界面开发'],
    ['三渲二风格材质研发', 'UE 场景搭建与渲染', 'AI 数字人流程研发', '参与哪吒、熊出没、王者荣耀 CG 等项目'],
    ['产品图建模渲染', '海报与详情页设计'],
    ['根据分镜搭建 UE 白盒场景', '灯光、雾效、后处理氛围塑造', 'Sequence 动画与 360 全景序列帧图输出']
  ],

  audioOn: 'ON', audioOff: 'OFF',

  previewHint: '点击图片可放大 · 点击 VIDEO 播放演示',
  langBtn: '中'
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

  skills: ['Unreal Engine 5/4', 'Maya', 'Python / AI-assisted Dev', 'SpeedTree', 'ComfyUI / AI Pipeline', 'Substance Painter', 'Gaea / WorldCreator', 'Deadline Render Farm', 'Git / rez Package Mgmt', 'ZBrush'],

  timelineRoles: ['TD (Technical Director)', 'UE Artist', 'Graphic Designer Asst.', 'UE Artist'],
  timelineComps: ['Changsha Shenman Culture Technology', 'Hunan Jiye Vision Culture Art', 'Youzhi Ant Brand Design', 'Beijing Atom Bit Technology'],
  timelineDetails: [
    ['DCC tooling & pipeline optimization', 'Python/PyQt pipeline development', 'Deadline render farm management', 'AI generation web UI development'],
    ['Anime-style NPR material R&D', 'UE scene building & rendering', 'AI digital human pipeline R&D', 'Supported Nezha, Boonie Bears, Honor of Kings CG projects'],
    ['Product image modeling & rendering', 'Poster & detail page design'],
    ['UE white-box scene building from storyboards', 'Lighting, fog & post-processing atmosphere', 'Sequence animation & 360° panoramic export']
  ],

  audioOn: 'ON', audioOff: 'OFF',

  previewHint: 'Click to preview · Click VIDEO to play',
  langBtn: 'EN'
}

type Locale = 'zh' | 'en'
type Messages = typeof zh

const state = reactive({
  locale: (localStorage.getItem('lang') || 'zh') as Locale
})

export function useI18n() {
  const messages = computed<Messages>(() => state.locale === 'zh' ? zh : en)

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

  return { t, tArr, locale: state.locale, toggleLocale }
}
