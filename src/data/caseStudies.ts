export interface CaseStudy {
  goal: [string, string]
  scope: [string, string]
  focus: [string, string][]
  gallery: { src: string; caption: [string, string] }[]
}
const cdn = 'https://pub-4a4da7a40c564edabe95305d5bc9e7a0.r2.dev/works'
export const caseStudies: Record<string, CaseStudy> = {
  'ai-platform': {
    goal: ['将 AI 内容生成、节点工作流、3D 预览与材质编辑组织在同一个创作平台中。', 'Bring AI generation, node workflows, 3D preview and material editing into a single content creation platform.'],
    scope: ['独立完成需求分析、方案制定与前端界面构建，覆盖节点工作流、3D 导演台和 PBR 材质编辑等模块。', 'Independently handled requirements, planning and frontend interfaces across the workflow, director console and PBR material editor.'],
    focus: [
      ['节点工作流：节点连接、数据流配置、子图导航与参数面板。', 'Node workflows: connections, data pipelines, subgraph navigation and parameter panels.'],
      ['3D 导演台：自由视角、相机监控、灯光调节与时间线动画。', '3D director console: navigation, camera monitoring, lighting and timeline animation.'],
      ['材质编辑：多通道管理、实时参数、平铺预览和导出。', 'Material editing: channels, live parameters, tiling previews and export.']
    ],
    gallery: [
      { src: `${cdn}/node-editor/overview.jpg`, caption: ['节点式工作流编辑界面', 'Node workflow editor'] },
      { src: `${cdn}/director3d/timeline.jpg`, caption: ['3D 导演台与时间线', '3D director console and timeline'] },
      { src: `${cdn}/pbr-editor/overview.jpg`, caption: ['PBR 材质编辑界面', 'PBR material editor'] }
    ]
  },
  'maya-project-tool': {
    goal: ['通过项目管理工具改善 Maya 制作流程与资产管理的规范性。', 'Improve Maya production workflows and consistent asset organization through a project management tool.'],
    scope: ['基于 Python / PyQt 的 Maya 项目管理工具开发。下方保留实际工具界面与操作演示。', 'A Maya project management tool built with Python and PyQt. The actual interface and demonstration are shown below.'],
    focus: [
      ['使用 PyQt 构建桌面工具界面。', 'A desktop tool interface built with PyQt.'],
      ['围绕 Maya 项目与资产管理组织操作流程。', 'Operations organized around Maya projects and asset management.']
    ],
    gallery: [{ src: `${cdn}/tools/maya-project-tool.jpg`, caption: ['Maya 项目管理工具界面', 'Maya Project Manager interface'] }]
  },
  'aigc-storybook': {
    goal: ['将儿童绘本改编为动画，探索 AI 影像中的故事表达。', 'Adapt a picture-book story into animation and explore storytelling through AI-generated imagery.'],
    scope: ['以古代人物、竹简与宫廷场景呈现故事；本页展示完整视频与实际画面，封面为基于视频内容生成的插画。', 'A historical story featuring scholars, bamboo slips and a palace setting. This page contains the full video and actual frames; the cover is an illustration generated from the video content.'],
    focus: [
      ['角色表达：以夸张比例和表情突出人物关系。', 'Character expression: stylized proportions and expressions communicate relationships.'],
      ['场景表达：通过古代建筑、服饰与竹简建立叙事环境。', 'Scene design: architecture, clothing and bamboo slips establish the story setting.']
    ],
    gallery: [
      { src: '/images/aigc/storybook-frame-village.jpg', caption: ['视频画面：人物与村落', 'Video frame: characters in the village'] },
      { src: '/images/aigc/storybook-frame-court.jpg', caption: ['视频画面：宫廷对话', 'Video frame: a conversation in court'] }
    ]
  }
}
export const selectedCaseIds = ['ai-platform', 'maya-project-tool', 'aigc-storybook']
