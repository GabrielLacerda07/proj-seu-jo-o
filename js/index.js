const btnSubmit = document.querySelector('#send')
btnSubmit.addEventListener('click', (event) => {
  event.preventDefault()
  const userInput = document.querySelector('#user')
  const passwordInput = document.querySelector('#password')
  verificaUser(userInput, passwordInput)
})

async function verificaUser(userInput, passwordInput) {
  const usersBd = await getUsersBd()
  const arrUsersBd = usersBd.users
  arrUsersBd.forEach(userBd => {
    if (userInput.value == userBd.User.email && passwordInput.value == userBd.User.senha) {
      window.location.href = 'home.html'
    } else {
      erroLogin()
    }
  })
}
function erroLogin(userInput, passwordInput) {
  if (!userInput) {

  }
}
async function getUsersBd() {
  const response = await fetch(`http://localhost/seuJoaoApi/users.json`)
  const data = await response.json()
  return data
}

