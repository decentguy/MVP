let letters = ['壹','壹','貳','貳','叄','叄','肆','肆','三','三','四','四','五','五','六','六','七','七','八','八'];
let pair = [];
let tileIds = [];
let tiles_flipped = 0;
let Game = new Object();
Game.Squares = 0;


function loadSkills(event) {
	event.preventDefault();
	let squares = document.getElementById("skill").value;
	Game.Squares = parseInt(squares);
	document.documentElement.style.setProperty("--rowNum", Math.ceil(Game.Squares/4));
	if (Game.Squares > 16){
		document.documentElement.style.setProperty("--colNum", 5);
		document.documentElement.style.setProperty("--rowNum", 4);}
	if (Game.Squares >= 4 && Game.Squares < 21 && Game.Squares % 2 === 0)
		startBoard();
}

function shuffler(arr) {
	let tempArr = arr;
    for (let i = Game.Squares-1; i > 0; i--) {
	        let newPos = Math.floor(Math.random() * (i+1));
	        [arr[i], tempArr[newPos]] = [tempArr[newPos], tempArr[i]];
        }
	return tempArr;
}

function startBoard() {
	tiles_flipped = 0;
	let tileDiv = '';
	let filtered = letters.filter(function(value, index, array){

		return index < Game.Squares;

	});

	shuffler(filtered);
	for (let i = 0; i < Game.Squares; i++)
		tileDiv += '<div id="tile_'+i+'" onclick="flipper(this,\''+filtered[i]+'\')"></div>';
	document.getElementById('board').innerHTML = tileDiv;
}

function flipBack(){
	console.log(Game.Squares);
    var tile_1 = document.getElementById(tileIds[0]);
    var tile_2 = document.getElementById(tileIds[1]);
    tile_1.style.background = tile_2.style.background = 'url(https://i.imgur.com/3mIrLAj.png) no-repeat';
    tile_1.innerHTML = tile_2.innerHTML = "";
    [pair, tileIds] = [[], []];
}

function flipper(tile, letter) {
	if (tile.innerHTML == "" && pair.length < 2) {
		tile.style.background = '#FFF';
		tile.innerHTML = letter;

		if (!pair[0] || !pair[1]) {
			pair.push(letter);
			tileIds.push(tile.id);
		}
		
		if (pair[0] && pair[1])
			pair[0] == pair[1] ? (tiles_flipped += 2, [pair, tileIds] = [[], []]) : setTimeout(flipBack, 1400);
	}

	if (tiles_flipped == Game.Squares)
		document.getElementById('board').innerHTML = '<h1>🥇<u>Congrats you have won | 你赢了</u>🏆</h1></br><button onclick="startBoard()" id="resetButton">Load New Game...</button>';
}