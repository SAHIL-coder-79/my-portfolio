function play(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    // Get image elements
    let playerHand = document.getElementById("playerHand");
    let computerHand = document.getElementById("computerHand");

    // Reset animations
    playerHand.classList.remove("shake");
    computerHand.classList.remove("shake");

    // Add shake animation
    setTimeout(() => {
        playerHand.classList.add("shake");
        computerHand.classList.add("shake");
    }, 100);

    // Change images after animation
    setTimeout(() => {
        playerHand.src = `${playerChoice}.png`;
        computerHand.src = `${computerChoice}.png`;

        let result = "";

        if (playerChoice === computerChoice) {
            result = "It's a tie!";
            document.getElementById("tieSound").play();
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            result = "You win!";
            document.getElementById("winSound").play();
        } else {
            result = "You lose!";
            document.getElementById("loseSound").play();
        }

        document.getElementById("result").innerText = result;
    }, 500); // Delay to match shake animation
}
