function displayChoice(buttonId, playerTurn, player1Choice) {
	if (playerTurn !== 2) {
		return;
	}

	const image2Display = document.createElement("div");
	image2Display.classList.add("image2-display");

	const rpsDisplayContainer = document.getElementById("rps-display-container");

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
				copyImage.src = "defaultImage.jpg"; // Replace with your default image
		}
		copyImage.classList.add("rps-display-image");
		image2Display.append(copyImage);
	} else {
		let displayElement;

		if (buttonId === "rock") {
			displayElement = rockDisplay;
		} else if (buttonId === "paper") {
			displayElement = paperDisplay;
		} else if (buttonId === "scissors") {
			displayElement = scissorsDisplay;
		}

		if (displayElement) {
			image2Display.append(displayElement);
		}
	}

	rpsDisplayContainer.append(image2Display);
	image2Display.style.display = "block";
}

// Example usage:
// displayChoice("rock", 2, "paper");
