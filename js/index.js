const btnSubmit = document.querySelector('#send')
btnSubmit.addEventListener('click', (event) => {
  event.preventDefault()
  const userInput = document.querySelector('#user')
  const passwordInput = document.querySelector('#password')
  console.log(validatePasswordDb(passwordInput))
  if (validateUserDb(userInput).value == 1 && validatePasswordDb(passwordInput) == 2) {
    console.log('Passou')
  }
})


function checkUser(userInput) {
  if (userInput.value === "") {
    setErrorFor(userInput, 'O usuário é obrigatório!');
  } else if (!checkEmail(userInput.value)) {
    setErrorFor(userInput, 'Insira um email válido');
  } else if (validateUserDb(userInput)) {
    setErrorFor(userInput, 'Usuário não cadastrado');
  } else {
    setSuccessFor(userInput)
  }
}
function checkPassword(passwordInput) {
  if (passwordInput.value === "") {
    setErrorFor(passwordInput, 'A senha é obrigatória')
  } else if (validatePasswordDb(passwordInput)) {
    setErrorFor(passwordInput, 'Insira a senha corretamente')
  } else {
    setSuccessFor(userInput)
  }
}
function setErrorFor(input, message) {
  const divForm = input.parentElement
  const small = divForm.querySelector("small")
  input.className = 'border-error'
  small.innerText = message
  small.className = 'error'
}
function setSuccessFor(input) {
  const divForm = input.parentElement
  const small = divForm.querySelector("small")
  input.className = 'border-success'
  small.className = 'success'
  small.innerText = ''
}
function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
//
async function validateUserDb(userInput) {
  const usersDb = await getUsersDb()
  const userDb = usersDb.users[0].User.email
  if (userInput.value === userDb) {
    setSuccessFor(userInput)
    const resultValide = 1
    return resultValide
  }
}
async function validatePasswordDb(passwordInput) {
  const usersDb = await getUsersDb()
  const userDb = usersDb.users[0].User.senha
  if (passwordInput.value === userDb) {
    setSuccessFor(passwordInput)
    const resultValide = 2
    return resultValide
  }
}
async function getUsersDb() {
  const response = await fetch(`http://localhost/seuJoaoApi/users.json`)
  const data = await response.json()
  return data
}

