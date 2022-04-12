function select(id) {
  return document.querySelector(id)
}

let userNameReference = select('#userName')
let imageReference = select('.user-image')
let taskRef = select('#tasks')
let buttonAddToDo = select('#btn-task')
let inputReference = select('#novaTarefa')
let closeAppRef = select('#closeApp')
let notDoneRef = document.querySelector('.not-done')
let taskFinished = document.querySelector('.tarefas-terminadas')

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
      taskRef.innerHTML = ''

      for (const task of tasks) {
        let data = new Date(task.createdAt)

        if (task.completed == false) {
          taskRef.innerHTML += `
  
          <li class="tarefa">
          <div class="not-done" onclick="taskDone(${task.id})"></div>
          <div class="descricao">
            <p class="nome">${task.description}</p>
            <p class="timestamp">${data.toDateString()}</p>
          </div>
          </li>
          
          `
        } else {
          taskFinished.innerHTML += `
          <li class="tarefa">
          <div class="not-done"></div>
          <div class="descricao">
            <p class="nome">${task.description}</p>
            <p class="timestamp">${data.toDateString()}</p>
          </div>
          </li>
          `
        }
      }
    })
  })
}
taskUser()

let taskPut = {
  method: 'PUT',
  body: JSON.stringify({
    completed: true
  }),

  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token')
  }
}

function taskDone(id) {
  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, taskPut).then(
    response => {
      if (response.ok) {
        taskUser()
      }
    }
  )
}

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
      if (response.ok) {
        location.reload()
      }
    }
  )
})

closeAppRef.addEventListener('click', event => {
  localStorage.clear()
  location.href = 'index.html'
})
