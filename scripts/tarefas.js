let userNameReference = document.getElementById('userName')
let imageReference = document.querySelector('.user-image')

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
  console.log(imageReference)
}
