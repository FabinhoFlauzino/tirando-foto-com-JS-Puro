export default function selecionarImagem() {
  const selectImage = document.querySelector('.select-image')
  const inputFile = document.querySelector('#file')
  const imageArea = document.querySelector('.img-area')

  selectImage.addEventListener('click', () => {
    inputFile.click()
  })

  inputFile.addEventListener('change', () => {
    const image = inputFile.files[0]
    if (image.size < 2048000) {
      const reader = new FileReader()
      reader.onload = () => {
        const allImages = imageArea.querySelectorAll('img')
        allImages.forEach(img => img.remove())

        const imgUrl = reader.result
        const img = document.createElement('img')
        img.src = imgUrl

        imageArea.appendChild(img)
        imageArea.classList.add('active')
        imageArea.dataset.img = image.name
      }
      reader.readAsDataURL(image)
    } else {
      inputFile.value = null
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A imagem deve ter no máximo 2MB'
      })
    }
  })
}
