function select(id) {
  return document.querySelector(id)
}

let userNameReference = select('#userName')
let imageReference = select('.user-image')
let taskRef = select('#tasks')
let buttonAddToDo = select('#btn-task')
let inputReference = select('#novaTarefa')

let resquestConfiguration = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token')
  }
}

fetch(
  'https://ctd-todo-api.herokuapp.com/v1/users/getMe',
  resquestConfiguration
).then(Response => {
  Response.json().then(data => {
    concatenateName(data)
    concatenateImage(data)
  })
})

function concatenateName(dados) {
  userNameReference.innerText = `${dados.firstName} ${dados.lastName}`
}

function concatenateImage() {
  imageReference.innerHTML = `
  <img id="imgUser" src="https://imagens.mdig.com.br/modismo/androgino_chines_Yiming_Zhao_04.jpg " alt="">
  `
  //console.log(imageReference)
}

function taskUser() {
  fetch(
    'https://ctd-todo-api.herokuapp.com/v1/tasks',
    resquestConfiguration
  ).then(response => {
    if (response.ok) {
      let skeletonRef = document.querySelector('#skeleton')
      skeletonRef.style.display = 'none'
    }
    response.json().then(tasks => {
      for (const task of tasks) {
        let data = new Date(task.createdAt)

        taskRef.innerHTML += `

        <li class="tarefa">
        <div class="not-done"></div>
        <div class="descricao">
          <p class="nome">${task.description}</p>
          <p class="timestamp">${data.toDateString()}</p>
        </div>
        </li>
        
        `
      }
    })
  })
}
taskUser()

buttonAddToDo.addEventListener('click', event => {
  event.preventDefault()
  let user = {
    description: inputReference.value,
    completed: false
  }

  let headerRequest = {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token')
  }

  let userConfig = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: headerRequest
  }

  fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', userConfig).then(
    response => {
      response.json().then(task => {
        localStorage.setItem('task', JSON.stringify(task))
      })
    }
  )
  taskUser()
})
