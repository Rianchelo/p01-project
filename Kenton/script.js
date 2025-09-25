// Landenquiz vragen en antwoorden
const quiz = [
  {
    question: "Welk land heeft de Eiffeltoren?",
    options: ["Italië", "Spanje", "Frankrijk", "Duitsland"],
    correct: 2 // Frankrijk
  },
  {
    question: "In welk continent ligt Brazilië?",
    options: ["Afrika", "Zuid-Amerika", "Azië", "Europa"],
    correct: 1 // Zuid-Amerika
  },
  {
    question: "Welke stad is de hoofdstad van Japan?",
    options: ["Osaka", "Kyoto", "Tokio", "Nagoya"],
    correct: 2 // Tokio
  },
  {
    question: "In welk land ligt de Sahara?",
    options: ["Egypte", "Argentinië", "Australië", "Canada"],
    correct: 0 // Egypte
  },
  {
    question: "Welke taal wordt officieel gesproken in Brazilië?",
    options: ["Spaans", "Portugees", "Engels", "Frans"],
    correct: 1 // Portugees
  },
  {
    question: "Welk land staat bekend als ‘het land van de rijzende zon’?",
    options: ["China", "Japan", "Thailand", "Zuid-Korea"],
    correct: 1 // Japan
  },
  {
    question: "Wat is de hoofdstad van Australië?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correct: 2 // Canberra
  },
  {
    question: "Welk land heeft de meeste inwoners ter wereld?",
    options: ["India", "China", "VS", "Rusland"],
    correct: 1 // China
  },
  {
    question: "Welke munteenheid gebruiken ze in het Verenigd Koninkrijk?",
    options: ["Euro", "Dollar", "Pond sterling", "Frank"],
    correct: 2 // Pond sterling
  },
  {
    question: "In welk land ligt de stad Marrakech?",
    options: ["Tunesië", "Marokko", "Algerije", "Egypte"],
    correct: 1 // Marokko
  },
  {
    question: "Welk land heeft de Mount Everest?",
    options: ["India", "Nepal", "Pakistan", "Bhutan"],
    correct: 1 // Nepal
  },
  {
    question: "Wat is de hoofdstad van Canada?",
    options: ["Toronto", "Montreal", "Ottawa", "Vancouver"],
    correct: 2 // Ottawa
  },
  {
    question: "Welk land heeft de vorm van een laars?",
    options: ["Spanje", "Italië", "Frankrijk", "Portugal"],
    correct: 1 // Italië
  },
  {
    question: "In welk land ligt de Taj Mahal?",
    options: ["Nepal", "Pakistan", "India", "Sri Lanka"],
    correct: 2 // India
  },
  {
    question: "Welke zee ligt tussen Europa en Afrika?",
    options: ["Atlantische Oceaan", "Middellandse Zee", "Noordzee", "Rode Zee"],
    correct: 1 // Middellandse Zee
  },
  {
    question: "In welk land ligt Machu Picchu?",
    options: ["Mexico", "Peru", "Brazilië", "Chili"],
    correct: 1 // Peru
  },
  {
    question: "Welke taal wordt het meest gesproken in Mexico?",
    options: ["Spaans", "Engels", "Portugees", "Frans"],
    correct: 0 // Spaans
  },
  {
    question: "Wat is het grootste land ter wereld qua oppervlakte?",
    options: ["Canada", "China", "Rusland", "VS"],
    correct: 2 // Rusland
  },
  {
    question: "Welk land wordt ook wel ‘Down Under’ genoemd?",
    options: ["Nieuw-Zeeland", "Zuid-Afrika", "Australië", "Indonesië"],
    correct: 2 // Australië
  },
  {
    question: "Welk land hoort niet bij Scandinavië?",
    options: ["Zweden", "Noorwegen", "Finland", "Nederland"],
    correct: 3 // Nederland
  }
];

// Voorbeeldfunctie om antwoord te checken:
function checkAnswer(questionIndex, answerIndex) {
  if (quiz[questionIndex].correct === answerIndex) {
    console.log("Goed!");
    return true;
  } else {
    console.log("Fout. Het juiste antwoord is: " +
      quiz[questionIndex].options[quiz[questionIndex].correct]);
    return false;
  }
}

// Voorbeeldgebruik:
checkAnswer(0, 2); // Frankrijk → Goed!
checkAnswer(1, 0); // Fout, Zuid-Amerika is juist