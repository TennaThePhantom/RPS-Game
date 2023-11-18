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

// user gameModeChoices
function chooseGameMode() {
	const createDiv = document.createElement("div");
	const singlePlayerButton = document.createElement("button");
	const twoPlayerButton = document.createElement("button");
	const buttons = [singlePlayerButton, twoPlayerButton];
	let singlePlayerChoice;
	let twoPlayerChoice;

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
				singlePlayerChoice = gameMode.singlePlayer = 1;
				twoPlayerChoice = gameMode.twoPlayer = 0;
				startRockPaperScissorGame(singlePlayerChoice, twoPlayerChoice);
			} else if (click.target === twoPlayerButton) {
				twoPlayerChoice = gameMode.twoPlayer = 1;
				singlePlayerChoice = gameMode.singlePlayer = 0;
				startRockPaperScissorGame(singlePlayerChoice, twoPlayerChoice);
			}
		});
	}
}

function startRockPaperScissorGame(singlePlayerChoice, twoPlayerChoice) {
	const rpsGame = {
		gameIsDone: false,
		replayingRPS: false,
	};
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

	// deletes everything from the screen
	function removeEverything() {
		const body = document.body;
		while (body.firstChild) {
			body.removeChild(body.firstChild);
		}
	}

	// ai gets a random number between 1 and 3
	function generateRandomNumber() {
		const minNumber = 1;
		const maxNumber = 3;
		let randomNumber =
			Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
		return randomNumber;
	}
	// resets everything back to normal
	function clearDisplay(
		image1Display,
		image2Display,
		rpsDisplayContainer,
		rockDisplay,
		paperDisplay,
		scissorsDisplay
	) {
		image1Display.innerHTML = "";
		image2Display.innerHTML = "";
		rpsDisplayContainer.innerHTML = "";
		rockDisplay.innerHTML = "";
		paperDisplay.innerHTML = "";
		scissorsDisplay.innerHTML = "";
	}
	// readds the buttons or clears buttons depend on if game is over or replaying
	function buttonsHideOrVisible(activeButtons) {
		if (activeButtons === false) {
			rockButton.style.visibility = "hidden";
			paperButton.style.visibility = "hidden";
			scissorsButton.style.visibility = "hidden";
		} else if (activeButtons === true) {
			rockButton.style.visibility = "visible";
			paperButton.style.visibility = "visible";
			scissorsButton.style.visibility = "visible";
		} else {
			console.log("Some is wrong with buttons styling ");
		}
	}

	// get the buttonId(rock paper or scissors) to get the correct image
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
	// displays the rps hover images onto screen
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
	// creates the container for the hoverImages
	function createRPSHoverImagesBox(buttonDiv) {
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
	}
	// for player two to see if image needs to be a copy or original
	function rpsImagesDisplayChoice(
		buttonId,
		player1Choice,
		playerTurn,
		image2Display,
		rpsDisplayContainer,
		rockDisplay,
		paperDisplay,
		scissorsDisplay
	) {
		if (playerTurn !== 2) {
			return null;
		}
		if (buttonId === player1Choice) {
			const copyImage = new Image();
			switch (player1Choice) {
				case "rock":
					copyImage.src = "Rock.jpg";
					break;
				case "paper":
					copyImage.src = "Paper.jpg";
					break;
				case "scissors":
					copyImage.src = "Scissors.jpg";
					break;
				default:
					console.log("Error image can't be found");
			}
			copyImage.classList.add("rps-display-image");
			image2Display.append(copyImage);
			rpsDisplayContainer.append(image2Display);
			copyImage.style.display = "block";
		} else {
			let displayImage = null;
			if (buttonId === "rock") {
				displayImage = rockDisplay;
			} else if (buttonId === "paper") {
				displayImage = paperDisplay;
			} else if (buttonId === "scissors") {
				displayImage = scissorsDisplay;
			}
			displayImage.classList.add("rps-display-image");
			image2Display.append(displayImage);
			rpsDisplayContainer.append(image2Display);
			displayImage.style.display = "block";
		}
	}
	// creates a rps image for the ai turn for player two to show in middle
	function aiRPSImages(
		buttonId,
		gameHeaderText,
		player1Choice,
		playerTurn,
		image1Display,
		image2Display,
		rpsDisplayContainer,
		rockDisplay,
		paperDisplay,
		scissorsDisplay
	) {
		if (playerTurn !== 2) {
			return null;
		}
		let randomNumber = generateRandomNumber();
		console.log("random number is " + randomNumber);
		switch (randomNumber) {
			case 1:
				buttonId = "rock";
				break;
			case 2:
				buttonId = "paper";
				break;
			case 3:
				buttonId = "scissors";
				break;
			default:
				console.log("There was a error when generating a random number");
		}
		let player2Choice = buttonId;
		console.log("Player 2 choice is " + player2Choice);
		if (player1Choice === player2Choice) {
			const copyImage = new Image();
			switch (player2Choice) {
				case "rock":
					copyImage.src = "Rock.jpg";
					break;
				case "paper":
					copyImage.src = "Paper.jpg";
					break;
				case "scissors":
					copyImage.src = "Scissors.jpg";
					break;
				default:
					console.log("Error image can't be found");
			}
			copyImage.classList.add("rps-display-image");
			image2Display.append(copyImage);
			rpsDisplayContainer.append(image2Display);
			copyImage.style.display = "block";
			whoWinsRPSSinglePlayer(
				player1Choice,
				player2Choice,
				gameHeaderText,
				image1Display,
				image2Display,
				rpsDisplayContainer,
				rockDisplay,
				paperDisplay,
				scissorsDisplay
			);
		} else {
			let displayImage = null;
			if (player2Choice === "rock") {
				displayImage = rockDisplay;
			} else if (player2Choice === "paper") {
				displayImage = paperDisplay;
			} else if (player2Choice === "scissors") {
				displayImage = scissorsDisplay;
			}
			displayImage.classList.add("rps-display-image");
			image2Display.append(displayImage);
			rpsDisplayContainer.append(image2Display);
			displayImage.style.display = "block";
			whoWinsRPSSinglePlayer(
				player1Choice,
				player2Choice,
				gameHeaderText,
				image1Display,
				image2Display,
				rpsDisplayContainer,
				rockDisplay,
				paperDisplay,
				scissorsDisplay
			);
		}
	}
	// makes the rps images for player to show in middle of screen
	function twoPlayerCreateRPSImages(
		buttons,
		playerTurn,
		gameHeaderText,
		image1Display,
		image2Display,
		rpsDisplayContainer,
		rockDisplay,
		paperDisplay,
		scissorsDisplay
	) {
		for (const button of buttons) {
			let player1Choice = null;
			button.addEventListener("click", () => {
				const buttonId = button.id;
				player1Choice = buttonId;
				if (rpsGame.gameIsDone === false) {
					if (buttonId === "rock") {
						if (playerTurn === 1) {
							player1Choice = buttonId;
							gameHeaderText.textContent = "Player 2 Choose";
							image1Display.append(rockDisplay);
							rpsDisplayContainer.append(image1Display);
							rockDisplay.style.display = "block";
							playerTurn = 2;
						} else if (playerTurn === 2) {
							rpsImagesDisplayChoice(
								buttonId,
								player1Choice,
								playerTurn,
								image2Display,
								rpsDisplayContainer,
								rockDisplay,
								paperDisplay,
								scissorsDisplay
							);
							playerTurn = 1; // resets the if statement
						}
					} else if (buttonId === "paper") {
						if (playerTurn === 1) {
							player1Choice = buttonId;
							gameHeaderText.textContent = "Player 2 Choose";
							image1Display.append(paperDisplay);
							rpsDisplayContainer.append(image1Display);
							paperDisplay.style.display = "block";
							playerTurn = 2;
						} else if (playerTurn === 2) {
							rpsImagesDisplayChoice(
								buttonId,
								player1Choice,
								playerTurn,
								image2Display,
								rpsDisplayContainer,
								rockDisplay,
								paperDisplay,
								scissorsDisplay
							);
							playerTurn = 1;
						}
					} else if (buttonId === "scissors") {
						if (playerTurn === 1) {
							player1Choice = buttonId;
							gameHeaderText.textContent = "Player 2 Choose";
							image1Display.append(scissorsDisplay);
							rpsDisplayContainer.append(image1Display);
							scissorsDisplay.style.display = "block";
							playerTurn = 2;
						} else if (playerTurn === 2) {
							rpsImagesDisplayChoice(
								buttonId,
								player1Choice,
								playerTurn,
								image2Display,
								rpsDisplayContainer,
								rockDisplay,
								paperDisplay,
								scissorsDisplay
							);
							playerTurn = 1;
						}
					}
				}
			});
		}
	}

	// adds delays for computer to pick image
	function startAiPickingImage(
		buttonId,
		gameHeaderText,
		player1Choice,
		playerTurn,
		image1Display,
		image2Display,
		rpsDisplayContainer,
		rockDisplay,
		paperDisplay,
		scissorsDisplay
	) {
		let aiPickImageTurn;
		aiPickImageTurn = setInterval(() => {
			if (playerTurn === 2) {
				aiRPSImages(
					buttonId,
					gameHeaderText,
					player1Choice,
					playerTurn,
					image1Display,
					image2Display,
					rpsDisplayContainer,
					rockDisplay,
					paperDisplay,
					scissorsDisplay
				);
				clearInterval(aiPickImageTurn);
			}
		}, 3000);
	}
	function singlePlayerCreateRPSImages(
		buttons,
		playerTurn,
		gameHeaderText,
		image1Display,
		image2Display,
		rpsDisplayContainer,
		rockDisplay,
		paperDisplay,
		scissorsDisplay
	) {
		for (const button of buttons) {
			let player1Choice = null;
			button.addEventListener("click", () => {
				const buttonId = button.id;
				player1Choice = buttonId;
				if (rpsGame.gameIsDone === false) {
					if (buttonId === "rock") {
						if (playerTurn === 1) {
							player1Choice = buttonId;
							gameHeaderText.textContent = " Ai is Picking";
							image1Display.append(rockDisplay);
							rpsDisplayContainer.append(image1Display);
							rockDisplay.style.display = "block";
							playerTurn = 2;
							startAiPickingImage(
								buttonId,
								gameHeaderText,
								player1Choice,
								playerTurn,
								image1Display,
								image2Display,
								rpsDisplayContainer,
								rockDisplay,
								paperDisplay,
								scissorsDisplay
							);
							playerTurn = 1;
						}
					} else if (buttonId === "paper") {
						console.log("This works paper");
						if (playerTurn === 1) {
							console.log("Paper is player 1 choice ");
							player1Choice = buttonId;
							gameHeaderText.textContent = "Ai is Picking";
							image1Display.append(paperDisplay);
							rpsDisplayContainer.append(image1Display);
							paperDisplay.style.display = "block";
							playerTurn = 2;
							startAiPickingImage(
								buttonId,
								gameHeaderText,
								player1Choice,
								playerTurn,
								image1Display,
								image2Display,
								rpsDisplayContainer,
								rockDisplay,
								paperDisplay,
								scissorsDisplay
							);
							playerTurn = 1;
						}
					} else if (buttonId === "scissors") {
						if (playerTurn === 1) {
							player1Choice = buttonId;
							gameHeaderText.textContent = "Ai is Picking";
							image1Display.append(scissorsDisplay);
							rpsDisplayContainer.append(image1Display);
							scissorsDisplay.style.display = "block";
							playerTurn = 2;
							startAiPickingImage(
								buttonId,
								gameHeaderText,
								player1Choice,
								playerTurn,
								image1Display,
								image2Display,
								rpsDisplayContainer,
								rockDisplay,
								paperDisplay,
								scissorsDisplay
							);
							playerTurn = 1;
						}
					}
				}
			});
		}
	}

	function whoWinsRPSSinglePlayer(
		player1Choice,
		Player2Choice,
		gameHeaderText,
		image1Display,
		image2Display,
		rpsDisplayContainer,
		rockDisplay,
		paperDisplay,
		scissorsDisplay
	) {
		let gameIsDone = (rpsGame.gameIsDone = false);
		let activeButtons = false;
		if (player1Choice === Player2Choice) {
			gameHeaderText.textContent = "It's a draw";
			gameIsDone = rpsGame.gameIsDone = true;
		} else if (
			(player1Choice === "rock" && Player2Choice === "scissors") ||
			(player1Choice === "paper" && Player2Choice === "rock") ||
			(player1Choice === "scissors" && Player2Choice === "paper")
		) {
			gameHeaderText.textContent = "Player 1 Wins, Ai Loses";
			gameIsDone = rpsGame.gameIsDone = true;
		} else {
			gameHeaderText.textContent = "Ai Wins, Player 1 Loses";
			gameIsDone = rpsGame.gameIsDone = true;
		}
		if (gameIsDone === true) {
			player1Choice = null;
			Player2Choice = null;
			if (gameIsDone === true) {
				replayRPS(
					image1Display,
					image2Display,
					rpsDisplayContainer,
					gameHeaderText,
					rockDisplay,
					paperDisplay,
					scissorsDisplay,
					activeButtons
				);
				gameIsDone = rpsGame.gameIsDone = false;
				buttonsHideOrVisible(activeButtons);
			}
		}
	}

	//rps winner
	function whoWinsRPSTwoPlayer(
		buttons,
		gameHeaderText,
		image1Display,
		image2Display,
		rpsDisplayContainer,
		rockDisplay,
		paperDisplay,
		scissorsDisplay
	) {
		let playerChoice1 = null;
		let playerChoice2 = null;
		let activeButtons = false;
		let currentPlayerTurn = 1;
		let gameIsDone = (rpsGame.gameIsDone = false);

		for (const button of buttons) {
			button.addEventListener("click", () => {
				const buttonId = button.id;
				if (gameIsDone === false) {
					if (currentPlayerTurn === 1) {
						playerChoice1 = buttonId;
						currentPlayerTurn = 2;
					} else if (currentPlayerTurn === 2) {
						playerChoice2 = buttonId;

						// Determine the game result here based on player 1 and player 2 choice
						if (playerChoice1 === playerChoice2) {
							gameHeaderText.textContent = "It's a draw";
							gameIsDone = rpsGame.gameIsDone = true;
						} else if (
							(playerChoice1 === "rock" && playerChoice2 === "scissors") ||
							(playerChoice1 === "paper" && playerChoice2 === "rock") ||
							(playerChoice1 === "scissors" && playerChoice2 === "paper")
						) {
							gameHeaderText.textContent = "Player 1 Wins, Player 2 Loses";
							gameIsDone = rpsGame.gameIsDone = true;
						} else {
							gameHeaderText.textContent = "Player 2 Wins, Player 1 Loses";
							gameIsDone = rpsGame.gameIsDone = true;
						}
						if (gameIsDone === true) {
							playerChoice1 = null;
							playerChoice2 = null;
							currentPlayerTurn = 1;
							replayRPS(
								image1Display,
								image2Display,
								rpsDisplayContainer,
								gameHeaderText,
								rockDisplay,
								paperDisplay,
								scissorsDisplay,
								activeButtons
							);
							gameIsDone = rpsGame.gameIsDone = false;
							buttonsHideOrVisible(activeButtons);
						}
					}
				}
			});
		}
	}
	// do you want to play again or no
	function replayRPS(
		image1Display,
		image2Display,
		rpsDisplayContainer,
		gameHeaderText,
		rockDisplay,
		paperDisplay,
		scissorsDisplay,
		activeButtons
	) {
		const playAgainContainer = document.createElement("div");
		const playAgainYesButton = document.createElement("button");
		const playAgainNoButton = document.createElement("button");
		const playAgainHeader = document.createElement("h3");
		const buttons = [playAgainYesButton, playAgainNoButton];

		playAgainYesButton.textContent = "Yes";
		playAgainNoButton.textContent = "No";
		playAgainHeader.textContent = "Do you want to play again?";

		playAgainYesButton.id = "play-again";
		playAgainNoButton.id = "game-over";

		playAgainHeader.classList.add("play-again-header");
		playAgainContainer.classList.add("play-again-container");
		playAgainYesButton.classList.add(
			"play-again-button",
			"play-again-yes-button"
		);
		playAgainNoButton.classList.add(
			"play-again-button",
			"play-again-no-button"
		);

		playAgainContainer.append(playAgainHeader);
		playAgainContainer.append(playAgainYesButton);
		playAgainContainer.append(playAgainNoButton);

		body.append(playAgainContainer);

		for (const button of buttons) {
			const buttonId = button.id;
			button.addEventListener("click", () => {
				if (buttonId === "play-again") {
					playAgainContainer.remove();
					rpsGame.replayingRPS = true;
					if (rpsGame.replayingRPS === true) {
						// resets everything back to normal
						gameHeaderText.textContent = "Player 1 Choose";
						clearDisplay(
							image1Display,
							image2Display,
							rpsDisplayContainer,
							rockDisplay,
							paperDisplay,
							scissorsDisplay
						);
						activeButtons = true;
						buttonsHideOrVisible(activeButtons);
						gameMode.gameIsDone = false;
						if (rpsGame.gameIsDone === false) {
							rpsGame.replayingRPS = false;
						}
					}
				} else if (buttonId === "game-over") {
					location.reload();
				}
			});
		}
	}

	// creates the rps game screen
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
		const images = rpsDisplayContainer.getElementsByTagName("img");
		image1Display.classList.add("display-image-1");
		image2Display.classList.add("display-image-2");

		rpsDisplayContainer.classList.add("rps-image-display-container");

		const buttonDiv = document.createElement("div");
		createRPSHoverImagesBox(buttonDiv);
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
		if (singlePlayerChoice === 1 && twoPlayerChoice === 0) {
			singlePlayerCreateRPSImages(
				buttons,
				playerTurn,
				gameHeaderText,
				image1Display,
				image2Display,
				rpsDisplayContainer,
				rockDisplay,
				paperDisplay,
				scissorsDisplay
			);
		} else if (twoPlayerChoice === 1 && singlePlayerChoice === 0) {
			twoPlayerCreateRPSImages(
				buttons,
				playerTurn,
				gameHeaderText,
				image1Display,
				image2Display,
				rpsDisplayContainer,
				rockDisplay,
				paperDisplay,
				scissorsDisplay
			);
			whoWinsRPSTwoPlayer(
				buttons,
				gameHeaderText,
				image1Display,
				image2Display,
				rpsDisplayContainer,
				rockDisplay,
				paperDisplay,
				scissorsDisplay
			);
		}
	}
	function twoPlayerGameMode() {
		createRPSGameScreen();
	}

	function singlePlayerGameMode() {
		createRPSGameScreen();
	}
	if (singlePlayerChoice === 1 && twoPlayerChoice === 0) {
		removeEverything();
		singlePlayerGameMode();
	} else if (twoPlayerChoice === 1 && singlePlayerChoice === 0) {
		removeEverything();
		twoPlayerGameMode();
	} else {
		console.log("Error Something is Wrong");
		return null;
	}
}
