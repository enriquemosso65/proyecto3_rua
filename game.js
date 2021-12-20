const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Una mano se encuentra levantada si:",
        choice1: '	Su posición es mayor a la posición del cuello en el eje X',
        choice2: '	Su posición es mayor a la posición del cuello en el eje X',
        choice3: '	Su posición es menor a la posición del cuello en el eje Y',
        choice4: '	Su posición es mayor a la posición del cuello en el eje Y ',
        answer: 4,
    },
    {
        question:
        "Que ocurriría si los valores del eje Y no estuvieran inversos",
        choice1: "Las pendientes resultarían negativas",
        choice2: "Cambiaria el orden de las pendientes en la fórmula para obtener el grado",
        choice3: "El resultado de la segunda formula sería negativo",
        choice4: "Ninguna de las anteriores",
        answer: 2,
    },
    {
        question: "Para que sirve la función math.atan",
        choice1: "Permite aplicar la fórmula del arcotangente a la variable",
        choice2: "Permite aplicar la fórmula de la tangente a la variable ",
        choice3: "Convierte el valor de radianes a grados",
        choice4: "Convierte el valor de grados a radianes ",
        answer: 1,
    },
    {
        question: "Son algunas áreas donde se aplica la detección de pose, excepto: ",
        choice1: "BodyTracking",
        choice2: "Reconocimiento de Gestos",
        choice3: "Realidad Aumentada  ",
        choice4: "Sistemas de Recomendación ",
        answer: 4,
    },
    {
        question: "La función math.degrees hace uso de la formula",
        choice1: "x(180°/π) = y°",
        choice2: "(x/π) 180° = y°",
        choice3: "(x * π)/180° = y°",
        choice4: "(π)/180° = y°",
        answer: 1,
    },
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        const div =  document.getElementById('divi')
            div.classList.remove('container3')
            div.innerHTML=""
            document.getElementById('ending').style.display = 'flex'
        document.getElementById('finalScore').innerHTML = score +' '+ '/ 5'
    }

    questionCounter++
    progressText.innerText = `Pregunta ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

 