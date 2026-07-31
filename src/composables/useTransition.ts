import { gsap } from 'gsap'

export function createTransition() {
  const onBeforeEnter = (el: Element) => {
    const htmlEl = el as HTMLElement
    gsap.set(htmlEl, {
      y: '100%',
      opacity: 0
    })
  }

  const onEnter = (el: Element, done: () => void) => {
    const htmlEl = el as HTMLElement
    gsap.to(htmlEl, {
      y: '0%',
      opacity: 1,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: done
    })
  }

  const onLeave = (el: Element, done: () => void) => {
    const htmlEl = el as HTMLElement
    gsap.to(htmlEl, {
      y: '-100%',
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in',
      onComplete: done
    })
  }

  return { onBeforeEnter, onEnter, onLeave }
}
