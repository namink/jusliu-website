<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { useI18n } from '@/composables/useI18n'
const { t } = useI18n()
const message = ref('')
const fallbackValue = ref('')
let timer: ReturnType<typeof setTimeout>
async function copy(value: string) {
  clearTimeout(timer)
  try { await navigator.clipboard.writeText(value); message.value = t('copied'); fallbackValue.value = '' }
  catch { fallbackValue.value = value; message.value = t('copyManually') }
  timer = setTimeout(() => { message.value = '' }, 4000)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>
<template>
  <div class="contact-actions">
    <div class="contact-buttons">
      <a href="mailto:conti_717@163.com">{{ t('sendEmail') }} ↗</a>
      <button type="button" @click="copy('conti_717@163.com')">{{ t('copyEmail') }}</button>
      <button type="button" @click="copy('Jusliu')">{{ t('copyWechat') }}</button>
    </div>
    <p role="status" class="contact-status">{{ message }}</p>
    <input v-if="fallbackValue" :value="fallbackValue" :aria-label="t('copyManually')" readonly @focus="($event.target as HTMLInputElement).select()" />
  </div>
</template>
