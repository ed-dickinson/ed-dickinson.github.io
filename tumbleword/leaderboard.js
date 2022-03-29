async function get(term) {
  const response = await fetch(term, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  const data = await response.json();

  // console.log(data)
  return data;
}

async function post(term, data) {
  const response = await fetch(term, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data)
  })

  const response_data = await response.json()

  return response_data
}

let leaderboard;

const domain = 'https://tumbleword-leaderboard.herokuapp.com'

const fillLeaderboard = (scores) => {
  let parent = document.querySelector('#leaderboard #scores')
  parent.innerHTML = ''
  scores.forEach(score => {
    let child = document.createElement('tr')
    child.innerHTML = `<td>${score.name} -</td> <td>${score.words}</td> / <td>${score.points}</td>`
    parent.appendChild(child)
  })
}

const getLeaderboard = () => {

  get(domain + '/scores')
    .then(data => {
      console.log(data)
      leaderboard = data
      fillLeaderboard(leaderboard)
    })
    .catch(e => console.log(e))
}

getLeaderboard()

const postScore = (score) => {

  post(domain + '/add_score', score)
    .then(response => {
      console.log('Success, scored added: ', response)
      getLeaderboard()
    })
    .catch(e => console.log(e))
}

// let test_score = {name: '', words: 0, points: 10}

dom.show_leaderboard.addEventListener('click', () => {
  dom.leaderboard.classList.remove('hidden')
  dom.banner.classList.add('hidden')
})

dom.leaderboard_close_button.addEventListener('click', () => {
  dom.banner.classList.remove('hidden')
  dom.leaderboard.classList.add('hidden')
});
