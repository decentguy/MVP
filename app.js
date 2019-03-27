let letters = ['壹','壹','貳','貳','叄','叄','肆','肆'];
let pair = [];
let tileIds = [];
let tiles_flipped = 0;

function shuffler(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
	        let newPos = Math.floor(Math.random() * (i+1));
	        [arr[i], arr[newPos]] = [arr[newPos], arr[i]];
        }
        return arr;
}

function startBoard() {
	tiles_flipped = 0;
	let tileDiv = '';
	shuffler(letters);
	for (let i = 0; i < letters.length; i++)
		tileDiv += '<div id="tile_'+i+'" onclick="flipper(this,\''+letters[i]+'\')"></div>';
	document.getElementById('board').innerHTML = tileDiv;
}

function flipBack(){
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

	if (tiles_flipped == letters.length)
		document.getElementById('board').innerHTML = '<h1>🥇<u>Congrats you have won | 你赢了</u>🏆</h1></br><button onclick="startBoard()">Load New Game...</button>';
}