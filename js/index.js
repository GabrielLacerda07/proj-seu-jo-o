const btnSubmit = document.querySelector('#send')
btnSubmit.addEventListener('click', (event) => {
  event.preventDefault()
  const userInput = document.querySelector('#user')
  const passwordInput = document.querySelector('#password')
  checkUserAndPassword(userInput, passwordInput)
})


async function checkUserAndPassword(userInput, passwordInput) {

  const usersDb = await getUsersDb()
  const userDbJoao = usersDb.users[0].User.email
  const passwordDbJoao = usersDb.users[0].User.senha
  const userDbGabriel = usersDb.users[1].User.email
  const passwordDbGabriel = usersDb.users[1].User.senha
  if (userInput.value === userDbJoao && passwordInput.value === passwordDbJoao) {
    console.log('ok')
    setSuccessFor(userInput, passwordInput)
  } else if (userInput.value === userDbGabriel && passwordInput.value === passwordDbGabriel) {
    console.log('ok')
    setSuccessFor(userInput, passwordInput)
  } else {
    setErrorFor(userInput, passwordInput, "Informações inválidas")
  }
}

function setErrorFor(input1, input2, message) {
  const divForm = input1.parentElement
  const divForm2 = input2.parentElement
  const small = divForm2.querySelector("small")
  input2.className = 'border-error'
  input1.className = 'border-error'
  small.innerText = message
  small.className = 'error'
}
function setSuccessFor(input1, input2) {
  const divForm = input1.parentElement
  const divForm2 = input2.parentElement
  const small = divForm2.querySelector("small")
  input1.className = 'border-success'
  input2.className = 'border-success'
  small.className = 'success'
  small.innerText = ''
  window.location.href = "home.html"
}
async function getUsersDb() {
  const response = await fetch(`http://localhost/seuJoaoApi/users.json`)
  const data = await response.json()
  return data
}

