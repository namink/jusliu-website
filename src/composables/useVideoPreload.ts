import { onMounted } from 'vue'
import { works } from '@/data/works'

export function useVideoPreload() {
  onMounted(() => {
    const seen = new Set<string>()
    for (const w of works) {
      if (!w.videoUrl || seen.has(w.videoUrl)) continue
      seen.add(w.videoUrl)
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'video'
      link.href = w.videoUrl
      document.head.appendChild(link)
    }
  })
}
