const startGame = document.getElementById("start-game");
const headerText = document.getElementById("headerText");
const body = document.body;

startGame.addEventListener("click", () => {
	startGame.remove();
	headerText.textContent = "Please choose which mode you want";
	chooseGameMode();
});

const chooseGameMode = () => {
	const createDiv = document.createElement("div");
	const singlePlayerButton = document.createElement("button");
	const twoPlayerButton = document.createElement("button");
	const buttons = [singlePlayerButton, twoPlayerButton];

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
			if (click.target == singlePlayerButton) {
				gameMode.singlePlayer = 1;
				gameMode.twoPlayer = 0;
				console.log(gameMode);
			} else if (click.target == twoPlayerButton) {
				gameMode.twoPlayer = 1;
				gameMode.singlePlayer = 0;
				console.log(gameMode);
			}
		});
	}
};




// The function will make rps work until user refreshes screen(future)
function startRockPaperScissorGame(){
    console.log("Hi");


    // this function will show game stats
    const gameStats = () =>{
    }
}


const gameMode = {
	singlePlayer: 0,
	twoPlayer: 0,
};
