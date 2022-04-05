let form = document.querySelector('form')
let emailReference = document.querySelector('#inputEmail')
let passwordReference = document.querySelector('#inputPassword')
let buttonLogin = document.querySelector('#buttonLogin')
let ulErrorList = document.querySelector('.error ul')
let errorList = document.querySelector('.error')

const empty = input => {
  return input.value.trim() === ''
}

const errorMessage = message => {
  ulErrorList.innerHTML += `<li>${message}</li>`
}

form.addEventListener('click', event => {
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

buttonLogin.addEventListener('click', event => {
  event.preventDefault()

  let credencials = {
    email: 'string',
    password: 'string'
  }

  let headerRequest = {
    'Content-Type': 'application/json'
  }

  let resquestConfig = {
    method: 'POST',
    body: JSON.stringify(credencials),
    headers: headerRequest
  }

  fetch(
    'https://ctd-todo-api.herokuapp.com/v1/users/login',
    resquestConfig
  ).then(response => {
    response.json().then(data => {
      //console.log(data.jwt)
      localStorage.setItem('token', data.jwt)
      window.location.href = './tarefas.html'
    })
  })
})
