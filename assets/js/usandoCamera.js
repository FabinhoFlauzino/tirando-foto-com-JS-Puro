export default function usandoCamera(){
  const video = document.getElementById('videoFeed')
  const btnIniciarVideo = document.querySelector('.start-video')
  const btnPararVideo = document.querySelector('.stop-video')
  const canvas = document.getElementById('picture-canvas')
  const contentPicture = document.querySelector('.content-picture')
  const tirarFoto = document.querySelector('.take-picture')

  function startCamera() {

    video.style.display = 'block'
    canvas.style.display = 'none'
    contentPicture.classList.remove('d-none')

    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment'
      },
      audio: false
    }).then((stream) => {
      video.srcObject = stream
    })
  }

  function closeCamera() {

    video.style.display = 'none'
    stopCamera()
  }

  function stopCamera() {
    video.srcObject
      .getVideoTracks()
      .forEach(track => track.stop())
  }

  btnIniciarVideo.addEventListener('click', () => {
    startCamera()
  })

  btnPararVideo.addEventListener('click', () => {
    stopCamera()
  })

  tirarFoto.addEventListener('click', () => {

    // coletamos os elementos que precisamos referenciar
    canvas.style.display = 'block'
    const context = canvas.getContext('2d')

    // o canvas terá o mesmo tamanho do vídeo     
    canvas.width = video.offsetWidth
    canvas.height = video.offsetHeight

    // e então, desenhamos o que houver no vídeo, no canvas     
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    var dataURL = canvas.toDataURL();
    console.log(dataURL);
    imagem1.src = dataURL;

    // olha que barbada, o canvas tem um método toBlob!     
    canvas.toBlob(function (blob) {
      const url = URL.createObjectURL(blob)
      // podemos usar esta URL em um elemento de vídeo, ou fazer upload do blob, etc.         
      // e então, não precisamos mais da câmera  
      console.log(url)
      closeCamera()
      setTimeout(() => {
        Swal.fire({
          title: 'Foto Tirada!',
          text: 'Voto tirada com sucessso.',
          imageUrl: url,
          imageWidth: 400,
          imageHeight: 300,
          imageAlt: 'Custom image',
        })
      }, 500)
    }, 'image/jpeg', 0.95)
  })
}