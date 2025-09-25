// Voorbeeldvragen
const questions = [
  {id:1, img:'<AFBEELDING>', q:'Wat is 2 + 2?', choices:{A:'3',B:'4',C:'5',D:'22'}, correct:'B'},
  {id:2, img:'<AFBEELDING>', q:'Wat is de hoofdstad van Nederland?', choices:{A:'Rotterdam',B:'Utrecht',C:'Amsterdam',D:'Den Haag'}, correct:'C'},
  {id:3, img:'<AFBEELDING>', q:'Kleur van de lucht?', choices:{A:'Groen',B:'Rood',C:'Geel',D:'Blauw'}, correct:'D'}
];

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
  answerBoxes.forEach(box => {
    const key = box.dataset.choice;
    box.className = "answer-box " + key.toLowerCase(); // reset alle klassen
    box.innerHTML = `<span>${key}. ${q.choices[key]}</span>`;
  });
}

// antwoord klikken
answerBoxes.forEach(box => box.addEventListener('click', () => {
  const choice = box.dataset.choice;
  const q = questions[current];
  if(answered[q.id]) return; // al beantwoord

  // disable alle knoppen voor deze vraag
  answerBoxes.forEach(b => b.classList.add('disabled'));

  const correctBox = Array.from(answerBoxes).find(b => b.dataset.choice === q.correct);
  correctBox.classList.add('correct');

  if(choice === q.correct){
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
