function select(id) {
  return document.querySelector(id)
}

let form = select('form')
let emailReference = select('#inputEmail')
let passwordReference = select('#inputPassword')
let buttonLogin = select('#buttonLogin')
let ulErrorList = select('.error ul')
let errorList = select('.error')

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
    email: emailReference.value,
    password: passwordReference.value
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
      if (response.ok) {
        localStorage.setItem('token', data.jwt)
        window.location.href = './tarefas.html'
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuário ou senha incorreto!'
        })
      }
    })
  })
})
