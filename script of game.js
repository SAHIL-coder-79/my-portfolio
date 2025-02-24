// Adventure Story Choices
const story = {
    1: { text: "You took the left path and found an ancient bridge. Do you cross it?",
        choices: [
            { text: "Yes, cross the bridge", next: 3 },
            { text: "No, find another way", next: 4 }
        ]
    },
    2: { text: "You took the right path and encountered a wild tiger. What do you do?",
        choices: [
            { text: "Run away", next: 5 },
            { text: "Climb a tree", next: 6 }
        ]
    },
    3: { text: "The bridge starts collapsing! Do you run or walk carefully?",
        choices: [
            { text: "Run fast", next: 7 },
            { text: "Walk carefully", next: 8 }
        ]
    },
    4: { text: "You find a hidden tunnel leading into darkness. Enter?",
        choices: [
            { text: "Yes, enter the tunnel", next: 9 },
            { text: "Turn back", next: 10 }
        ]
    },
    7: { text: "You ran too fast and fell into the river. Game Over!", choices: [], gameOver: true },
    8: { text: "You carefully crossed and found a golden temple! You win!", choices: [], win: true },
    10: { text: "You got lost in the jungle. Game Over!", choices: [], gameOver: true },
};

// Function to handle player choices
function makeChoice(choice) {
    let newStory = story[choice];

    // Play choice sound
    document.getElementById("choice-sound").play();

    document.getElementById("story-text").innerText = newStory.text;
    document.getElementById("choices").innerHTML = "";

    if (newStory.gameOver) {
        document.getElementById("lose-sound").play();
        showTryAgainButton();
        return;
    }

    if (newStory.win) {
        document.getElementById("win-sound").play();
        triggerVictory();
        return;
    }

    newStory.choices.forEach(choice => {
        let button = document.createElement("button");
        button.innerText = choice.text;
        button.onclick = () => makeChoice(choice.next);
        document.getElementById("choices").appendChild(button);
    });
}

// Show Victory Celebration
function triggerVictory() {
    const confettiSettings = { target: 'confetti-canvas' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    document.getElementById("victory-message").style.display = "block";
}

// Restart the game
function restartGame() {
    location.reload();
}

// Start background music when the page loads
window.onload = () => {
    let bgMusic = document.getElementById("bg-music");
    bgMusic.volume = 0.3;
    bgMusic.play();
};
