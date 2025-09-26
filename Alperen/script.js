// Voorbeeldvragen
const questions = [
  {id:1, img:'<AFBEELDING>', q:'Welk land heeft de Eiffeltoren?', choices:{A:'Frankrijk',B:'Duitsland',C:'Italië',D:'Spanje'}, correct:'A'},
  {id:2, img:'<AFBEELDING>', q:'Wat is de hoofdstad van Nederland?', choices:{A:'Rotterdam',B:'Utrecht',C:'Amsterdam',D:'Den Haag'}, correct:'C'},
  {id:3, img:'<AFBEELDING>', q:'In welk land ligt de Sahara?', choices:{A:'Algerije',B:'Libië',C:'Egypte',D:'Marokko'}, correct:'A'},
  {id:4, img:'<AFBEELDING>', q:'Welke stad is de hoofdstad van Japan?', choices:{A:'Tokyo',B:'Kyoto',C:'Osaka',D:'Hiroshima'}, correct:'A'},
  {id:5, img:'<AFBEELDING>', q:'In welk continent ligt Brazilië?', choices:{A:'Zuid-Amerika',B:'Afrika',C:'Europa',D:'Azië'}, correct:'A'},
  {id:6, img:'<AFBEELDING>', q:'Welke taal wordt officieel gesproken in Brazilië?', choices:{A:'Portugees',B:'Spaans',C:'Frans',D:'Engels'}, correct:'A'},
  {id:7, img:'<AFBEELDING>', q:'Welk land staat bekend als “het land van de rijzende zon”?', choices:{A:'Japan',B:'China',C:'Zuid-Korea',D:'Thailand'}, correct:'A'},
  {id:8, img:'<AFBEELDING>', q:'Wat is de hoofdstad van Australië?', choices:{A:'Canberra',B:'Sydney',C:'Melbourne',D:'Brisbane'}, correct:'A'},
  {id:9, img:'<AFBEELDING>', q:'Welk land heeft de meeste inwoners ter wereld?', choices:{A:'India',B:'China',C:'Verenigde Staten',D:'Indonesië'}, correct:'B'},
  {id:10, img:'<AFBEELDING>', q:'Welke munteenheid gebruiken ze in het Verenigd Koninkrijk?', choices:{A:'Euro',B:'Pound',C:'Dollar',D:'Yen'}, correct:'B'},
  {id:11, img:'<AFBEELDING>', q:'In welk land ligt de stad Marrakech?', choices:{A:'Marokko',B:'Algerije',C:'Tunesië',D:'Libië'}, correct:'A'},
  {id:12, img:'<AFBEELDING>', q:'Welk land heeft de Mount Everest?', choices:{A:'Nepal',B:'Tibet',C:'Indië',D:'Bhutan'}, correct:'A'},
  {id:13, img:'<AFBEELDING>', q:'Wat is de hoofdstad van Canada?', choices:{A:'Ottawa',B:'Toronto',C:'Vancouver',D:'Montreal'}, correct:'A'},
  {id:14, img:'<AFBEELDING>', q:'Welk land heeft de vorm van een laars?', choices:{A:'Spanje',B:'Italië',C:'Frankrijk',D:'Duitsland'}, correct:'B'},
  {id:15, img:'<AFBEELDING>', q:'In welk land ligt de Taj Mahal?', choices:{A:'India',B:'Pakistan',C:'Bangladesh',D:'Nepal'}, correct:'A'},
  {id:16, img:'<AFBEELDING>', q:'Welke zee ligt tussen Europa en Afrika?', choices:{A:'Middellandse Zee',B:'Noordzee',C:'Oostzee',D:'Zwarte Zee'}, correct:'A'},
  {id:17, img:'<AFBEELDING>', q:'In welk land ligt Machu Picchu?', choices:{A:'Peru',B:'Chili',C:'Bolivia',D:'Ecuador'}, correct:'A'},
  {id:18, img:'<AFBEELDING>', q:'Welke taal wordt het meest gesproken in Mexico?', choices:{A:'Spaans',B:'Engels',C:'Frans',D:'Portugees'}, correct:'A'},
  {id:19, img:'<AFBEELDING>', q:'Wat is het grootste land ter wereld qua oppervlakte?', choices:{A:'Rusland',B:'Canada',C:'Verenigde Staten',D:'China'}, correct:'A'},
  {id:20, img:'<AFBEELDING>', q:'Welk land wordt ook wel “Down Under” genoemd?', choices:{A:'Australië',B:'Nieuw-Zeeland',C:'Fiji',D:'Papoea-Nieuw-Guinea'}, correct:'A'},


]

let current = 0;
let points = 0;
const answered = {};
let startTime = null;  // tijd bij start quiz
let endTime = null;

const qImage = document.getElementById('qImage');
const qText = document.getElementById('qText');
const totalPoints = document.getElementById('totalPoints');
const answerBoxes = document.querySelectorAll('.answer-box');
const miniLeaderboard = document.getElementById('miniLeaderboard');

function renderQuestion(){
  const q = questions[current];
  qImage.innerHTML = q.img;
  qText.textContent = q.q;

  // Randomize choices
  const choiceKeys = Object.keys(q.choices);
  const shuffled = choiceKeys
    .map(key => ({ key, value: q.choices[key] }))
    .sort(() => Math.random() - 0.5);

  // Find new correct key
  const correctValue = q.choices[q.correct];
  let newCorrectKey = null;
  shuffled.forEach((item, idx) => {
    if (item.value === correctValue) {
      newCorrectKey = ['A','B','C','D'][idx];
    }
  });
  // Store new choices and correct key for this render
  q._shuffledChoices = {};
  shuffled.forEach((item, idx) => {
    q._shuffledChoices[['A','B','C','D'][idx]] = item.value;
  });
  q._shuffledCorrect = newCorrectKey;

  answerBoxes.forEach((box, idx) => {
    const key = ['A','B','C','D'][idx];
    box.className = "answer-box " + key.toLowerCase(); // reset alle klassen
    box.innerHTML = `<span>${key}. ${q._shuffledChoices[key]}</span>`;
    box.dataset.choice = key;
  });
}

// antwoord klikken
answerBoxes.forEach(box => box.addEventListener('click', () => {
  const choice = box.dataset.choice;
  const q = questions[current];
  if(answered[q.id]) return; // al beantwoord

  // disable alle knoppen voor deze vraag
  answerBoxes.forEach(b => b.classList.add('disabled'));

  const correctBox = Array.from(answerBoxes).find(b => b.dataset.choice === q._shuffledCorrect);
  correctBox.classList.add('correct');

  if(choice === q._shuffledCorrect){
    points += 1;
    updatePoints();
  } else {
    box.classList.add('wrong');
  }

  answered[q.id] = true;
}));

function updatePoints(){
  totalPoints.textContent = points + ' ptn';
  updateMiniLeaderboard();
}

document.getElementById('nextBtn').addEventListener('click', () => {
  if(current < questions.length -1){
    current++;
    renderQuestion();
  } else {
    // einde quiz → tijd stoppen
    endTime = Date.now();
    saveScoreAndShowLeaderboard();
  }
});
document.getElementById('backBtn').addEventListener('click', ()=>{
  if(current>0){ current--; renderQuestion(); }
});

// Leaderboard opslaan
function loadLeaderboard(){
  const raw = localStorage.getItem('quiz_leaderboard');
  return raw ? JSON.parse(raw) : [];
}
function saveLeaderboard(list){ localStorage.setItem('quiz_leaderboard', JSON.stringify(list)); }

function saveScoreAndShowLeaderboard(){
  const list = loadLeaderboard();
  const durationSec = Math.round((endTime - startTime)/1000); // tijd in seconden
  const entry = {name:'Guest', time: durationSec + " sec", score: points};
  list.push(entry);
  list.sort((a,b)=> b.score - a.score || parseInt(a.time) - parseInt(b.time));
  saveLeaderboard(list);
  showLeaderboard(list);
}

function showLeaderboard(list){
  document.getElementById('quizView').style.display='none';
  document.getElementById('bottomBar').style.display='none';
  document.getElementById('leaderboardView').style.display='block';
  document.getElementById('leaderControls').style.display='flex';

  const tbody = document.getElementById('leaderRows');
  tbody.innerHTML = '';
  list.forEach(row=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.name}</td><td>${row.time}</td><td style="text-align:right">${row.score}</td>`;
    tbody.appendChild(tr);
  });
}

document.getElementById('homeBtn').addEventListener('click', ()=>{ goHome(); });
document.getElementById('backWatch').addEventListener('click', ()=>{
  document.getElementById('leaderboardView').style.display='none';
  document.getElementById('leaderControls').style.display='none';
  document.getElementById('quizView').style.display='block';
  document.getElementById('bottomBar').style.display='flex';
});

document.getElementById('shareBtn').addEventListener('click', ()=>{
  const list = loadLeaderboard();
  const top = list.slice(0,5).map((r,i)=>`${i+1}. ${r.name} ${r.score}p (${r.time})`).join('\n');
  navigator.clipboard?.writeText('Leaderboard:\n'+top).then(()=>alert('Leaderboard gekopieerd!'));
});

function goHome(){
  current = 0; points = 0; for(let k in answered) delete answered[k];
  startTime = Date.now(); endTime = null;
  updatePoints(); renderQuestion();
  document.getElementById('leaderboardView').style.display='none';
  document.getElementById('leaderControls').style.display='none';
  document.getElementById('quizView').style.display='block';
  document.getElementById('bottomBar').style.display='flex';
}

function updateMiniLeaderboard(){
  const list = loadLeaderboard();
  const top = list.slice(0,3).map((r,i)=>`${i+1}. ${r.name} ${r.score}`).join('  ');
  miniLeaderboard.textContent = top || '1. ---  2. ---  3. ---';
}

// initial start
startTime = Date.now();
renderQuestion();
updatePoints();
updateMiniLeaderboard();
