function showSpinner() {
  const body = document.querySelector('body')

  const form = document.querySelector('form')

  const spinnerContainer = document.createElement('div')

  const spinner = document.createElement('div')

  spinnerContainer.setAttribute('id', 'container-load')
  spinner.setAttribute('id', 'load')

  form.classList.add('hidden')

  spinnerContainer.appendChild(spinner)
  body.appendChild(spinnerContainer)

  return
}

function hiddenSpinner() {
  const body = document.querySelector('body')

  const form = document.querySelector('form')

  const spinnerContainer = document.querySelector('#container-load')

  body.removeChild(spinnerContainer)

  form.classList.remove('hidden')
}

form.addEventListener('submit', e => {
  // Esta função se executa quando se realiza o submit do formulário
  e.preventDefault()

  // Aqui podemos mostrar o spinner para indicar à pessoa que se
  // iniciou o processo de registro
  showSpinner()

  // Realizamos algumas validações dos dados inseridos
  const nomeValido = validarNome(nome.value)
  const senhaValida = validarSenha(senha.value, repetirSenha.value)
  const emailValido = validarEmail(email.value)

  if (nomeValido && senhaValida && emailValido) {
    const dadosUsuario = new DadosUsuario()
    dadosUsuario.setFirstname(nome.value)
    dadosUsuario.setLastname('DH')
    dadosUsuario.setPassword(senha.value)
    dadosUsuario.setEmail(email.value)

    const url = 'https://ctd-todo-api.herokuapp.com/v1'

    // Realizamos o chamado à API
    fetch(`${url}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: dadosUsuario.email,
        firstName: dadosUsuario.firstName,
        lastName: dadosUsuario.lastName,
        password: dadosUsuario.password
      })
    })
      .then(dados => {
        return dados.json()
      })
      .then(dados => {
        localStorage.setItem('token', dados.jwt)
        // Uma vez obtida a resposta da API, ocultamos o spinner
        hiddenSpinner()
        location.href = './tarefas.html'
      })
      .catch(err => {
        console.log(err)
        // Ocultamos o spinner em caso de erro
        hiddenSpinner()
      })
  } else {
    // Se algum dos campos estiver incorreto, ocultamos o spinner
    hiddenSpinner()
  }
})
