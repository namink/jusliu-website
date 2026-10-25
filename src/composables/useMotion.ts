import { computed, ref } from 'vue'

const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
const systemReduced = ref(preference.matches)
const manuallyPaused = ref(localStorage.getItem('motion-paused') === '1')
preference.addEventListener('change', event => { systemReduced.value = event.matches })
const documentHidden = ref(document.hidden)
document.documentElement.dataset.visibility = document.hidden ? 'hidden' : 'visible'
document.addEventListener('visibilitychange', () => {
  documentHidden.value = document.hidden
  document.documentElement.dataset.visibility = document.hidden ? 'hidden' : 'visible'
})
const reducedMotion = computed(() => systemReduced.value || manuallyPaused.value)

export function useMotion() {
  function toggleMotion() {
    manuallyPaused.value = !manuallyPaused.value
    localStorage.setItem('motion-paused', manuallyPaused.value ? '1' : '0')
  }
  return { reducedMotion, toggleMotion, systemReduced, documentHidden }
}
