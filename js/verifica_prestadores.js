
createTbody()
async function getProvidersDb() {
  const response = await fetch(`http://localhost/seuJoaoApi/providers.json`)
  const data = await response.json()
  return data.prestadores
}
async function deteleUser(id) {
  const response = await fetch(`http://localhost/seuJoaoApi/providers/delete/${id}`)
  window.location.reload()
}

async function createTbody() {
  const tbody = document.querySelector('.tbody')
  let dataProviders = await getProvidersDb()
  const html = {
    get(element) {
      return document.querySelector(element)
    }
  }
  const list = {
    create(provider) {
      let tr = tbody.insertRow()
      let td_id = tr.insertCell()
      let td_name = tr.insertCell()
      let td_email = tr.insertCell()
      let td_telefone = tr.insertCell()
      let td_service = tr.insertCell()
      let td_detalhes = tr.insertCell()
      let td_delete = tr.insertCell()

      td_id.innerText = provider.Provider.id
      td_name.innerText = provider.Provider.nome
      td_email.innerText = provider.Provider.email
      td_telefone.innerText = provider.Provider.telefone
      td_service.innerText = provider.Service.nome
      let btnDelete = document.createElement('button')
      btnDelete.setAttribute('id', provider.Provider.id)
      btnDelete.setAttribute('class', 'btn btn-danger text-light')
      let iconLixeira = document.createElement('i')
      iconLixeira.setAttribute('class', 'fa-solid fa-trash')
      btnDelete.appendChild(iconLixeira)
      td_delete.appendChild(btnDelete)

      btnDelete.addEventListener('click', () => {
        deteleUser(provider.Provider.id)
      })

      let a = document.createElement('a')
      let link = `detalhes.html?id=${provider.Provider.id}`
      a.setAttribute('href', link)
      a.setAttribute('id', provider.Provider.id)
      a.innerText = 'Detalhes'
      a.style.color = 'black'
      td_detalhes.appendChild(a)


    },
    update() {
      html.get('tbody').innerText = " "
      let page = state.page - 1
      let start = page * state.perPage
      let end = start + state.perPage
      const paginatedItems = dataProviders.slice(start, end)
      paginatedItems.forEach(list.create)
    }
  }

  let perPage = 10
  const state = {
    page: 1,
    perPage,
    totalPage: Math.ceil(dataProviders.length / perPage),
    maxVisibleButtons: 5
  }

  const controls = {
    next() {
      state.page++
      if (state.page > state.totalPage) {
        state.page--
      }
    },
    prev() {
      state.page--
      if (state.page < 1) {
        state.page++
      }
    },
    goTo(page) {
      if (page < 1) {
        page = 1
      }
      state.page = page
      if (page > state.totalPage) {
        state.page = state.totalPage
      }
    },
    createListeners() {
      html.get('.first').addEventListener('click', () => {
        controls.goTo(1)
        update()
      })
      html.get('.last').addEventListener('click', () => {
        controls.goTo(state.totalPage)
        update()
      })
      html.get('.next').addEventListener('click', () => {
        controls.next()
        update()
      })
      html.get('.prev').addEventListener('click', () => {
        controls.prev()
        update()
      })
    }
  }
  init()
  function update() {
    list.update()
  }
  function init() {
    list.update()
    controls.createListeners()
  }


  // const tableRows = document.querySelectorAll('tr')
  // const exportBtn = document.querySelector('#exportBtn')

  // exportBtn.addEventListener('click', () => {

  //   const CSVString = Array.from(tableRows)
  //     .map(row => Array.from(row.cells)
  //       .map(cell => cell.textContent)
  //       .join(', ')
  //     )
  //     .join('\n')
  //   exportBtn.setAttribute(
  //     'href',
  //     `data:text/csv;charset=utf-8,${encodeURIComponent(CSVString)}`
  //   )
  //   exportBtn.setAttribute('dowload', 'table.csv')
  // })
}