import { gsap } from 'gsap'
import { useMotion } from './useMotion'

export function createTransition() {
  const { reducedMotion, documentHidden } = useMotion()
  const onBeforeEnter = (el: Element) => {
    const htmlEl = el as HTMLElement
    gsap.set(htmlEl, {
      y: reducedMotion.value ? 0 : 16,
      opacity: 0,
      scale: 1
    })
  }

  const onEnter = (el: Element, done: () => void) => {
    const htmlEl = el as HTMLElement
    if (reducedMotion.value || documentHidden.value) {
      gsap.set(htmlEl, { clearProps: 'transform,opacity' })
      queueMicrotask(done)
      return
    }
    gsap.to(htmlEl, {
      y: '0%',
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: 'power4.out',
      onComplete: done
    })
  }

  const onLeave = (el: Element, done: () => void) => {
    const htmlEl = el as HTMLElement
    if (reducedMotion.value || documentHidden.value) {
      gsap.set(htmlEl, { clearProps: 'transform,opacity' })
      queueMicrotask(done)
      return
    }
    gsap.to(htmlEl, {
      y: reducedMotion.value ? 0 : -8,
      opacity: 0,
      scale: 1,
      duration: 0.18,
      ease: 'power4.in',
      onComplete: done
    })
  }

  return { onBeforeEnter, onEnter, onLeave }
}
