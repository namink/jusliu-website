import type { Work } from './works'

export const categoriesEn: Record<string, string> = {
  'AIGC': 'AIGC', 'AI 平台': 'AI Platform', '工具开发': 'Tools', '场景渲染': 'Scene Rendering',
  '材质研发': 'Materials', '程序化': 'Procedural', '技术研发': 'R&D', '项目支持': 'Production Support'
}
export function categoryText(category: string, locale: string) { return locale === 'en' ? (categoriesEn[category] || category) : category }

// English descriptions translate the existing portfolio data without adding production claims.
export const workEnglish: Record<string, [string, string]> = {
  'aigc-storybook': ['Picture-book Adaptation', 'A picture-book adaptation featuring historical characters, bamboo slips and a palace setting, exploring storytelling through AI-generated animation.'],
  'aigc-painterly-animation': ['Arcane-inspired Style Exploration', 'An AI visual study referencing the painterly animation of Arcane, exploring character design, desert environments and cinematic lighting.'],
  'aigc-song-aesthetic': ['Song Aesthetic Study', 'A study of negative space, restrained color and atmosphere through a moonlit camp and a white-robed figure.'],
  'ai-platform': ['AI Content Creation Platform', 'Built an AI content platform from the ground up, including a node workflow editor, real-time 3D preview, PBR material editor and image/video editing. Independently handled requirements, planning and frontend interfaces.'],
  'node-editor': ['Node Workflow Editor', 'A visual workflow system with draggable connected nodes, data pipelines, subgraph navigation and parameter panels.'],
  'director3d': ['Director Console · 3D Scene Editor', 'An integrated real-time 3D scene editor with free navigation, camera monitoring, lighting controls, timeline animation and screenshot output.'],
  'pbr-editor': ['PBR Material Editor', 'A material editor with channel management, live parameters, seamless tiling previews and export, including GLSL/HLSL conversion and Photoshop-style image editing.'],
  '3d-viewer': ['3D Viewer', 'Real-time model preview with rotation, zoom, material switching and screenshot export.'],
  'aigc-python-client': ['AIGC Python Desktop Client', 'A PyQt AI generation tool integrating services such as Jimeng. Contributed feature improvements and iterations on an existing application at Shenman Culture.'],
  'xgen-hair-check': ['XGen Hair Validation Tool', 'A Maya Python API tool for automatic XGen asset checks, naming and production compliance, batch scanning and issue reports.'],
  'ue-light-manager': ['UE Batch Light Manager', 'An Unreal Python API tool for light-type filtering, batch property editing and preset import/export.'],
  'ue-srgb-aces': ['UE sRGB-to-ACES Batch Tool', 'Batch conversion of project textures from sRGB to ACES, with multi-file mappings and configurable rules.'],
  'maya-ref-replace': ['Maya Batch Reference Replacement', 'Batch replacement of character reference paths in Maya animation files, with mappings, regex rules and path templates.'],
  'maya-project-tool': ['Maya Project Manager', 'A PyQt-based Maya project management tool for more efficient production workflows and consistent asset organization.'],
  'space-astronaut': ['Space Astronaut', 'Space-environment lighting and rendering, exploring illumination without atmospheric scattering.'],
  'dark-scene': ['Dark Environment', 'A low-light environment study exploring atmosphere through lighting.'],
  'arcane-style': ['Arcane-inspired Rendering', 'An Unreal Engine study of the stylized rendering of Arcane and NPR techniques in a game engine.'],
  'arcade': ['Arcade Environment', 'A cyberpunk arcade environment combining neon lighting with retro elements.'],
  'us-cel-shading': ['American Cartoon Shading', 'A cartoon material system supporting multiple light sources in Unreal Engine.'],
  'jp-cel-shading': ['Anime Cel Shading', 'A cel-shading material system including anisotropic hair, self-shadowing and multi-light optimization.'],
  'parallax-crystal': ['Parallax Crystal Material', 'Crystal and gemstone refraction and internal detail in Unreal Engine using parallax mapping.'],
  'jade-material': ['Jade Material', 'A subsurface-scattering material study recreating light scattering in translucent jade.'],
  'pcg-generation': ['PCG Environment Generation', 'Large-scale natural environment generation using the UE5 PCG framework.'],
  'gaea-terrain': ['Gaea Terrain', 'Procedural terrain generation in Gaea with an Unreal Engine import and material-blending workflow.'],
  'speedtree': ['SpeedTree Vegetation', 'Procedural vegetation and Unreal Engine integration, including intertwined tree trunks.'],
  'dance-boy': ['Character Animation', 'A rendering study combining character motion with an environment.'],
  'ai-digital-human': ['AI Digital Human', 'A real-time UE5 digital human system supporting voice conversations and live-stream comments.'],
  'houdini-pcg': ['Houdini Procedural City', 'A Houdini workflow for automatic layout and building generation in an open-world urban environment.'],
  'freefire': ['Free Fire Promotional Animation', 'TD support for Free Fire promotional animation, focusing on hair simulation and animation rigging.'],
  'nezha': ['Ne Zha 2', 'Contributed asset production, effects and technical support to the film project.'],
  'boonie-bears': ['Boonie Bears: Future Reborn', 'Technical support and environment building for the film project.'],
  'honor-of-kings': ['Honor of Kings CG Animation', 'Asset and effects support for an Honor of Kings CG short.'],
  'shenyinwangzuo': ['Throne of Seal', 'TD support covering technical troubleshooting, plugin requirements and production workflow guidance.'],
  'cangyuantu': ['The Demon Hunter', 'TD support for pipeline challenges, tool development and workflow improvements.'],
  'zhanshen': ['Slay the Gods', 'Technical leadership covering custom plugins, rendering workflow guidance and pipeline troubleshooting.'],
  'yizhancangqiong': ['Yi Zhan Cang Qiong', 'TD support covering Python tools, workflow improvements and team technical guidance.'],
  'zetianji': ['Ze Tian Ji', 'TD support covering plugin development, troubleshooting and workflow standards.'],
  'daoguiyixian': ['Dao Gui Yi Xian', 'TD support covering Python tools, plugin requirements and production workflow guidance.']
}
const tagsEn: Record<string,string> = {
  '渲染':'Rendering','绘本改编':'Adaptation','角色动画':'Character Animation','故事叙事':'Storytelling','风格探索':'Style Study','绘画感':'Painterly','电影光影':'Cinematic Lighting','宋式美学':'Song Aesthetics','东方意境':'Atmosphere',
  '前端':'Frontend','工作流':'Workflow','可视化':'Visualization','实时渲染':'Real-time Rendering','导演台':'Director Console','材质':'Materials','模型预览':'Model Preview','即梦':'Jimeng',
  '灯光':'Lighting','动画':'Animation','色彩':'Color','太空':'Space','氛围':'Atmosphere','风格化':'Stylized','赛博朋克':'Cyberpunk','场景搭建':'Environment','卡渲':'Cartoon Shading','视差贴图':'Parallax',
  '程序化':'Procedural','地形':'Terrain','植物':'Vegetation','角色':'Character','数字人':'Digital Human','都市':'Urban','毛发解算':'Hair Simulation','动画绑定':'Rigging','资产':'Assets','特效':'Effects','电影':'Film','场景':'Environment','流程':'Pipeline','插件':'Plugins','工具开发':'Tools','PS 编辑':'Image Editing'
}
export function localizeWork(work: Work, locale: string): Work {
  if (locale !== 'en') return work
  const text = workEnglish[work.id]
  return { ...work, title: text?.[0] || work.title, description: text?.[1] || work.description, category: categoryText(work.category, locale), tags: work.tags.map(tag => tagsEn[tag] || tag) }
}
