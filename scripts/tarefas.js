function select(id) {
  return document.querySelector(id)
}

let userNameReference = select('userName')
let imageReference = select('.user-image')
let taskRef = select('#tasks')
let buttonAddToDo = select('#btn-task')

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
  <img src="https://imagens.mdig.com.br/modismo/androgino_chines_Yiming_Zhao_04.jpg " alt="">
  `
  //console.log(imageReference)
}

fetch(
  'https://ctd-todo-api.herokuapp.com/v1/tasks',
  resquestConfiguration
).then(response => {
  if (response.ok) {
    let skeletonRef = document.querySelector('#skeleton')
    skeletonRef.style.display = 'none'

    response.json().then(data => {})
  }
})
