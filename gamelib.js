//			MUSIC			//
var crashEffect = document.getElementById("myAudio");
var winEffect = document.getElementById("victoryAudio");
var collectEffect = document.getElementById("collectAudio");
var musicEffect = document.getElementById("backgroundAudio");
musicEffect.loop = true;
musicEffect.volume = 0.4;
musicEffect.play();
// ------------------------	//
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var timeScore;
var T;
var t;
var coin = 0;
//			TIME BOX		//
function myTimeArea(timeXCoordPosition, timeYCoordPosition) {
	T = 0;
	t = 0;
	timeScore = setInterval(myTime, 100);
	function myTime() {
		t++;
		if (t == 10) {
			T++;
			t = 0;
		}
		ctx.clearRect(timeXCoordPosition, timeYCoordPosition, 220, 50);
		ctx.fillStyle = "black";
		ctx.font = "30px Lucida Grande";
		ctx.fillText(T + "." + t + " seconds", timeXCoordPosition + 20, timeYCoordPosition + 30);
	}
}
//			RED SQUARE		//
addEventListener("keydown", myKey, false);
var squareVelocity = 30;
var squareSize = 30;
ctx.fillStyle = "red";
ctx.fillRect(x, y, squareSize, squareSize);
function myKey() {
	ctx.fillStyle = "red";
	if (event.keyCode === 37) {
		event.preventDefault();
		if (x != 0) {
			x -= squareVelocity;
			ctx.clearRect(x + squareVelocity, y, squareSize, squareSize);
			ctx.fillRect(x, y, squareSize, squareSize);

		}
	}
	if (event.keyCode === 38) {
		event.preventDefault();
		if (y != 0) {
			y -= squareVelocity;
			ctx.clearRect(x, y + squareVelocity, squareSize, squareSize);
			ctx.fillRect(x, y, squareSize, squareSize);
			
		}
	}
	if (event.keyCode === 39) {
		event.preventDefault();
		if (x != c.width - squareSize) {
			x += squareVelocity;
			ctx.clearRect(x - squareVelocity, y, squareSize, squareSize);
			ctx.fillRect(x, y, squareSize, squareSize);
			
		}
	}
	if (event.keyCode === 40) {
		event.preventDefault();
		if (y != c.height - squareSize) {
			y += squareVelocity;
			ctx.clearRect(x, y - squareVelocity, squareSize, squareSize);
			ctx.fillRect(x, y, squareSize, squareSize);
			
		}
	}
	if (x < 0) {
		x = 0;
		ctx.fillRect(x, y, squareSize, squareSize);
	}
	if (x > c.width - squareSize) {
		x = c.width - squareSize;
		ctx.fillRect(x, y, squareSize, squareSize);
	}
	if (y < 0) {
		y = 0;
		ctx.fillRect(x, y, squareSize, squareSize);
	}
	if (y > c.height - squareSize) {
		y = c.height - squareSize;
		ctx.fillRect(x, y, squareSize, squareSize);
	}
	document.getElementById("xinfo").innerHTML = x;
	document.getElementById("yinfo").innerHTML = y;
}
//			FAIL			//
function myFail() {
	musicEffect.pause();
	crashEffect.volume = 0.3;
	crashEffect.play();
	var FailFlasherJob = setInterval(FailFlasher, 10);
	function FailFlasher() {
		ctx.fillStyle = "red";
		ctx.font = "100px Verdana";
		ctx.fillText("You lose!", 280, 150);
	}
	x = undefined;
	y = undefined;		
	setTimeout(function(){ location.reload(); }, 1000);
}
//			WIN				//
function mySucceed(winPositionX, winPositionY, aReq, bReq, cReq, dReq, coinReq, LVL) {
	ctx.fillStyle = "lightgreen";
	ctx.fillRect(winPositionX, winPositionY, 30, 30);
	addEventListener("keydown", myWinChecker, false);
	function myWinChecker() {
		if (x == winPositionX && y == winPositionY) {
			if (coin >= coinReq) {
				musicEffect.pause();
				winEffect.volume = 1.0;
				winEffect.play();
				var score = T + t/10;
				if (score < aReq) {
					var scoreLetter = "A";
				}
				if (score >= aReq && score < bReq) {
					var scoreLetter = "B";
				}
				if (score >= bReq && score < cReq) {
					var scoreLetter = "C";
				}
				if (score >= cReq && score < dReq) {
					var scoreLetter = "D";
				}
				if (score >= dReq) {
					var scoreLetter = "F";
				}
				var IDOK = setInterval(succeedFlash, 50);
				function succeedFlash() {
					ctx.fillStyle = "lightgreen";
					ctx.font = "90px Arial";
					ctx.fillText("Level " + LVL + " Complete!", 100, 150);	
					ctx.fillText("Rank: " + scoreLetter, 100, 250);
				}
				clearInterval(timeScore);
				x = undefined;
				y = undefined;
				myLink();
			}
			else {
				myFail();
			}
		}
	}
}
//			WALLS			//
function myWall(coordA, coordB, coordC, coordD) {
	this.coordA = coordA;
	this.coordB = coordB;
	this.coordC = coordC;
	this.coordD = coordD;
	ctx.fillStyle = "black";
	var width = coordC - coordA;
	var height = coordD - coordB;
	ctx.fillRect(coordA, coordB, width, height);
	addEventListener("keydown", wallCheck, false);
	function wallCheck() {
		if ((x >= coordA && x < coordC) || (x + squareSize > coordA && x + squareSize <= coordC)) {
			if ((y >= coordB && y < coordD) || (y + squareSize > coordB && y + squareSize <= coordD)) {
				myFail();
			}
		}
	}
}
//			BLUE ENEMIES	//
		// Horizontal
function movingEnemyX(startXPos, startYPos, endXPos, speed) {
	function startUp() {
	var id = setInterval(movingObstacleOne, speed);
	var movingXPos = startXPos;
	var movingYPos = startYPos;
	function movingObstacleOne() {
		ctx.fillStyle = "blue";
		if (movingXPos == endXPos) {
			clearInterval(id);
			startUp2();
		}
		else {
			if (startXPos < endXPos) {
				ctx.clearRect(movingXPos, movingYPos, 30, 30);
				movingXPos += 30;
				ctx.fillRect(movingXPos, movingYPos, 30, 30);	
			}
			else {
				ctx.clearRect(movingXPos, movingYPos, 30, 30);
				movingXPos -= 30;
				ctx.fillRect(movingXPos, movingYPos, 30, 30);		
			}
		}
		if ((y >= startYPos && y < startYPos + 30) || (y + squareSize > startYPos && y < startYPos + 30)) {
			if ((x >= movingXPos && x < movingXPos + 30) || (x + squareSize > movingXPos && x + squareSize < movingXPos + 30)) {
				myFail();
			}
		}
	}
	}
	function startUp2() {
	var id2 = setInterval(movingObstacleTwo, speed);
	var movingXPos2 = endXPos;
	var movingYPos2 = startYPos;
	function movingObstacleTwo() {
		ctx.fillStyle = "blue";
		if (movingXPos2 == startXPos) {
			clearInterval(id2);
			startUp();
		}
		else {
			if (startXPos < endXPos) {
				ctx.clearRect(movingXPos2, movingYPos2, 30, 30);
				movingXPos2 -= 30;
				ctx.fillRect(movingXPos2, movingYPos2, 30, 30);
			}
			else {
				ctx.clearRect(movingXPos2, movingYPos2, 30, 30);
				movingXPos2 += 30;
				ctx.fillRect(movingXPos2, movingYPos2, 30, 30);
			}
		}
		if ((y >= startYPos && y < startYPos + 30) || (y + squareSize > startYPos && y < startYPos + 30)) {
			if ((x >= movingXPos2 && x < movingXPos2 + 30) || (x + squareSize > movingXPos2 && x + squareSize < movingXPos2 + 30)) {
				myFail();
			}
		}
	}
	}
	startUp();
}
function movingEnemyXMini(startXPos, startYPos, endXPos, speed) {
	function startUp() {
	var id = setInterval(movingObstacleOne, speed);
	var movingXPos = startXPos;
	var movingYPos = startYPos;
	function movingObstacleOne() {
		ctx.fillStyle = "blue";
		if (movingXPos == endXPos) {
			clearInterval(id);
			startUp2();
		}
		else {
			if (startXPos < endXPos) {
				ctx.clearRect(movingXPos, movingYPos, 15, 15);
				movingXPos += 15;
				ctx.fillRect(movingXPos, movingYPos, 15, 15);	
			}
			else {
				ctx.clearRect(movingXPos, movingYPos, 15, 15);
				movingXPos -= 15;
				ctx.fillRect(movingXPos, movingYPos, 15, 15);		
			}
		}
		if ((y >= startYPos && y < startYPos + 15) || (y + squareSize > startYPos && y < startYPos + 15)) {
			if ((x >= movingXPos && x < movingXPos + 15) || (x + squareSize > movingXPos && x + squareSize < movingXPos + 15)) {
				myFail();
			}
		}
	}
	}
function startUp2() {
	var id2 = setInterval(movingObstacleTwo, speed);
	var movingXPos2 = endXPos;
	var movingYPos2 = startYPos;
	function movingObstacleTwo() {
		ctx.fillStyle = "blue";
		if (movingXPos2 == startXPos) {
			clearInterval(id2);
			startUp();
		}
		else {
			if (startXPos < endXPos) {
				ctx.clearRect(movingXPos2, movingYPos2, 15, 15);
				movingXPos2 -= 15;
				ctx.fillRect(movingXPos2, movingYPos2, 15, 15);
			}
			else {
				ctx.clearRect(movingXPos2, movingYPos2, 15, 15);
				movingXPos2 += 15;
				ctx.fillRect(movingXPos2, movingYPos2, 15, 15);
			}
		}
		if ((y >= startYPos && y < startYPos + 15) || (y + squareSize > startYPos && y < startYPos + 15)) {
			if ((x >= movingXPos2 && x < movingXPos2 + 15) || (x + squareSize > movingXPos2 && x + squareSize < movingXPos2 + 15)) {
				myFail();
			}
		}
	}
	}
	startUp();
}
		// Vertical
function movingEnemyY(startXPos2, startYPos2, endYPos, speed2) {
	function startUp3() {
	var id3 = setInterval(movingObstacleThree, speed2);
	var movingXPos3 = startXPos2;
	var movingYPos3 = startYPos2;
	function movingObstacleThree() {
		ctx.fillStyle = "blue";
		if (movingYPos3 == endYPos) {
			clearInterval(id3);
			startUp4();
		}
		else {
			if (startYPos2 < endYPos) {
				ctx.clearRect(movingXPos3, movingYPos3, 30, 30);
				movingYPos3 += 30;
				ctx.fillRect(movingXPos3, movingYPos3, 30, 30);
			}
			else {
				ctx.clearRect(movingXPos3, movingYPos3, 30, 30);
				movingYPos3 -= 30;
				ctx.fillRect(movingXPos3, movingYPos3, 30, 30);
			}
		}
		if ((x >= startXPos2 && x < startXPos2 + 30) || (x + squareSize > startXPos2 && x + squareSize < startXPos2 + 30)) {
			if ((y >= movingYPos3 && y < movingYPos3 + 30) || (y + squareSize > movingYPos3 && y + squareSize < movingYPos3 + 30)) {
				myFail();
			}
		}
	}
	}
	function startUp4() {
	var id4 = setInterval(movingObstacleFour, speed2);
	var movingXPos4 = startXPos2;
	var movingYPos4 = endYPos;
	function movingObstacleFour() {
		ctx.fillStyle = "blue";
		if (movingYPos4 == startYPos2) {
			clearInterval(id4);
			startUp3();
		}
		else {
			if (startYPos2 < endYPos) {
				ctx.clearRect(movingXPos4, movingYPos4, 30, 30);
				movingYPos4 -= 30;
				ctx.fillRect(movingXPos4, movingYPos4, 30, 30);
			}
			else {
				ctx.clearRect(movingXPos4, movingYPos4, 30, 30);
				movingYPos4 += 30;
				ctx.fillRect(movingXPos4, movingYPos4, 30, 30);
			}
		}
		if ((x >= startXPos2 && x < startXPos2 + 30) || (x + squareSize > startXPos2 && x + squareSize < startXPos2 + 30)) {
			if ((y >= movingYPos4 && y < movingYPos4 + 30) || (y + squareSize > movingYPos4 && y + squareSize < movingYPos4 + 30)) {
				myFail();
			}
		}
	}
	}
	startUp3();
}
function myCoin(coinXPos, coinYPos) {
	ctx.fillStyle = "yellow";
	ctx.strokeStyle = "black";
	ctx.fillRect(coinXPos + 1, coinYPos + 1, 28, 28);
	ctx.strokeRect(coinXPos + 1, coinYPos + 1, 28, 28);
	addEventListener("keydown", coinChecker, false);
	function coinChecker() {
	if (((x >= coinXPos && x < coinXPos + 30) || (x + squareSize > coinXPos && x + squareSize <= coinXPos + 30)) && ((y >= coinYPos && y < coinYPos + 30) || (y + squareSize > coinYPos && y + squareSize <= coinYPos + 30))) {
		ctx.clearRect(coinXPos, coinYPos, 30, 30);
		ctx.fillStyle = "red";
		ctx.fillRect(x, y, squareSize, squareSize);
		collectEffect.volume = 1.0;
		collectEffect.play();
		coin++;
	}
	}
}
function myShrink(shrinkXPos, shrinkYPos) {
	//var shrinkFlash = setInterval(shrinkFlash, 100);
	addEventListener("keydown", shrinkFlash, false);
		ctx.fillStyle = "green";
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(shrinkXPos, shrinkYPos + 15);
		ctx.lineTo(shrinkXPos + 15, shrinkYPos + 30);
		ctx.lineTo(shrinkXPos + 30, shrinkYPos + 15);
		ctx.lineTo(shrinkXPos + 22.5, shrinkYPos + 15);
		ctx.lineTo(shrinkXPos + 22.5, shrinkYPos);
		ctx.lineTo(shrinkXPos + 7.5, shrinkYPos);
		ctx.lineTo(shrinkXPos + 7.5, shrinkYPos + 15);
		ctx.lineTo(shrinkXPos, shrinkYPos + 15);
		ctx.fill();
		ctx.stroke();
	function shrinkFlash() {
		if (((x >= shrinkXPos && x < shrinkXPos + 30) || (x + squareSize > shrinkXPos && x + squareSize <= shrinkXPos + 30)) && ((y >= shrinkYPos && y < shrinkYPos + 30) || (y + squareSize > shrinkYPos && y + squareSize <= shrinkYPos + 30))) {
			ctx.clearRect(shrinkXPos, shrinkYPos, 30, 30);
			ctx.clearRect(x, y, squareSize, squareSize);
			ctx.fillStyle = "green";
			ctx.strokeStyle = "black";
			ctx.beginPath();
			ctx.moveTo(shrinkXPos, shrinkYPos + 15);
			ctx.lineTo(shrinkXPos + 15, shrinkYPos + 30);
			ctx.lineTo(shrinkXPos + 30, shrinkYPos + 15);
			ctx.lineTo(shrinkXPos + 22.5, shrinkYPos + 15);
			ctx.lineTo(shrinkXPos + 22.5, shrinkYPos);
			ctx.lineTo(shrinkXPos + 7.5, shrinkYPos);
			ctx.lineTo(shrinkXPos + 7.5, shrinkYPos + 15);
			ctx.lineTo(shrinkXPos, shrinkYPos + 15);
			ctx.fill();
			ctx.stroke();
			squareSize = 15;
			squareVelocity = 15;
			ctx.fillStyle = "red";
			ctx.fillRect(x, y, squareSize, squareSize);
		}
		else {
			ctx.clearRect(shrinkXPos, shrinkYPos, 30, 30);
		ctx.fillStyle = "green";
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(shrinkXPos, shrinkYPos + 15);
		ctx.lineTo(shrinkXPos + 15, shrinkYPos + 30);
		ctx.lineTo(shrinkXPos + 30, shrinkYPos + 15);
		ctx.lineTo(shrinkXPos + 22.5, shrinkYPos + 15);
		ctx.lineTo(shrinkXPos + 22.5, shrinkYPos);
		ctx.lineTo(shrinkXPos + 7.5, shrinkYPos);
		ctx.lineTo(shrinkXPos + 7.5, shrinkYPos + 15);
		ctx.lineTo(shrinkXPos, shrinkYPos + 15);
		ctx.fill();
		ctx.stroke();
		}
	}
}
function myGrow(growXPos, growYPos) {
	addEventListener("keydown", growFlash, false);
	ctx.fillStyle = "darkorange";
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(growXPos, growYPos + 15);
	ctx.lineTo(growXPos + 15, growYPos);
	ctx.lineTo(growXPos + 30, growYPos + 15);
	ctx.lineTo(growXPos + 22.5, growYPos + 15);
	ctx.lineTo(growXPos + 22.5, growYPos + 30);
	ctx.lineTo(growXPos + 7.5, growYPos + 30);
	ctx.lineTo(growXPos + 7.5, growYPos + 15);
	ctx.lineTo(growXPos, growYPos + 15);
	ctx.fill();
	ctx.stroke();
	function growFlash() {
		if (((x >= growXPos && x < growXPos + 30) || (x + squareSize > growXPos && x + squareSize <= growXPos + 30)) && ((y >= growYPos && y < growYPos + 30) || (y + squareSize > growYPos && y + squareSize <= growYPos + 30))) {
			ctx.clearRect(x, y, squareSize, squareSize);
			ctx.clearRect(growXPos, growYPos, 30, 30);
			ctx.fillStyle = "darkorange";
			ctx.strokeStyle = "black";
			ctx.beginPath();
			ctx.moveTo(growXPos, growYPos + 15);
			ctx.lineTo(growXPos + 15, growYPos);
			ctx.lineTo(growXPos + 30, growYPos + 15);
			ctx.lineTo(growXPos + 22.5, growYPos + 15);
			ctx.lineTo(growXPos + 22.5, growYPos + 30);
			ctx.lineTo(growXPos + 7.5, growYPos + 30);
			ctx.lineTo(growXPos + 7.5, growYPos + 15);
			ctx.lineTo(growXPos, growYPos + 15);
			ctx.fill();
			ctx.stroke();
			squareSize = 60;
			squareVelocity = 60;
			x = growXPos;
			y = growYPos;
			ctx.fillStyle = "red";
			ctx.fillRect(x, y, squareSize, squareSize);
		}
		else {
			ctx.clearRect(growXPos, growYPos, 30, 30);
			ctx.fillStyle = "darkorange";
			ctx.strokeStyle = "black";
			ctx.beginPath();
			ctx.moveTo(growXPos, growYPos + 15);
			ctx.lineTo(growXPos + 15, growYPos);
			ctx.lineTo(growXPos + 30, growYPos + 15);
			ctx.lineTo(growXPos + 22.5, growYPos + 15);
			ctx.lineTo(growXPos + 22.5, growYPos + 30);
			ctx.lineTo(growXPos + 7.5, growYPos + 30);
			ctx.lineTo(growXPos + 7.5, growYPos + 15);
			ctx.lineTo(growXPos, growYPos + 15);
			ctx.fill();
			ctx.stroke();
		}
	}
}
function myNormalSize(normalSizeXPos, normalSizeYPos) {
	addEventListener("keydown", normalSizeFlasher, false);
	ctx.fillStyle = "#CCF";
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(normalSizeXPos, normalSizeYPos + 5);
	ctx.lineTo(normalSizeXPos + 5, normalSizeYPos);
	ctx.lineTo(normalSizeXPos + 15, normalSizeYPos + 10);
	ctx.lineTo(normalSizeXPos + 25, normalSizeYPos);
	ctx.lineTo(normalSizeXPos + 30, normalSizeYPos + 5);
	ctx.lineTo(normalSizeXPos + 20, normalSizeYPos + 15);
	ctx.lineTo(normalSizeXPos + 30, normalSizeYPos + 25);
	ctx.lineTo(normalSizeXPos + 25, normalSizeYPos + 30);
	ctx.lineTo(normalSizeXPos + 15, normalSizeYPos + 20);
	ctx.lineTo(normalSizeXPos + 5, normalSizeYPos + 30);
	ctx.lineTo(normalSizeXPos, normalSizeYPos + 25);
	ctx.lineTo(normalSizeXPos + 10, normalSizeYPos + 15);
	ctx.lineTo(normalSizeXPos, normalSizeYPos + 5);
	ctx.fill();
	ctx.stroke();
	function normalSizeFlasher() {
		if (((x >= normalSizeXPos && x < normalSizeXPos + 30) || (x + squareSize > normalSizeXPos && x + squareSize <= normalSizeXPos + 30)) && ((y >= normalSizeYPos && y < normalSizeYPos + 30) || (y + squareSize > normalSizeYPos && y + squareSize <= normalSizeYPos + 30))) {
			ctx.clearRect(x, y, squareSize, squareSize);
			ctx.clearRect(normalSizeXPos, normalSizeYPos, 30, 30);
			ctx.fillStyle = "#CCF";
			ctx.strokeStyle = "black";
		ctx.beginPath();
	ctx.moveTo(normalSizeXPos, normalSizeYPos + 5);
	ctx.lineTo(normalSizeXPos + 5, normalSizeYPos);
	ctx.lineTo(normalSizeXPos + 15, normalSizeYPos + 10);
	ctx.lineTo(normalSizeXPos + 25, normalSizeYPos);
	ctx.lineTo(normalSizeXPos + 30, normalSizeYPos + 5);
	ctx.lineTo(normalSizeXPos + 20, normalSizeYPos + 15);
	ctx.lineTo(normalSizeXPos + 30, normalSizeYPos + 25);
	ctx.lineTo(normalSizeXPos + 25, normalSizeYPos + 30);
	ctx.lineTo(normalSizeXPos + 15, normalSizeYPos + 20);
	ctx.lineTo(normalSizeXPos + 5, normalSizeYPos + 30);
	ctx.lineTo(normalSizeXPos, normalSizeYPos + 25);
	ctx.lineTo(normalSizeXPos + 10, normalSizeYPos + 15);
	ctx.lineTo(normalSizeXPos, normalSizeYPos + 5);
	ctx.fill();
	ctx.stroke();
		squareSize = 30;
		squareVelocity = 30;
		x = normalSizeXPos;
		y = normalSizeYPos;
		ctx.fillStyle = "red";
		ctx.fillRect(x, y, squareSize, squareSize);
		}
		else {
			//alert('false');
			ctx.clearRect(normalSizeXPos, normalSizeYPos, 30, 30);
			ctx.fillStyle = "#CCF";
			ctx.strokeStyle = "black";
		ctx.beginPath();
	ctx.moveTo(normalSizeXPos, normalSizeYPos + 5);
	ctx.lineTo(normalSizeXPos + 5, normalSizeYPos);
	ctx.lineTo(normalSizeXPos + 15, normalSizeYPos + 10);
	ctx.lineTo(normalSizeXPos + 25, normalSizeYPos);
	ctx.lineTo(normalSizeXPos + 30, normalSizeYPos + 5);
	ctx.lineTo(normalSizeXPos + 20, normalSizeYPos + 15);
	ctx.lineTo(normalSizeXPos + 30, normalSizeYPos + 25);
	ctx.lineTo(normalSizeXPos + 25, normalSizeYPos + 30);
	ctx.lineTo(normalSizeXPos + 15, normalSizeYPos + 20);
	ctx.lineTo(normalSizeXPos + 5, normalSizeYPos + 30);
	ctx.lineTo(normalSizeXPos, normalSizeYPos + 25);
	ctx.lineTo(normalSizeXPos + 10, normalSizeYPos + 15);
	ctx.lineTo(normalSizeXPos, normalSizeYPos + 5);
	ctx.fill();
	ctx.stroke();
		}
	}
}
/*var angle = 0;
setInterval(function() { 
	myCanvas.style.transform = "rotate(" + angle + "deg)";
    angle += 1;
}, 5);*/