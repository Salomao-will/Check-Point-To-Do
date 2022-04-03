let inputNameReference = document.querySelector('#inputName')
let inputSurnameReference = document.querySelector('#inputSurname')
let inputEmailReference = document.querySelector('#inputEmail')
let inputPasswordReference = document.querySelector('#inputPassword')
let form = document.querySelector('form')
let errorUlList = document.querySelector('.error ul')
let errorList = document.querySelector('.error')

const empty = input => {
  return input.value.trim() === ''
}

const errorMessage = message => {
  errorUlList.innerHTML += `<li>${message}</li>`
}

form.addEventListener('submit', event => {
  errorUlList.innerHTML = ''

  if (empty(inputNameReference)) {
    errorMessage('Campo <strong>nome</strong> não foi preenchido')
  }
  if (empty(inputSurnameReference)) {
    errorMessage('Campo <strong>apelido</strong> não foi preenchido')
  }
  if (empty(inputEmailReference)) {
    errorMessage('Campo <strong>email</strong> não foi preenchido')
  }
  if (empty(inputPasswordReference)) {
    errorMessage('Campo <strong>senha</strong> não foi preenchido')
  }

  if (errorUlList.querySelectorAll('li').length > 0) {
    event.preventDefault()
    errorList.hidden = ''
  }
})
