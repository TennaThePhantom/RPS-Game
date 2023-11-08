for (const button of buttons) {
    let player1Choice = null;
    button.addEventListener("click", () => {
        const buttonId = button.id;
        player1Choice = buttonId;
        if (gameOver.gameIsDone === true) {
            player1Choice = null;
            playerTurn = 1;
            clearDisplay(image1Display,image2Display, rpsDisplayContainer, )
            return null;
        } else if (gameOver.gameIsDone === false) {
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
                player1Choice = buttonId;
                gameHeaderText.textContent = "Player 2 Choose";
                image1Display.append(paperDisplay);
                rpsDisplayContainer.append(image1Display);
                paperDisplay.style.display = "block";
                setTimeout(() => {
                    playerTurn = 2;
                }, 100);
            }
            if (buttonId === "scissors" && playerTurn === 1) {
                player1Choice = buttonId;
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
        }
    });
}