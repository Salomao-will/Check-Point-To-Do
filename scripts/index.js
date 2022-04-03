let form = document.querySelector('form')
let emailReference = document.querySelector('#inputEmail')
let passwordReference = document.querySelector('#inputPassword')
let ulErrorList = document.querySelector('.error ul')
let errorList = document.querySelector('.error')

const empty = input => {
  return input.value.trim() === ''
}

const errorMessage = message => {
  ulErrorList.innerHTML += `<li>${message}</li>`
}

form.addEventListener('submit', event => {
  ulErrorList.innerHTML = ''

  if (empty(emailReference)) {
    errorMessage('Campo <strong>email</strong> não foi preenchido')
  }
  if (empty(passwordReference)) {
    errorMessage('Campo <strong>senha</strong> não foi preenchido')
  }

  if (ulErrorList.querySelectorAll('li').length > 0) {
    event.preventDefault()
    errorList.hidden = ''
  }
})
