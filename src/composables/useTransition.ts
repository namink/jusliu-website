import { gsap } from 'gsap'

export function createTransition() {
  const onBeforeEnter = (el: Element) => {
    const htmlEl = el as HTMLElement
    gsap.set(htmlEl, {
      y: '100%',
      opacity: 0,
      scale: 0.97
    })
  }

  const onEnter = (el: Element, done: () => void) => {
    const htmlEl = el as HTMLElement
    gsap.to(htmlEl, {
      y: '0%',
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'power4.out',
      onComplete: done
    })
  }

  const onLeave = (el: Element, done: () => void) => {
    const htmlEl = el as HTMLElement
    gsap.to(htmlEl, {
      y: '-80%',
      opacity: 0,
      scale: 0.97,
      duration: 0.5,
      ease: 'power4.in',
      onComplete: done
    })
  }

  return { onBeforeEnter, onEnter, onLeave }
}
