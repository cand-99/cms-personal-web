export function useImageUpload() {
  const imageFile = ref()
  const imageUrl = ref()
  const errors = ref()

  function handleImageSelected(event: any) {
    if (event.target.files.length === 0) {
      imageFile.value = ''
      imageUrl.value = ''
      throw new Error('You must select an image to upload.')
    }

    if (event.target.files[0].size >= 3000000) {
      errors.value = 'Maximum upload file size : 3Mb'
      imageFile.value = ''
      return
    }

    imageFile.value = event.target.files[0]
  }

  watch(imageFile, (imageFile) => {
    if (!(imageFile instanceof File))
      return

    const fileReader = new FileReader()

    fileReader.readAsDataURL(imageFile)

    fileReader.addEventListener('load', () => {
      imageUrl.value = fileReader.result
    })
  })

  return {
    imageFile,
    imageUrl,
    handleImageSelected,
    errors,
  }
}
