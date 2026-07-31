export interface Work {
  id: string
  title: string
  category: string
  description: string
  thumbnail: string
  tags: string[]
  poster?: string
  videoUrl?: string
}

export const works: Work[] = [
  {
    id: 'ai-platform',
    title: 'AI 数字内容生成平台',
    category: 'AI 平台',
    description: '从 0 到 1 构建的 AI 数字内容生成平台。含节点式工作流编辑器、3D 实时预览、PBR 材质编辑器、图片/视频编辑。独立完成需求分析、方案制定与前端界面构建。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/ai-platform/batch-modes.jpg',
    tags: ['AI', 'ComfyUI', '前端', 'Node Editor']
  },
  {
    id: 'node-editor',
    title: '节点式工作流编辑器',
    category: 'AI 平台',
    description: '可视化节点式工作流系统，支持节点拖拽连接、数据流管线配置、子图导航与参数面板。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/node-editor/overview.jpg',
    tags: ['Node Editor', '工作流', '可视化', 'ComfyUI']
  },
  {
    id: 'director3d',
    title: '导演台 · 3D 场景编辑器',
    category: 'AI 平台',
    description: 'AI 生成平台内置 3D 实时场景编辑模块。支持自由视角、相机监控、灯光调节、时间线动画与截图输出。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/director3d/timeline.jpg',
    tags: ['3D', 'WebGL', '实时渲染', '导演台']
  },
  {
    id: 'pbr-editor',
    title: 'PBR 材质编辑器',
    category: 'AI 平台',
    description: 'PBR 材质编辑模块，支持多通道管理、参数实时调节、无缝平铺预览及材质导出。实现 GLSL 与 HLSL 着色器代码转换，集成 PS 图片编辑功能。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/pbr-editor/overview.jpg',
    tags: ['PBR', '材质', 'GLSL', 'HLSL', 'PS 编辑']
  },
  {
    id: '3d-viewer',
    title: '3D 查看器',
    category: 'AI 平台',
    description: '3D 模型实时预览模块，支持旋转缩放、材质切换与截图导出。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/ai-platform/3d-viewer.jpg',
    tags: ['3D', '模型预览', 'WebGL', '材质']
  },
  {
    id: 'aigc-python-client',
    title: 'AIGC Python 桌面客户端',
    category: 'AI 平台',
    description: '基于 PyQt 的 AI 生成桌面工具，集成即梦等平台 AI 服务。在神漫文化期间参与，在现有基础上进行功能优化与迭代。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/ai-tools/result-asset.jpg',
    tags: ['Python', 'PyQt', 'AI', '即梦']
  },
  {
    id: 'xgen-hair-check',
    title: 'XGen 毛发规范检测工具',
    category: '工具开发',
    description: '基于 Maya Python API 的 XGen 毛发规范性自动检测工具，确保毛发资产符合管线命名与制作规范，支持批量扫描与异常报告输出。',
    thumbnail: '',
    tags: ['Maya', 'Python', 'XGen', 'TD']
  },
  {
    id: 'ue-light-manager',
    title: 'UE 灯光批量管理工具',
    category: '工具开发',
    description: 'Unreal Engine Python API 开发的灯光批量管理工具，支持按类型筛选灯光、属性批量修改、预设配置导入导出。',
    thumbnail: '',
    tags: ['UE5', 'Python', '灯光', 'TD']
  },
  {
    id: 'ue-srgb-aces',
    title: 'UE sRGB 转 ACES 色彩空间批量工具',
    category: '工具开发',
    description: '将 UE 项目中 sRGB 色彩空间的贴图批量转换至 ACES 标准色彩空间，支持多文件映射与规则配置。',
    thumbnail: '',
    tags: ['UE5', 'Python', 'sRGB', 'ACES', 'TD']
  },
  {
    id: 'maya-ref-replace',
    title: 'Maya 动画角色引用批量替换工具',
    category: '工具开发',
    description: '批量替换 Maya 动画文件中的角色引用路径，支持多文件映射、正则规则匹配与路径模板配置。',
    thumbnail: '',
    tags: ['Maya', 'Python', '动画', 'TD']
  },
  {
    id: 'maya-project-tool',
    title: 'Maya 项目管理工具',
    category: '工具开发',
    description: '基于 PyQt 的 Maya 项目管理工具，提升制作管线效率与资产管理规范性。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/tools/maya-project-tool.jpg',
    tags: ['Python', 'PyQt', 'Maya', 'TD'],
    videoUrl: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/videos/maya-tool.mp4'
  },
  {
    id: 'space-astronaut',
    title: '太空宇航员',
    category: '场景渲染',
    description: '太空环境灯光渲染，模拟无大气散射的太空光照环境',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/scene-lighting/Space01.jpg',
    tags: ['UE5', '灯光', '太空']
  },
  {
    id: 'dark-scene',
    title: '暗黑场景',
    category: '场景渲染',
    description: '暗黑风格场景布光练习，探索低照度环境下的氛围塑造',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/scene-lighting/dark.jpg',
    tags: ['UE5', '灯光', '氛围']
  },
  {
    id: 'arcane-style',
    title: '双城之战风格',
    category: '材质研发',
    description: 'UE 中还原《双城之战》风格化渲染效果，探索 NPR 渲染在游戏引擎中的实现',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/stylized/arcane01.jpg',
    tags: ['UE5', '风格化', 'NPR']
  },
  {
    id: 'arcade',
    title: '游戏厅场景',
    category: '场景渲染',
    description: '赛博朋克风格游戏厅场景搭建，霓虹灯光与复古元素的碰撞',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/scene-lighting/arcade.jpg',
    tags: ['UE5', '赛博朋克', '场景搭建']
  },
  {
    id: 'us-cel-shading',
    title: '美式卡渲材质',
    category: '材质研发',
    description: '美式卡通渲染材质系统研发，实现多光源卡通着色效果',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/materials/us-cel01.jpg',
    tags: ['UE5', '材质', '卡渲', 'Shader']
  },
  {
    id: 'jp-cel-shading',
    title: '日式卡渲材质',
    category: '材质研发',
    description: '日式赛璐璐风格材质系统，包括头发各向异性、自阴影、多光源优化',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/materials/jp-cel01.jpg',
    tags: ['UE5', '材质', 'Cel Shading', 'Shader']
  },
  {
    id: 'parallax-crystal',
    title: '视差水晶材质',
    category: '材质研发',
    description: '利用视差贴图技术在 UE 中实现水晶/宝石的折射与内部细节效果',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/materials/crystal.jpg',
    tags: ['UE5', '视差贴图', '材质']
  },
  {
    id: 'jade-material',
    title: '玉石材质',
    category: '材质研发',
    description: 'UE 中玉石 SSS 材质还原，模拟半透明玉石的光线散射效果',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/materials/jade.jpg',
    tags: ['UE5', 'SSS', '材质'],
    videoUrl: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/videos/jade.mp4'
  },
  {
    id: 'pcg-generation',
    title: 'PCG 程序化生成',
    category: '程序化',
    description: 'UE5 PCG 框架应用，程序化生成大规模自然环境',
    thumbnail: '',
    tags: ['UE5', 'PCG', '程序化']
  },
  {
    id: 'gaea-terrain',
    title: 'Gaea 地形制作',
    category: '程序化',
    description: 'Gaea 程序化地形生成 + UE5 导入与材质混合流程',
    thumbnail: '',
    tags: ['Gaea', 'UE5', '地形']
  },
  {
    id: 'speedtree',
    title: 'SpeedTree 植物',
    category: '程序化',
    description: 'SpeedTree 程序化植物生成与 UE5 集成，包括树干缠绕效果',
    thumbnail: '',
    tags: ['SpeedTree', 'UE5', '植物']
  },
  {
    id: 'dance-boy',
    title: '角色动画',
    category: '场景渲染',
    description: '角色动作与场景结合渲染作品',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/videos/dance-boy.jpg',
    tags: ['UE5', '角色', '动画'],
    videoUrl: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/videos/dance-boy.mp4'
  },
  {
    id: 'ai-digital-human',
    title: 'AI 数字人',
    category: '技术研发',
    description: 'UE5 驱动的实时 AI 数字人系统，支持语音对话与直播间评论接入',
    thumbnail: '',
    tags: ['UE5', 'AI', '数字人']
  },
  {
    id: 'houdini-pcg',
    title: 'Houdini 程序化都市场景生成',
    category: '技术研发',
    description: '基于 Houdini 的程序化生成流程，实现开放世界都市场景的自动布局与建筑生成。',
    thumbnail: '',
    tags: ['Houdini', 'PCG', '程序化', '都市']
  },
  {
    id: 'freefire',
    title: 'Free Fire 游戏买量动画',
    category: '项目支持',
    description: 'Free Fire 游戏买量视频 TD 技术支持，负责毛发解算与动画绑定方向的技术指导。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/projects/freefire.jpg',
    tags: ['TD', 'Maya', '毛发解算', '动画绑定'],
    videoUrl: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/videos/freefire.mp4'
  },
  {
    id: 'nezha',
    title: '哪吒之魔童闹海',
    category: '项目支持',
    description: '参与电影项目的资产制作、特效及技术支持',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/projects/nezha.jpg',
    tags: ['UE5', '资产', '特效', '电影']
  },
  {
    id: 'boonie-bears',
    title: '熊出没之重启未来',
    category: '项目支持',
    description: '电影项目技术支持与场景搭建',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/projects/boonie.jpg',
    tags: ['UE5', '场景', '电影']
  },
  {
    id: 'honor-of-kings',
    title: '王者荣耀 CG 动画',
    category: '项目支持',
    description: '王者荣耀 CG 短片资产与特效支持',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/projects/hok.jpg',
    tags: ['UE5', 'CG', '特效']
  },
  {
    id: 'shenyinwangzuo',
    title: '神印王座',
    category: '项目支持',
    description: '在播项目 TD 技术支持，负责技术问题排查、插件需求开发及制作流程指导。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/projects/shenyinwangzuo.jpg',
    tags: ['TD', 'Python', 'UE5', '流程']
  },
  {
    id: 'cangyuantu',
    title: '沧元图',
    category: '项目支持',
    description: 'TD 技术支持，解决制作管线中的技术难点，开发辅助工具与流程优化方案。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/projects/cangyuantu.jpg',
    tags: ['TD', 'Python', '插件', '流程']
  },
  {
    id: 'zhanshen',
    title: '斩神之凡尘神域',
    category: '项目支持',
    description: 'TD 技术负责，提供插件需求定制、渲染流程指导及制作管线问题解决。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/projects/zhanshen.jpg',
    tags: ['TD', 'Python', 'UE5', '渲染']
  },
  {
    id: 'yizhancangqiong',
    title: '一斩苍穹',
    category: '项目支持',
    description: '项目 TD 支持，负责 Python 工具开发、流程优化及团队技术指导。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/projects/yizhancangqiong.jpg',
    tags: ['TD', 'Python', '工具开发', '流程']
  },
  {
    id: 'zetianji',
    title: '择天记',
    category: '项目支持',
    description: 'TD 技术支持，参与插件开发、问题排查及制作流程规范化。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/projects/zetianji.jpg',
    tags: ['TD', 'Python', '插件', '流程']
  },
  {
    id: 'daoguiyixian',
    title: '道诡异仙',
    category: '项目支持',
    description: '项目 TD 技术支持，负责技术问题排查与制作流程指导。',
    thumbnail: 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works/projects/daogui.jpg',
    tags: ['TD', 'Python', 'UE5', '流程']
  }
]

export const categories = [...new Set(works.map(w => w.category))]
