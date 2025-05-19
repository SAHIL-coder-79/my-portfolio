const questions = [
    { question: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], correct: 0 },
    { question: "Which language is used for styling web pages?", answers: ["HTML", "JQuery", "CSS"], correct: 2 },
    { question: "Which is not a JavaScript framework?", answers: ["React", "Django", "Vue"], correct: 1 },
    { question: "What does CSS stand for?", answers: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheet"], correct: 0 },
    { question: "Which HTML tag is used to create a hyperlink?", answers: ["<a>", "<link>", "<href>"], correct: 0 },
    { question: "Which company developed JavaScript?", answers: ["Netscape", "Microsoft", "Google"], correct: 0 },
    { question: "Which symbol is used for comments in JavaScript?", answers: ["//", "/* */", "#"], correct: 0 },
    { question: "Which is a backend language?", answers: ["Python", "HTML", "CSS"], correct: 0 },
    { question: "What does DOM stand for?", answers: ["Document Object Model", "Data Object Model", "Document Oriented Model"], correct: 0 },
    { question: "Which method is used to print in JavaScript?", answers: ["console.log()", "print()", "echo()"], correct: 0 },
    { question: "Which tag is used for the largest heading in HTML?", answers: ["<h1>", "<heading>", "<head>"], correct: 0 },
    { question: "Which of these is a Python framework?", answers: ["Django", "React", "Laravel"], correct: 0 },
    { question: "What is the correct file extension for JavaScript files?", answers: [".js", ".java", ".javascript"], correct: 0 },
    { question: "Which HTML attribute is used to define inline styles?", answers: ["style", "class", "font"], correct: 0 },
    { question: "Which CSS property changes the text color?", answers: ["color", "font-color", "text-color"], correct: 0 }
];
let current = 0, score = 0;

function playClick() {
    document.getElementById('clickSound').currentTime = 0;
    document.getElementById('clickSound').play();
}

function showQuestion() {
    document.getElementById('question').textContent = questions[current].question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    questions[current].answers.forEach((ans, i) => {
        const btn = document.createElement('button');
        btn.textContent = ans;
        btn.onclick = () => {
            playClick();
            if (i === questions[current].correct) score++;
            document.getElementById('nextBtn').disabled = false;
            // Disable all buttons after one is clicked
            Array.from(answersDiv.children).forEach(b => b.disabled = true);
            btn.style.background = i === questions[current].correct ? "#4caf50" : "#e74c3c";
        };
        answersDiv.appendChild(btn);
    });
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('score').textContent = `Question ${current + 1} of ${questions.length}`;
}

function showResult() {
    const questionDiv = document.getElementById('question');
    const answersDiv = document.getElementById('answers');
    const scoreDiv = document.getElementById('score');
    const nextBtn = document.getElementById('nextBtn');
    answersDiv.innerHTML = "";
    nextBtn.style.display = "none";
    let message, color, emoji, animation;
    if (score >= Math.ceil(questions.length * 0.7)) {
        message = "🎉 Congratulations! 🎉";
        color = "#ffd700";
        emoji = "👏";
        animation = "congrats-anim 1s ease-in-out";
    } else {
        message = "Try Again!";
        color = "#e74c3c";
        emoji = "😅";
        animation = "tryagain-anim 1s ease-in-out";
    }
    questionDiv.innerHTML = `<span style="font-size:2.2em; color:${color}; display:inline-block; animation:${animation};">${message} ${emoji}</span>`;
    scoreDiv.innerHTML = `<span style="font-size:1.3em; color:${color};">${score}/${questions.length} correct</span>`;
}



document.getElementById('nextBtn').onclick = () => {
    current++;
    if (current < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};
showQuestion();