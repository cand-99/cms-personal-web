import type { Ref } from 'nuxt/dist/app/compat/capi'

export default () => {
  enum ToastType {
    Info = 'info',
    Success = 'success',
    Warning = 'warning',
    Error = 'error',
  }
  const toasts: Ref<string[] | any> = ref([])
  const showToast = computed(() => toasts.value?.length > 0)

  watch(showToast, (val) => {
    if (!val)
      toasts.value = []
  })
  const removeToast = (index: number) => {
    toasts.value.splice(index, 1)
  }

  const addToast = (type: ToastType, message: any) => {
    const index = toasts.value.length
    toasts.value.push({ type, message, index } as any)
  }

  return {
    toasts,
    showToast,
    removeToast,
    addToast,
    ToastType,
  }
}
