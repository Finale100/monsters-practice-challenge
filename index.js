document.addEventListener("DOMContentLoaded", init)
let monsterButton = document.getElementById('new-monster')
let backButton = document.getElementById('back')
let forwardButton = document.getElementById('forward')
let page = 1
let reload = document.getElementById('monster-container')

function init() {
firstFifty()
monsterButton.addEventListener('click', clickHandler)
backButton.addEventListener('click', back)
forwardButton.addEventListener('click', forward)
}

function back() {
  --page
  reload.innerHTML = ""
  firstFifty()
  if(page < 1) {
    alert("No Monsters HERE! PLEASE GO FORWARD")
    page = 1
  }
}

function forward() {
  ++page
  reload.innerHTML = ""
  firstFifty()
}

function firstFifty() {
  fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
  .then(response => response.json())
  .then(json => {
    for(let monster in json) {
      render(json[monster])
    }
  })
}

function render(monster) {
  let container = document.getElementById('monster-container')
  let newMonster = document.createElement('div')
  let monsterName = document.createElement('h2')
  let monsterAge = document.createElement('li')
  let monsterDesc = document.createElement('li')
  container.appendChild(newMonster)
  newMonster.appendChild(monsterName)
  newMonster.appendChild(monsterAge)
  newMonster.appendChild(monsterDesc)
  monsterName.innerText = monster.name
  monsterAge.innerText = `Age: ${monster.age}`
  monsterDesc.innerText = `Description: ${monster.description}`
}

function clickHandler(event){
  event.preventDefault()
  let name = document.getElementById('monster-name').value
  let age = document.getElementById('monster-age').value
  let description = document.getElementById('monster-description').value
  createMonster(name, age, description)

}

function createMonster(name, age, description) {
  fetch(`http://localhost:3000/monsters`, {
    "method": "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
    },
    "body": JSON.stringify({
      "name": name,
       age: age,
      "description": description,
    })
  })
  alert('Successfully Added A Monster!')
  document.getElementById('monster-name').value = ""
  document.getElementById('monster-age').value = ""
  document.getElementById('monster-description').value = ""
}
