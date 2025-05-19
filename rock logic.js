let winCount = 0, lossCount = 0, tieCount = 0;

function playGame(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    let shuffleIndex = 0;
    let shuffleCount = 0;
    const maxShuffles = 12; // Controls how long the animation lasts (12 * 100ms = 1.2s)
    let computerChoice = choices[Math.floor(Math.random() * 3)];

    // Highlight player's choice
    document.getElementById("playerRock").classList.remove("selected");
    document.getElementById("playerPaper").classList.remove("selected");
    document.getElementById("playerScissors").classList.remove("selected");
    document.getElementById("player" + capitalize(playerChoice)).classList.add("selected");

    // Prepare computer hands for animation
    document.getElementById("computerRock").classList.remove("selected");
    document.getElementById("computerPaper").classList.remove("selected");
    document.getElementById("computerScissors").classList.remove("selected");

    // Disable buttons during animation
    document.querySelectorAll(".buttons button").forEach(btn => btn.disabled = true);

    // Shuffle animation
    const shuffleInterval = setInterval(() => {
        // Remove selected from all
        document.getElementById("computerRock").classList.remove("selected");
        document.getElementById("computerPaper").classList.remove("selected");
        document.getElementById("computerScissors").classList.remove("selected");
        // Add selected to current shuffle
        const current = choices[shuffleIndex % 3];
        document.getElementById("computer" + capitalize(current)).classList.add("selected");
        shuffleIndex++;
        shuffleCount++;
        if (shuffleCount >= maxShuffles) {
            clearInterval(shuffleInterval);

            // Final computer choice
            document.getElementById("computerRock").classList.remove("selected");
            document.getElementById("computerPaper").classList.remove("selected");
            document.getElementById("computerScissors").classList.remove("selected");
            document.getElementById("computer" + capitalize(computerChoice)).classList.add("selected");

            // Result logic
            let resultText = "";
            if (playerChoice === computerChoice) {
                resultText = "It's a Tie!";
                tieCount++;
                document.getElementById("tieSound").play();
            } else if (
                (playerChoice === "rock" && computerChoice === "scissors") ||
                (playerChoice === "paper" && computerChoice === "rock") ||
                (playerChoice === "scissors" && computerChoice === "paper")
            ) {
                resultText = "You Win!";
                winCount++;
                document.getElementById("winSound").play();
            } else {
                resultText = "You Lose!";
                lossCount++;
                document.getElementById("loseSound").play();
            }
            document.getElementById("wins").innerText = winCount;
            document.getElementById("losses").innerText = lossCount;
            document.getElementById("ties").innerText = tieCount;

            document.getElementById("result").innerText = resultText;
            document.getElementById("playAgain").style.display = "block";
            document.querySelector(".buttons").style.display = "none";
            // Enable buttons after animation (if needed elsewhere)
            document.querySelectorAll(".buttons button").forEach(btn => btn.disabled = false);
        }
    }, 100); // 100ms per shuffle
}

function resetGame() {
    // Reset all hands to default (rock selected)
    document.getElementById("playerRock").classList.add("selected");
    document.getElementById("playerPaper").classList.remove("selected");
    document.getElementById("playerScissors").classList.remove("selected");

    document.getElementById("computerRock").classList.add("selected");
    document.getElementById("computerPaper").classList.remove("selected");
    document.getElementById("computerScissors").classList.remove("selected");

    document.getElementById("result").innerText = "";
    document.getElementById("playAgain").style.display = "none";
    document.querySelector(".buttons").style.display = "block";
    document.querySelectorAll(".buttons button").forEach(btn => btn.disabled = false);
}

// Helper function
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
for(let i=0;i<40;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*2+1,
        dx: (Math.random()-0.5)*0.5,
        dy: (Math.random()-0.5)*0.5,
        color: `rgba(255,255,255,${Math.random()*0.5+0.2})`
    });
}
function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let p of particles){
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,2*Math.PI);
        ctx.fillStyle=p.color;
        ctx.fill();
        p.x+=p.dx;
        p.y+=p.dy;
        if(p.x<0||p.x>canvas.width) p.dx*=-1;
        if(p.y<0||p.y>canvas.height) p.dy*=-1;
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();
