export const addLibrary = urlOfTheLibrary => {
  const script = document.createElement('script')
  script.src = urlOfTheLibrary
  script.async = true
  document.body.appendChild(script)
}

export const modalCustomStyles = windowSize => {

  const width = windowSize < 500 ? '90%' : '50%'

  return {
    content: {
      top: '50%',
      left: '50%',
      width,
      transform: 'translate(-50%, -50%)'
    }
  }
}