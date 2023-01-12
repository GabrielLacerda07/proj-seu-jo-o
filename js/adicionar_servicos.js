const btnSubmit = document.querySelector('#send')

btnSubmit.addEventListener('click', (event) => {
  event.preventDefault()
  const nomeServico = document.querySelector('#nome').value
  setServicoDb(nomeServico)
})

async function setServicoDb(nomeServico) {
  const response = await fetch('http://localhost/seuJoaoApi/services/add', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      nome: JSON.stringify(nomeServico)
    }
  })
  console.log(response)
}