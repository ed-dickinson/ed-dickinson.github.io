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

const rudeWordReplacer = (rude_word) => {
  rude_word = rude_word.replace(/cum/i, "***");
  rude_word = rude_word.replace(/fuck/i, "****");
  rude_word = rude_word.replace(/cunt/i, "****");
  rude_word = rude_word.replace(/dick/i, "****");
  rude_word = rude_word.replace(/shit/i, "****");
  rude_word = rude_word.replace(/cock/i, "****");
  rude_word = rude_word.replace(/twat/i, "****");
  return rude_word;
}

let leaderboard;

const domain = 'https://tumbleword-leaderboard.herokuapp.com'

const fillLeaderboard = (scores) => {
  let parent = document.querySelector('#leaderboard #scores')
  parent.innerHTML = ''
  scores.forEach(score => {
    let child = document.createElement('tr')
    // child.innerHTML = `<td>${score.name} -</td> <td>${score.words}</td> <td>(${score.points})</td>`
    score.name = rudeWordReplacer(score.name)
    child.innerHTML = `<td>${score.name} <span style="font-weight: 500;">-</span></td> <td>${score.words}</td> <td>word${score.words===1?'':'s'}</td>`
    parent.appendChild(child)
  })
}

const getLeaderboard = () => {

  get(domain + '/scores')
    .then(data => {
      leaderboard = data
      fillLeaderboard(leaderboard)
      document.querySelector('#leaderboard #loading-dots').classList.add('hidden')
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
  if (game_over) {
    dom.banner.classList.remove('hidden')
  }
  dom.leaderboard.classList.add('hidden')
});

dom.start_leaderboard_button.addEventListener('click', () => {
  dom.leaderboard.classList.remove('hidden')
})

leaderboard = [{name: 'test', points: 0, words: 0}]
