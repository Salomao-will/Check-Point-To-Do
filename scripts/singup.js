function select(id) {
  return document.querySelector(id)
}

let inputNameReference = select('#inputName')
let inputSurnameReference = select('#inputSurname')
let inputEmailReference = select('#inputEmail')
let inputPasswordReference = select('#inputPassword')
let inputPasswordRepet = select('#inputPasswordRepet')
let buttonSignupRef = select('#buttonSignup')
let form = select('form')
let errorUlList = select('.error ul')
let errorList = select('.error')

const empty = input => {
  return input.value.trim() === ''
}

const errorMessage = message => {
  errorUlList.innerHTML += `<li>${message}</li>`
}

form.addEventListener('click', event => {
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

buttonSignupRef.addEventListener('click', event => {
  event.preventDefault()

  let user = {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    password: 'string'
  }

  let headerRequest = {
    'Content-Type': 'application/json'
  }

  let userConfig = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: headerRequest
  }

  fetch('https://ctd-todo-api.herokuapp.com/v1/users', userConfig).then(
    response => {
      response.json().then(data => {
        localStorage.setItem('token', data.jwt)
      })
    }
  )
})
