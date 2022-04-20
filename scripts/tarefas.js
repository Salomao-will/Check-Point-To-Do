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
let taskFinished = document.querySelector('#tasks-finished')

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
    imageReference.innerHTML = (
      data.firstName[0] + data.lastName[0]
    ).toUpperCase()
    concatenateName(data)
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
    if (response) {
      let skeletonRef = document.querySelectorAll('#skeleton')
      for (skeleton of skeletonRef)
        if (response.ok) {
          skeleton.style.display = 'none'
        }

      response.json().then(tasks => {
        taskRef.innerHTML = ''
        taskFinished.innerHTML = ''
        for (const task of tasks) {
          let data = new Date(task.createdAt).toLocaleTimeString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })

          if (task.completed == false) {
            taskRef.innerHTML += `
    
            <li data-aos="fade-up" class="tarefa">
            <div class="not-done" onclick="taskDone(${task.id}, true)"></div>
            <div class="descricao">
              <p class="nome">${task.description}</p>
              <p class="timestamp">${data}</p>
            </div>
            </li>
            
            `
          } else {
            taskFinished.innerHTML += `
            <li data-aos="fade-up" class="tarefa">
            <div class="not-done"></div>
            <div class="descricao">
              <p class="nome">${task.description}</p>
              <p class="timestamp">${data}</p>
              </div>
              <img id="delete-icon" onclick="deleteTask(${task.id})" src="https://cdn-icons-png.flaticon.com/512/2891/2891491.png"> 
            </li>
            `
          }
        }
      })
    }
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

let deleteTaskCompleted = {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token')
  }
}

function deleteTask(id) {
  Swal.fire({
    title: 'Você tem certeza ?',
    text: 'Não será possível reverter a decisão!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Delete!'
  }).then(result => {
    if (result.isConfirmed) {
      fetch(
        `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`,
        deleteTaskCompleted
      ).then(response => {
        if (response.ok) {
          Swal.fire('Deletado!', 'Seu arquivo foi deletado!', 'success')
        }
        taskUser()
      })
      /* location.reload() */
    }
  })
}

function taskDone(id) {
  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, taskPut).then(
    response => {
      if (response.ok) {
        location.reload()
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
