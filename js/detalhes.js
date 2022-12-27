async function getProviderDb() {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  const response = await fetch(`http://localhost/seuJoaoApi/providers/view/${id}.json`)
  const data = await response.json()
  // console.log(data.dadosPrestador.Provider.nome)
  return data.dadosPrestador
}

let divDados = document.querySelector('#dados')
let divNome = document.querySelector('#nome')
let divTelefone = document.querySelector('#telefone')
let divEmail = document.querySelector('#email')
let divFoto = document.querySelector('#img')
let divServico = document.querySelector('#nomeServico')
let divValor = document.querySelector('#valor')
let divDesc = document.querySelector('#desc')

async function addDataOnPage() {
  const dadoPrestador = await getProviderDb()
  console.log(dadoPrestador.Provider)
  divNome.innerHTML += dadoPrestador.Provider.nome
  divTelefone.innerHTML += dadoPrestador.Provider.telefone
  divEmail.innerHTML += dadoPrestador.Provider.email
  divFoto.innerHTML += dadoPrestador.Provider.foto
  divServico.innerHTML += dadoPrestador.Service.nome
  divValor.innerHTML += dadoPrestador.Provider.service_value
  divDesc.innerHTML += dadoPrestador.Provider.service_desc

}
addDataOnPage()
