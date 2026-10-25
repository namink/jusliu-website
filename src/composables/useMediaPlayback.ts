import { ref } from 'vue'
export const videoPlaying = ref(false)
let active: HTMLVideoElement | null = null
export function claimVideo(video: HTMLVideoElement) {
  if (active && active !== video) active.pause()
  active = video
  videoPlaying.value = true
}
export function releaseVideo(video: HTMLVideoElement) {
  if (active !== video) return
  active = null
  videoPlaying.value = false
}
document.addEventListener('visibilitychange', () => { if (document.hidden) active?.pause() })
