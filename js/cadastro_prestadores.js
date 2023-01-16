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
  const nomeInput = document.querySelector('#nome').value
  const emailInput = document.querySelector('#email').value
  const telefoneInput = document.querySelector('#fone').value
  const imgInput = document.querySelector('#flImage').value
  const selectIntput = document.querySelector('select')
  const optionInput = selectIntput.options[selectIntput.selectedIndex].value
  const valorInput = document.querySelector('#valor').value
  const servicoDesc = document.querySelector('#servicoDesc').value
  setProviderDb(
    nomeInput,
    emailInput,
    telefoneInput,
    imgInput,
    optionInput,
    valorInput,
    servicoDesc
  )
  document.querySelector('#nome').value = ''
  document.querySelector('#email').value = ''
  document.querySelector('#fone').value = ''
  document.querySelector('#flImage').value = ''
  document.querySelector('#valor').value = ''
  document.querySelector('#servicoDesc').value = ''
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
    option.setAttribute('value', servico.Service.id)
    selectHtml.appendChild(option)
  })
}
async function setProviderDb(nome, email, fone, img, servico, valor, desc) {
  const bodyJson = {
    "Provider": {
      "nome": nome,
      "email": email,
      "telefone": fone,
      "foto": img,
      "service_id": servico,
      "service_value": valor,
      "service_desc": desc
    }
  }
  const response = await fetch('http://localhost/seuJoaoApi/providers/add/', {
    method: 'POST',
    body: JSON.stringify(bodyJson)
  })
  const jsonData = await response.json()
  console.log(jsonData)
}