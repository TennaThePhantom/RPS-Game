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
	const rockButton = document.createElement("button");
	const paperButton = document.createElement("button");
	const scissorsButton = document.createElement("button");

	rock.src = "Rock.jpg";
	paper.src = "Paper.jpg";
	scissors.src = "Scissors.jpg";
	rock.classList.add("hover-rock-image", "hover-image");
	paper.classList.add("hover-paper-image", "hover-image");
	scissors.classList.add("hover-scissors-image", "hover-image");

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
		if (buttonId === "paper") {
			paper.style.display = "block";
			const secondImageContainer = document.querySelectorAll(
				".image-button-container"
			)[1];
			secondImageContainer.appendChild(paper);
		}
		if (buttonId === "scissors") {
			scissors.style.display = "block";
			const lastImageContainer = document.querySelectorAll(
				".image-button-container"
			)[2];
			lastImageContainer.appendChild(scissors);
		}
	}
	function createRPSHoverImage(buttons) {
		for (const button of buttons) {
			button.addEventListener("mouseover", () => {
				let buttonId = button.id;
				rpsHoverImage(buttonId);
			});
			button.addEventListener("mouseout", () => {
				const buttonId = button.id;
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

	

	function createRPSGameScreen() {
		let playerTurn = 1;
		const gameHeaderText = document.createElement("h1");
		gameHeaderText.textContent = "Player 1 Choose";
		gameHeaderText.classList.add("rps-header");
		body.append(gameHeaderText);
		const rockDisplay = new Image();
		const paperDisplay = new Image();
		const scissorsDisplay = new Image();
		rockDisplay.src = "Rock.jpg";
		paperDisplay.src = "Paper.jpg";
		scissorsDisplay.src = "Scissors.jpg";
		rockDisplay.classList.add("rps-display-image");
		paperDisplay.classList.add("rps-display-image");
		scissorsDisplay.classList.add("rps-display-image");

		const rpsDisplayContainer = document.createElement("div");
		const image1Display = document.createElement("div");
		const image2Display = document.createElement("div");
		image1Display.classList.add("display-image-1");
		image2Display.classList.add("display-image-2");

		rpsDisplayContainer.classList.add("rps-image-display-container");

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
		body.append(rpsDisplayContainer);

		createRPSHoverImage(buttons);
		for (const button of buttons) {
			button.addEventListener("click", () => {
				const buttonId = button.id;
				let player1Choice = buttonId;
				if (buttonId === "rock" && playerTurn === 1) {
					player1Choice = buttonId;
					gameHeaderText.textContent = "Player 2 Choose";
					image1Display.append(rockDisplay);
					rpsDisplayContainer.append(image1Display);
					rockDisplay.style.display = "block";
					setTimeout(() => {
						playerTurn = 2;
					}, 100);
				}
				if (buttonId === "paper" && playerTurn === 1) {
					gameHeaderText.textContent = "Player 2 Choose";
					image1Display.append(paperDisplay);

					rpsDisplayContainer.append(image1Display);
					paperDisplay.style.display = "block";
					setTimeout(() => {
						playerTurn = 2;
					}, 100);
				}
				if (buttonId === "scissors" && playerTurn === 1) {
					gameHeaderText.textContent = "Player 2 Choose";
					image1Display.append(scissorsDisplay);
					rpsDisplayContainer.append(image1Display);
					scissorsDisplay.style.display = "block";
					setTimeout(() => {
						playerTurn = 2;
					}, 100);
				}
				if (buttonId === "rock" && playerTurn === 2) {
					if (player1Choice === "rock") {
						const copyRockImage = new Image();
						copyRockImage.src = "Rock.jpg";
						copyRockImage.classList.add("rps-display-image");
						image2Display.append(copyRockImage);
						rpsDisplayContainer.append(image2Display);
						copyRockImage.style.display = "block";
					} else {
						image2Display.append(rockDisplay);
						rpsDisplayContainer.append(image2Display);
						rockDisplay.style.display = "block";
					}
				}
				if (buttonId === "paper" && playerTurn === 2) {
					if (player1Choice === "paper") {
						const copyPaperImage = new Image();
						copyPaperImage.src = "Paper.jpg";
						copyPaperImage.classList.add("rps-display-image");
						image2Display.append(copyPaperImage);
						rpsDisplayContainer.append(image2Display);
						copyPaperImage.style.display = "block";
					} else {
						image2Display.append(paperDisplay);
						rpsDisplayContainer.append(image2Display);
						paperDisplay.style.display = "block";
					}
				}
				if (buttonId === "scissors" && playerTurn === 2) {
					if (player1Choice === "scissors") {
						const copyScissorsImage = new Image();
						copyScissorsImage.src = "Scissors.jpg";
						copyScissorsImage.classList.add("rps-display-image");
						image2Display.append(copyScissorsImage);
						rpsDisplayContainer.append(image2Display);
						copyScissorsImage.style.display = "block";
					} else {
						image2Display.append(scissors);
						rpsDisplayContainer.append(image2Display);
						scissorsDisplay.style.display = "block";
					}
				}
			});
		}
	}

	function twoPlayerGameMode() {
		createRPSGameScreen();
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
