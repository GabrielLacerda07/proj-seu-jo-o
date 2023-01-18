const btnSubmit = document.querySelector('#send')

btnSubmit.addEventListener('click', (event) => {
  event.preventDefault()
  const nomeServico = document.querySelector('#nome').value
  setServicoDb(nomeServico)
  document.querySelector('#nome').value = ''
})

async function setServicoDb(nomeServico) {
  const bodyJson = {
    "Service": {
      "nome": nomeServico
    }
  }
  const response = await fetch('http://localhost/seuJoaoApi/services/add', {
    method: 'POST',
    body: JSON.stringify(bodyJson)
  })
  const jsonData = await response.json()
  console.log(jsonData)
  if (jsonData == 201) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Serviço cadastrado com sucesso!',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => {
      window.location.href = 'cadastro_prestadores.html'
    }, 2000)
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Não foi possível realizar o cadastro!'
    })
  }
}