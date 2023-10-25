const startGame = document.getElementById("start-game");
const headerText = document.getElementById("headerText");
const body = document.body;

const gameMode = {
	singlePlayer: 0,
	twoPlayer: 0,
};

startGame.addEventListener("click", () => {
	startGame.remove();
	headerText.textContent = "Please choose which mode you want";
	chooseGameMode();
});

function chooseGameMode() {
	const createDiv = document.createElement("div");
	const singlePlayerButton = document.createElement("button");
	const twoPlayerButton = document.createElement("button");
	const buttons = [singlePlayerButton, twoPlayerButton];
	let playerChoice1;
	let playerChoice2;

	createDiv.classList.add("button-container");

	singlePlayerButton.classList.add("game-mode-button");
	twoPlayerButton.classList.add("game-mode-button");

	createDiv.append(singlePlayerButton);
	createDiv.append(twoPlayerButton);

	singlePlayerButton.textContent = "Single Player";
	twoPlayerButton.textContent = "Two Player";
	body.append(createDiv);
	for (const button of buttons) {
		button.addEventListener("click", (click) => {
			if (click.target === singlePlayerButton) {
				playerChoice1 = gameMode.singlePlayer = 1;
				playerChoice2 = gameMode.twoPlayer = 0;
				startRockPaperScissorGame(playerChoice1, playerChoice2);
			} else if (click.target === twoPlayerButton) {
				playerChoice2 = gameMode.twoPlayer = 1;
				playerChoice1 = gameMode.singlePlayer = 0;
				startRockPaperScissorGame(playerChoice1, playerChoice2);
			}
		});
	}
}

// The function will make rps work until user refreshes screen(future)
function startRockPaperScissorGame(playerChoice1, playerChoice2) {
	const rock = new Image();
	const paper = new Image();
	const scissors = new Image();
	rock.src = "Rock.jpg";
	paper.src = "Paper.jpg";
	scissors.src = "Scissors.jpg";
	rock.classList.add("hover-rock-image", "hover-image");
	paper.classList.add("hover-paper-image", "hover-image")
	scissors.classList.add("hover-scissors-image", "hover-image")
	const removeEverything = () => {
		while (body.firstChild) body.removeChild(body.firstChild);
	};

	function rpsHoverImage(buttonId) {
		if (buttonId === "rock") {
			rock.style.display = "block";
			const firstImageContainer = document.querySelectorAll(
				".image-button-container"
			)[0];
			firstImageContainer.appendChild(rock);
		}
		if(buttonId === 'paper'){
			paper.style.display = "block";
			const secondImageContainer = document.querySelectorAll(".image-button-container")[1];
			secondImageContainer.appendChild(paper);
		}
		if(buttonId === 'scissors'){
			scissors.style.display = "block";
			const lastImageContainer = document.querySelectorAll(".image-button-container")[2];
			lastImageContainer.appendChild(scissors)
		}
	}

	function twoPlayerGameMode() {
		const headerText = document.createElement("h1");
		headerText.textContent = "Player 1 Choose";
		headerText.classList.add("rps-header");
		body.append(headerText);

		const rockButton = document.createElement("button");
		const paperButton = document.createElement("button");
		const scissorsButton = document.createElement("button");

		const buttonDiv = document.createElement("div");
		buttonDiv.classList.add("rps-button-container");
		for (let hoverImage = 0; hoverImage < 3; hoverImage++) {
			const imageHoverContainer = document.createElement("div");
			imageHoverContainer.classList.add("image-button-container");
			buttonDiv.append(imageHoverContainer);
			if (hoverImage === 0) {
				imageHoverContainer.append(rockButton);
			} else if (hoverImage === 1) {
				imageHoverContainer.append(paperButton);
			} else if (hoverImage === 2) {
				imageHoverContainer.append(scissorsButton);
			}
			buttonDiv.append(imageHoverContainer);
		}
		rockButton.textContent = "Rock";
		paperButton.textContent = "Paper";
		scissorsButton.textContent = "Scissors";

		const buttons = [rockButton, paperButton, scissorsButton];
		for (const button of buttons) {
			button.classList.add("rps-buttons");
		}

		rockButton.id = "rock";
		paperButton.id = "paper";
		scissorsButton.id = "scissors";

		body.append(buttonDiv);

		for (const button of buttons) {
			button.addEventListener("mouseover", () => {
				let buttonId = button.id;
				rpsHoverImage(buttonId)
			});

			for (const button of buttons) {
				button.addEventListener("mouseout", () => {
					let buttonId = button.id;
					if (buttonId === "rock") {
						rock.style.display = "none";
					}
					if (buttonId === "paper") {
						paper.style.display = "none";
					}
					if (buttonId === "scissors") {
						scissors.style.display = "none";
					}
				});
			}
		}
	}

	if (playerChoice1 === 1 && playerChoice2 === 0) {
		removeEverything();
	} else if (playerChoice2 === 1 && playerChoice1 === 0) {
		removeEverything();
		twoPlayerGameMode();
	} else {
		console.log("Error Something is Wrong");
		return null;
	}
}
