// Adventure Story Choices
const story = {
    1: { text: "You took the left path and found an ancient bridge. Do you cross it?",
        img: "bridge.jpg",
        choices: [
            { text: "Yes, cross the bridge", next: 3 },
            { text: "No, find another way", next: 4 }
        ]
    },
    2: { text: "You took the right path and encountered a wild tiger. What do you do?",
        img: "tiger.jpg",
        choices: [
            { text: "Run away", next: 5 },
            { text: "Climb a tree", next: 6 }
        ]
    },
    3: { text: "The bridge starts collapsing! Do you run or walk carefully?",
        img: "collapsing_bridge.jpg",
        choices: [
            { text: "Run fast", next: 7 },
            { text: "Walk carefully", next: 8 }
        ]
    },
    4: { text: "You find a hidden tunnel leading into darkness. Enter?",
        img: "tunnel.jpg",
        choices: [
            { text: "Yes, enter the tunnel", next: 9 },
            { text: "Turn back", next: 10 }
        ]
    },
    5: { text: "You try to run, but the tiger is faster. Game Over!", choices: [], gameOver: true },
    6: { text: "You climb a tree and wait. The tiger leaves. Do you climb down or wait longer?",
        img: "tree.jpg",
        choices: [
            { text: "Climb down", next: 11 },
            { text: "Wait longer", next: 12 }
        ]
    },
    7: { text: "You ran too fast and fell into the river. Game Over!", choices: [], gameOver: true },
    8: { text: "You carefully crossed and found a golden temple! You win!", choices: [], win: true },
    9: { text: "Inside the tunnel, you find a treasure chest. Open it?",
        img: "treasure_chest.jpg",
        choices: [
            { text: "Open the chest", next: 13 },
            { text: "Leave it alone", next: 14 }
        ]
    },
    10: { text: "You got lost in the jungle. Game Over!", choices: [], gameOver: true },
    11: { text: "You safely climb down and find a village. You are safe! You win!", choices: [], win: true },
    12: { text: "You waited too long and got hungry. Game Over!", choices: [], gameOver: true },
    13: { text: "The chest was trapped! Game Over!", choices: [], gameOver: true },
    14: { text: "You leave the chest and find a secret exit. You win!", choices: [], win: true },
    // Expanded branches
    15: { text: "You find a mysterious map on the ground. Do you pick it up?",
        img: "map.jpg",
        choices: [
            { text: "Pick up the map", next: 16 },
            { text: "Ignore the map", next: 17 }
        ]
    },
    16: { text: "The map reveals a shortcut to a hidden waterfall. Go there?",
        choices: [
            { text: "Go to the waterfall", next: 18 },
            { text: "Stay on your path", next: 19 }
        ]
    },
    17: { text: "You ignored the map and wandered into quicksand. Game Over!", choices: [], gameOver: true },
    18: { text: "At the waterfall, you find a boat. Do you take the boat downstream?",
        choices: [
            { text: "Take the boat", next: 20 },
            { text: "Stay at the waterfall", next: 21 }
        ]
    },
    19: { text: "You continue on your path and find a friendly monkey who guides you to safety. You win!", choices: [], win: true },
    20: { text: "The boat leads you to a pirate cave. Enter the cave?",
        choices: [
            { text: "Enter the cave", next: 22 },
            { text: "Avoid the cave", next: 23 }
        ]
    },
    21: { text: "You relax at the waterfall and enjoy the view. Secret peaceful ending! You win!", choices: [], win: true },
    22: { text: "Inside the cave, you find treasure but wake the pirates. Game Over!", choices: [], gameOver: true },
    23: { text: "You avoid the cave and find a path back to civilization. You win!", choices: [], win: true }
};

// --- Progress Bar Helpers ---
let pathHistory = [1]; // Start at node 1

function updateProgressBar() {
    const maxSteps = 7;
    const percent = Math.min(100, Math.round((pathHistory.length / maxSteps) * 100));
    document.getElementById("progress-fill").style.width = percent + "%";
    document.getElementById("progress-container").setAttribute("aria-valuenow", percent);
}

// Function to handle player choices
function makeChoice(choice) {
    let newStory = story[choice];

    // Track path for progress
    pathHistory.push(choice);
    updateProgressBar();

    // Play choice sound
    document.getElementById("choice-sound").play();

    transitionScene(newStory);

    document.getElementById("choices").innerHTML = "";

    if (newStory.gameOver) {
        document.getElementById("lose-sound").play();
        showTryAgainButton();
        showSummary();
        return;
    }

    if (newStory.win) {
        document.getElementById("win-sound").play();
        triggerVictory();
        showSummary();
        return;
    }

    newStory.choices.forEach(choice => {
        let button = document.createElement("button");
        button.innerText = choice.text;
        button.setAttribute("aria-label", choice.text); // Accessibility
        button.onclick = () => makeChoice(choice.next);
        document.getElementById("choices").appendChild(button);
    });
}

function transitionScene(newStory) {
    const img = document.getElementById("scene-image");
    const text = document.getElementById("story-text");
    img.classList.add("fade-out");
    text.classList.add("fade-out");
    setTimeout(() => {
        if (newStory.img) {
            img.src = newStory.img;
            img.alt = newStory.text;
            img.style.display = "block";
        }
        text.innerText = `${playerName ? playerName + ', ' : ''}${newStory.text}`;
        img.classList.remove("fade-out");
        text.classList.remove("fade-out");
        img.classList.add("fade-in");
        text.classList.add("fade-in");
        setTimeout(() => {
            img.classList.remove("fade-in");
            text.classList.remove("fade-in");
        }, 500);
    }, 500);
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
    pathHistory = [1];
    updateProgressBar();
    location.reload();
}

// Show summary of the adventure
function showSummary() {
    let summaryDiv = document.getElementById("summary");
    let summary = "<h3>Your Adventure Path:</h3><ol>";
    for (let i = 1; i < pathHistory.length; i++) {
        let node = story[pathHistory[i]];
        if (node) summary += `<li>${node.text}</li>`;
    }
    summary += "</ol>";
    summaryDiv.innerHTML = summary;
    summaryDiv.style.display = "block";
}

let playerName = "";

function startGame() {
    playerName = document.getElementById("playerName").value.trim() || "Adventurer";
    localStorage.setItem('adventure_name', playerName);
    document.getElementById("name-entry").style.display = "none";
    document.getElementById("story-text").innerText = `Welcome, ${playerName}! ` + story[1].text;
    document.getElementById("choices").innerHTML = "";
    story[1].choices.forEach(choice => {
        let button = document.createElement("button");
        button.innerText = choice.text;
        button.setAttribute("aria-label", choice.text);
        button.onclick = () => makeChoice(choice.next);
        document.getElementById("choices").appendChild(button);
    });
}

window.onload = () => {
    let bgMusic = document.getElementById("bg-music");
    bgMusic.volume = 0.3;
    bgMusic.play();
    updateProgressBar();
    // Start at the beginning, do not resume from saved path
    document.getElementById("name-entry").style.display = "block";
    document.getElementById("choices").innerHTML = "";
    document.getElementById("story-text").innerText = "Enter your name to begin your adventure!";
};
