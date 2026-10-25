// Local development diagnostics; excluded from the production build.
const metrics: Record<string, number> = {}
function publish() {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  if (navigation?.domContentLoadedEventEnd) metrics.domContentLoadedMs = Math.round(navigation.domContentLoadedEventEnd)
  document.documentElement.dataset.pageMetrics = JSON.stringify(metrics)
}
for (const type of ['paint', 'largest-contentful-paint', 'layout-shift', 'longtask']) {
  if (!PerformanceObserver.supportedEntryTypes.includes(type)) continue
  new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') metrics.fcpMs = Math.round(entry.startTime)
      if (type === 'largest-contentful-paint') metrics.lcpMs = Math.round(entry.startTime)
      if (type === 'layout-shift' && !(entry as PerformanceEntry & { hadRecentInput: boolean }).hadRecentInput) metrics.cls = Number(((metrics.cls || 0) + (entry as PerformanceEntry & { value: number }).value).toFixed(4))
      if (type === 'longtask') metrics.longTasks = (metrics.longTasks || 0) + 1
    }
    publish()
  }).observe({ type, buffered: true })
}
window.addEventListener('load', publish, { once: true })
publish()
