function playGame(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    const playerHand = document.getElementById("playerHand");
    const computerHand = document.getElementById("computerHand");

    // Apply bounce animation
    playerHand.classList.add("bounce");
    computerHand.classList.add("bounce");

    // Wait for animation to complete before changing images
    setTimeout(() => {
        playerHand.classList.remove("bounce");
        computerHand.classList.remove("bounce");

        playerHand.src = playerChoice + ".png";
        computerHand.src = computerChoice + ".png";

        let resultText = "";
        if (playerChoice === computerChoice) {
            resultText = "It's a Tie!";
            document.getElementById("tieSound").play();
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            resultText = "You Win!";
            document.getElementById("winSound").play();
        } else {
            resultText = "You Lose!";
            document.getElementById("loseSound").play();
        }

        document.getElementById("result").innerText = resultText;

        // Show the Play Again button and hide the main buttons
        document.getElementById("playAgain").style.display = "block";
        document.querySelector(".buttons").style.display = "none";

    }, 500); // Matches bounce animation duration
}

function resetGame() {
    document.getElementById("result").innerText = "";
    document.getElementById("playerHand").src = "rock.png";
    document.getElementById("computerHand").src = "rock.png";

    // Hide the Play Again button and show the main buttons
    document.getElementById("playAgain").style.display = "none";
    document.querySelector(".buttons").style.display = "block";
}
