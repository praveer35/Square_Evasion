//			MUSIC			//
var crashEffect = document.getElementById("myAudio");
var winEffect = document.getElementById("victoryAudio");
var collectEffect = document.getElementById("collectAudio");
var musicEffect = document.getElementById("backgroundAudio");
musicEffect.loop = true;
musicEffect.volume = 0.4;
// ------------------------	//
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var myNewCanvas = document.getElementById("myNewCanvas");
var newContext = myNewCanvas.getContext("2d");
//var timeScore;
var coin = 0;
//			RED SQUARE		//
var x = 0;
var y = 0;
var myVelocity = 30;
var centerX = 480;
var centerY = 330;
var redSquareFlasher = setInterval(mySquareFlasher, 50)
function mySquareFlasher() {
ctx.fillStyle = "red";
ctx.fillRect(centerX, centerY, 30, 30);
}
//addEventListener("keydown", myWall, false);
addEventListener("keydown", myKey, false);
function myKey() {
	musicEffect.play();
	if (event.keyCode === 37) {
		event.preventDefault();
		x -= myVelocity;
	}
	if (event.keyCode === 38) {
		event.preventDefault();
		y -= myVelocity;
	}
	if (event.keyCode === 39) {
		event.preventDefault();
		x += myVelocity;
	}
	if (event.keyCode === 40) {
		event.preventDefault();
		y += myVelocity;
	}
	//
	var xPositionRightNow = 480 + x;
	var yPositionRightNow = 330 + y;
	//document.getElementById("xinfo").innerHTML = xPositionRightNow;
	//document.getElementById("yinfo").innerHTML = yPositionRightNow;
}
//			FAIL			//
function myFail() {
	musicEffect.pause();
	crashEffect.volume = 0.3;
	crashEffect.play();
	//var FailFlasherJob = setInterval(FailFlasher, 0.000001);
	//ctx.clearRect(240, 110, 600, 330);
	//function FailFlasher() {
		newContext.fillStyle = "red";
		newContext.font = "90px Verdana";
		newContext.fillText("You lose!", 280, 80);
	//}
	myVelocity = 0;	
	setTimeout(function(){ location.reload(); }, 1000);
}
//			WIN				//
function mySucceed(winPositionX, winPositionY, winWidth, winHeight, coinReq, LVL) {
	var ZYXWVUT = setInterval(ZYXWVUTNews, 0.1);
	function ZYXWVUTNews() {
		ctx.fillStyle = "lightgreen";
		ctx.fillRect(winPositionX - x, winPositionY - y, winWidth, winHeight);
	}
	addEventListener("keydown", myWinChecker, false);
	function myWinChecker() {
		if (event.keyCode === 38) {
			ctx.clearRect(winPositionX - x, winPositionY - y - 30, winWidth, winHeight);
		}
		if ((centerX + 30 > winPositionX - x && centerX < winPositionX - x + winWidth) && (centerY + 30 > winPositionY - y && centerY < winPositionY - y + winHeight)) {
			if (coin >= coinReq) {
				musicEffect.pause();
				winEffect.volume = 1.0;
				winEffect.play();
				//var IDOK = setInterval(succeedFlash, 50);
				//function succeedFlash() {
				newContext.fillStyle = "green";
				newContext.font = "50px Arial";
				newContext.fillText("Level " + LVL + " Complete!                         Rank: ---", 0, 50);	
				//}
				//clearInterval(timeScore);
				//x = -1000;
				//y = -1000;
				myVelocity = 0;
				myLink();
			}
			else {
				myFail();
			}
		}
	}
}
//			WALLS			//
function myWall(cornerX, cornerY, width, height) {
	addEventListener("keydown", myWallChecker, false);
	var ABCDEFG = setInterval(ABCDEFGNews, 0.001);
	function ABCDEFGNews() {
		ctx.fillStyle = "black";
		ctx.fillRect(cornerX - x, cornerY - y, width, height);
	}
	function myWallChecker() {
		//ctx.clearRect(0, 0, 990, 690);
		if (event.keyCode === 37) {
			ctx.clearRect(cornerX - x - 30, cornerY - y, width, height);
		}
		if (event.keyCode === 38) {
			ctx.clearRect(cornerX - x, cornerY - y - 30, width, height);
		}
		if (event.keyCode === 39) {
			ctx.clearRect(cornerX - x + 30, cornerY - y, width, height);	
		}
		if (event.keyCode === 40) {
			ctx.clearRect(cornerX - x, cornerY - y + 30, width, height);
		}
		//ctx.clearRect(cornerX - x, cornerY - y, width, height);
		ctx.fillStyle = "red";
		ctx.fillRect(centerX, centerY, 30, 30);
		var wallCornerXAdj = cornerX - x;
		var wallCornerYAdj = cornerY - y;
		ctx.fillStyle = "black";
		ctx.fillRect(cornerX - x, cornerY - y, width, height);
		if ((cornerX - x <= centerX) && (cornerX - x + width > centerX)) {
			if ((cornerY - y <= centerY) && (cornerY - y + height > centerY)) {
				removeEventListener("keydown", myWallChecker, false);
				//clearInterval(ABCDEFG);
				//ctx.clearRect(0, 0, 990, 690);
				myFail();
			}
		}
	}
}
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
				ctx.clearRect(movingXPos - x, movingYPos - y, 30, 30);
				movingXPos += 30;
				ctx.fillRect(movingXPos - x, movingYPos - y, 30, 30);	
			}
			else {
				ctx.clearRect(movingXPos - x, movingYPos - y, 30, 30);
				movingXPos -= 30;
				ctx.fillRect(movingXPos - x, movingYPos - y, 30, 30);		
			}
		}
		if (centerY == startYPos - y) {
			if (centerX == movingXPos - x + 30 || centerX + 30 == movingXPos - x) {
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
				ctx.clearRect(movingXPos2 - x, movingYPos2 - y, 30, 30);
				movingXPos2 -= 30;
				ctx.fillRect(movingXPos2 - x, movingYPos2 - y, 30, 30);
			}
			else {
				ctx.clearRect(movingXPos2 - x + 30, movingYPos2 - y, 30, 30);
				movingXPos2 += 30;
				ctx.fillRect(movingXPos2 - x, movingYPos2 - y, 30, 30);
			}
		}
		if (centerY == startYPos - y) {
			if (centerX == movingXPos2 - x + 30 || centerX + 30 == movingXPos2 - x) {
				myFail();
			}
		}
	}
	}
	startUp();
}
function movingEnemyY(startXPos2, startYPos2, endYPos, speed2) {
	function startUp3() {
	var id3 = setInterval(movingObstacleThree, speed2);
	var movingXPos3 = startXPos2;
	var movingYPos3 = startYPos2;
	function movingObstacleThree() {
		addEventListener("keydown", clearBlueSquares, false);
		//var clearingBlue = setInterval(clearBlueSquares, 1);
		function clearBlueSquares() {
			if (event.keyCode === 37) {
				//alert('"');
				ctx.clearRect(startXPos2 - x - 30, startYPos2 - y, 30, endYPos - startYPos2 + 30);
			}
		}
		ctx.fillStyle = "blue";
		if (movingYPos3 == endYPos) {
			clearInterval(id3);
			startUp4();
		}
		else {
			if (startYPos2 < endYPos) {
				ctx.clearRect(startXPos2 - x, startYPos2 - y, 30, endYPos - startYPos2 + 30);
				movingYPos3 += 30;
				ctx.fillRect(movingXPos3 - x, movingYPos3 - y, 30, 30);
			}
			else {
				ctx.clearRect(startXPos2 - x, endYPos - y, 30, startYPos2 + 30 - endYPos);
				movingYPos3 -= 30;
				ctx.fillRect(movingXPos3 - x, movingYPos3 - y, 30, 30);
			}
		}
		if (centerX == startXPos2 - x) {
			if (centerY == movingYPos3 - y + 30 || centerY + 30 == movingYPos3 - y) {
				myFail();
			}
		}
		ctx.fillStyle = "red";
		ctx.fillRect(centerX, centerY, 30, 30);
	}
	}
	function startUp4() {
	var id4 = setInterval(movingObstacleFour, speed2);
	var movingXPos4 = startXPos2;
	var movingYPos4 = endYPos;
	function movingObstacleFour() {
		addEventListener("keydown", clearBlueSquares, false);
		//var clearingBlue = setInterval(clearBlueSquares, 1);
		function clearBlueSquares() {
			if (event.keyCode === 37) {
				//alert('"');
				ctx.clearRect(startXPos2 - x - 30, startYPos2 - y, 30, endYPos - startYPos2 + 30);
			}
		}
		ctx.fillStyle = "blue";
		if (movingYPos4 == startYPos2) {
			clearInterval(id4);
			startUp3();
		}
		else {
			if (startYPos2 < endYPos) {
				ctx.clearRect(startXPos2 - x, startYPos2 - y, 30, endYPos - startYPos2 + 30);
				movingYPos4 -= 30;
				ctx.fillRect(movingXPos4 - x, movingYPos4 - y, 30, 30);
			}
			else {
				ctx.clearRect(startXPos2 - x, endYPos - y, 30, startYPos2 + 30 - endYPos);
				movingYPos4 += 30;
				ctx.fillRect(movingXPos4 - x, movingYPos4 - y, 30, 30);
			}
		}
		if (centerX == startXPos2 - x) {
			if (centerY == movingYPos4 - y + 30 || centerY + 30 == movingYPos4 - y) {
				myFail();
			}
		}
		ctx.fillStyle = "red";
		ctx.fillRect(centerX, centerY, 30, 30);
	}
	}
	startUp3();
}
function myCoin(coinXPos, coinYPos) {
	//var LMNOP = setInterval(LMNOPNews, 0.01);
	//function LMNOPNews() {
	ctx.fillStyle = "yellow";
	ctx.strokeStyle = "black";
	ctx.fillRect(coinXPos + 1 - x, coinYPos + 1 - y, 28, 28);
	ctx.strokeRect(coinXPos + 1 - x, coinYPos + 1 - y, 28, 28);
	//}
	addEventListener("keydown", coinChecker, false);
	addEventListener("keydown", coinMover, false);
	function coinChecker() {
	if (centerX == coinXPos - x && centerY == coinYPos - y) {
		collectEffect.volume = 1.0;
		collectEffect.play();
		removeEventListener("keydown", coinMover, false);
		coin++;
		ctx.clearRect(coinXPos - x - 60, coinYPos - y - 60, 120, 120);
		ctx.fillStyle = "red";
		ctx.fillRect(480, 330, 30, 30);
	}
	}
	function coinMover() {
		if (event.keyCode === 37) {
			ctx.clearRect(coinXPos - x - 30, coinYPos - y, 30, 30);
			ctx.fillStyle = "yellow";
			ctx.strokeStyle = "black";
			ctx.fillRect(coinXPos + 1 - x, coinYPos + 1 - y, 28, 28);
			ctx.strokeRect(coinXPos + 1 - x, coinYPos + 1 - y, 28, 28);
		}
		if (event.keyCode === 38) {
			ctx.clearRect(coinXPos - x, coinYPos - y - 30, 30, 30);
			ctx.fillStyle = "yellow";
			ctx.strokeStyle = "black";
			ctx.fillRect(coinXPos + 1 - x, coinYPos + 1 - y, 28, 28);
			ctx.strokeRect(coinXPos + 1 - x, coinYPos + 1 - y, 28, 28);
		}
		if (event.keyCode === 39) {
			ctx.clearRect(coinXPos - x + 30, coinYPos - y, 30, 30);
			ctx.fillStyle = "yellow";
			ctx.strokeStyle = "black";
			ctx.fillRect(coinXPos + 1 - x, coinYPos + 1 - y, 28, 28);
			ctx.strokeRect(coinXPos + 1 - x, coinYPos + 1 - y, 28, 28);
		}
		if (event.keyCode === 40) {
			ctx.clearRect(coinXPos - x, coinYPos - y + 30, 30, 30);
			ctx.fillStyle = "yellow";
			ctx.strokeStyle = "black";
			ctx.fillRect(coinXPos + 1 - x, coinYPos + 1 - y, 28, 28);
			ctx.strokeRect(coinXPos + 1 - x, coinYPos + 1 - y, 28, 28);
		}
	}
}
/*var angle = 0;
setInterval(function() { 
	myCanvas.style.transform = "rotate(" + angle + "deg)";
    angle += 1;
}, 5);*/