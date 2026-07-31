import { onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const routes = ['/', '/works', '/about']

function getIndex(path: string): number {
  return Math.max(0, routes.indexOf(path))
}

export function useScrollNav(onNext?: () => boolean, onPrev?: () => boolean) {
  const router = useRouter()
  const route = useRoute()
  let ticking = false

  function onWheel(e: WheelEvent) {
    if (ticking) return
    ticking = true
    setTimeout(() => ticking = false, 800)

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    const atTop = scrollTop <= 5
    const atBottom = scrollTop + clientHeight >= scrollHeight - 5

    const currentIdx = getIndex(route.path)

    if (e.deltaY > 0 && atBottom) {
      if (onNext?.()) {
        e.preventDefault()
        return
      }
      if (currentIdx < routes.length - 1) {
        e.preventDefault()
        router.push(routes[currentIdx + 1])
      }
    } else if (e.deltaY < 0 && atTop) {
      if (onPrev?.()) {
        e.preventDefault()
        return
      }
      if (currentIdx > 0) {
        e.preventDefault()
        router.push(routes[currentIdx - 1])
      }
    }
  }

  onMounted(() => {
    window.addEventListener('wheel', onWheel, { passive: false })
  })

  onUnmounted(() => {
    window.removeEventListener('wheel', onWheel)
  })
}
