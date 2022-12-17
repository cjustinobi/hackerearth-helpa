export const addLibrary = urlOfTheLibrary => {
  const script = document.createElement('script')
  script.src = urlOfTheLibrary
  script.async = true
  document.body.appendChild(script)
}

export const modalCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    width: '60%',
    transform: 'translate(-50%, -50%)'
  },
}