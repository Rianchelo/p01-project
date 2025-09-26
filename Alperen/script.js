// Voorbeeldvragen
const questions = [
  {id:1, q:'Welk land heeft de Eiffeltoren?', choices:{A:'Frankrijk',B:'Duitsland',C:'Italië',D:'Spanje'}, correct:'A'},
  {id:2, q:'Wat is de hoofdstad van Nederland?', choices:{A:'Rotterdam',B:'Utrecht',C:'Amsterdam',D:'Den Haag'}, correct:'C'},
  {id:3, q:'In welk land ligt de Sahara?', choices:{A:'Algerije',B:'Libië',C:'Egypte',D:'Marokko'}, correct:'A'},
  {id:4, q:'Welke stad is de hoofdstad van Japan?', choices:{A:'Tokyo',B:'Kyoto',C:'Osaka',D:'Hiroshima'}, correct:'A'},
  {id:5, q:'In welk continent ligt Brazilië?', choices:{A:'Zuid-Amerika',B:'Afrika',C:'Europa',D:'Azië'}, correct:'A'},
  {id:6, q:'Welke taal wordt officieel gesproken in Brazilië?', choices:{A:'Portugees',B:'Spaans',C:'Frans',D:'Engels'}, correct:'A'},
  {id:7, q:'Welk land staat bekend als “het land van de rijzende zon”?', choices:{A:'Japan',B:'China',C:'Zuid-Korea',D:'Thailand'}, correct:'A'},
  {id:8, q:'Wat is de hoofdstad van Australië?', choices:{A:'Canberra',B:'Sydney',C:'Melbourne',D:'Brisbane'}, correct:'A'},
  {id:9, q:'Welk land heeft de meeste inwoners ter wereld?', choices:{A:'India',B:'China',C:'Verenigde Staten',D:'Indonesië'}, correct:'B'},
  {id:10, q:'Welke munteenheid gebruiken ze in het Verenigd Koninkrijk?', choices:{A:'Euro',B:'Pound',C:'Dollar',D:'Yen'}, correct:'B'},
  {id:11, q:'In welk land ligt de stad Marrakech?', choices:{A:'Marokko',B:'Algerije',C:'Tunesië',D:'Libië'}, correct:'A'},
  {id:12, q:'Welk land heeft de Mount Everest?', choices:{A:'Nepal',B:'Tibet',C:'Indië',D:'Bhutan'}, correct:'A'},
  {id:13, q:'Wat is de hoofdstad van Canada?', choices:{A:'Ottawa',B:'Toronto',C:'Vancouver',D:'Montreal'}, correct:'A'},
  {id:14, q:'Welk land heeft de vorm van een laars?', choices:{A:'Spanje',B:'Italië',C:'Frankrijk',D:'Duitsland'}, correct:'B'},
  {id:15, q:'In welk land ligt de Taj Mahal?', choices:{A:'India',B:'Pakistan',C:'Bangladesh',D:'Nepal'}, correct:'A'},
  {id:16, q:'Welke zee ligt tussen Europa en Afrika?', choices:{A:'Middellandse Zee',B:'Noordzee',C:'Oostzee',D:'Zwarte Zee'}, correct:'A'},
  {id:17, q:'In welk land ligt Machu Picchu?', choices:{A:'Peru',B:'Chili',C:'Bolivia',D:'Ecuador'}, correct:'A'},
  {id:18, q:'Welke taal wordt het meest gesproken in Mexico?', choices:{A:'Spaans',B:'Engels',C:'Frans',D:'Portugees'}, correct:'A'},
  {id:19, q:'Wat is het grootste land ter wereld qua oppervlakte?', choices:{A:'Rusland',B:'Canada',C:'Verenigde Staten',D:'China'}, correct:'A'},
  {id:20, q:'Welk land wordt ook wel “Down Under” genoemd?', choices:{A:'Australië',B:'Nieuw-Zeeland',C:'Fiji',D:'Papoea-Nieuw-Guinea'}, correct:'A'},


]

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



