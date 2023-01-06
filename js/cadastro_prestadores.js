getServicesDb()
let photo = document.getElementById('imgPhoto')
// let file = document.getElementById('flImage')
let imgPrestador = document.querySelector('#flImage')
photo.addEventListener('click', () => {
  imgPrestador.click()
})

imgPrestador.addEventListener('change', (event) => {
  let reader = new FileReader();
  reader.onload = () => {
    photo.src = reader.result
  }
  reader.readAsDataURL(imgPrestador.files[0])
})

const nome = document.querySelector('#nome')
const email = document.querySelector('#email')
const fone = document.querySelector('#fone')
const btnSubmit = document.querySelector('#send')

btnSubmit.addEventListener('click', (event) => {
  event.preventDefault()

  setProviderDb()
})

async function getServicesDb() {
  const response = await fetch('http://localhost/seuJoaoApi/services.json')
  const responseJson = await response.json()
  const servicos = await responseJson.servicos
  const selectHtml = document.querySelector('select')

  servicos.forEach(servico => {

    let option = document.createElement('option')
    option.innerText = servico.Service.nome
    option.setAttribute('value', servico.Service.nome)
    selectHtml.appendChild(option)
  })
}
async function setProviderDb() {
  const bodyJson = {
    "Provider": {
      "nome": "Testando nome 01",
      "email": "Testando email 01",
      "telefone": "Testando fone 01",
      "service_value": "Testando valor do servico 90.50",
      "service_desc": "Testando descricao 01"
    },
    "Service": {
      "nome": "Desenvolvedor web"
    }
  }
  const response = await fetch('http://localhost/seuJoaoApi/providers/add/', {
    method: 'POST',
    body: JSON.stringify(bodyJson)
  })
  const jsonData = await response.json()
  console.log(jsonData)
}