import { onMounted, onUnmounted, type Ref } from 'vue'

export function useDragScroll(elRef: Ref<HTMLElement | undefined>, autoSpeed = 0) {
  let dragging = false
  let startX = 0
  let scrollStart = 0
  let autoTimer = 0
  let hovered = false

  function startAuto() {
    if (autoSpeed <= 0) return
    autoTimer = window.setInterval(() => {
      const el = elRef.value
      if (!el || dragging || hovered) return
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
        return
      }
      el.scrollLeft += autoSpeed
    }, 16)
  }

  function stopAuto() {
    clearInterval(autoTimer)
  }

  function onDown(e: MouseEvent) {
    const el = elRef.value
    if (!el) return
    dragging = true
    startX = e.clientX
    scrollStart = el.scrollLeft
    el.style.cursor = 'grabbing'
    el.style.userSelect = 'none'
  }

  function onMove(e: MouseEvent) {
    if (!dragging) return
    const el = elRef.value
    if (!el) return
    e.preventDefault()
    el.scrollLeft = scrollStart + (startX - e.clientX)
  }

  function onUp() {
    dragging = false
    const el = elRef.value
    if (el) { el.style.cursor = 'grab'; el.style.userSelect = '' }
  }

  function onEnter() { hovered = true; const el = elRef.value; if (el) el.style.cursor = 'grab' }
  function onLeave() { hovered = false; onUp() }

  onMounted(() => {
    const el = elRef.value
    if (!el) return
    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    startAuto()
  })

  onUnmounted(() => {
    const el = elRef.value
    if (el) {
      el.removeEventListener('mousedown', onDown)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
    stopAuto()
  })
}
