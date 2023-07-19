let Ball = document.getElementById("ball");
let Pan = document.getElementById("pan");
let Barrier = document.getElementById("barrier");
let GameOver = document.getElementById("over");
let Retry = document.getElementById("retry");

function GetStyleValue(element, property) {
	return getComputedStyle(element).getPropertyValue(property);
}

function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

if(Ball && Pan && Barrier && GameOver && Retry) {
	var mouseX = 0;
	document.addEventListener("mousemove", function(event) {
		mouseX = event.clientX;
	});
	var windowwidth, windowheight, centerX, centerY;
	var ballsize, borderwidth;
	var left, right, roof, bottom;
	var playing = false;
	function Setup() {
		windowwidth = window.innerWidth;
		windowheight = window.innerHeight;
		centerX = (windowwidth/2);
		centerY = (windowheight/2);
		Ball.style.position = 'absolute';
		Ball.style.width = (windowwidth*2/100)+"px";
		Ball.style.height = (windowwidth*2/100)+"px";
		ballsize = (windowwidth*2/100);
		Barrier.style.position = 'absolute';
		Barrier.style.width = (windowwidth*75/100)+"px";
		Barrier.style.height = (windowwidth*30/100)+"px";
		Barrier.style.left = (centerX-(Barrier.clientWidth/2))+"px";
		Barrier.style.top = (centerY-(Barrier.clientHeight/2))+"px";
		borderwidth = parseFloat(GetStyleValue(Barrier, 'border-width'))
		Pan.style.position = 'absolute';
		Pan.style.width = (windowwidth*8/100)+"px";
		Pan.style.height = (windowwidth/100)+"px";
		
		Retry.style.position = 'absolute';
		Retry.style.left = (centerX-(Retry.clientWidth/2))+"px";
		Retry.style.top = (centerY-(Retry.clientHeight/2))+"px";
		
		left = (centerX-(Barrier.clientWidth/2)+borderwidth);
        right = (centerX+(Barrier.clientWidth/2)+borderwidth);
        roof = (centerY-(Barrier.clientHeight/2)+borderwidth);
        bottom = (centerY+(Barrier.clientHeight/2)+borderwidth);
	}
	Setup();
	
	function Reset() {
		playing = true;
		Ball.style.left = (centerX-(ballsize/2))+"px";
		Ball.style.top = (centerY-(ballsize/2))+"px";
		GameOver.style.display = "none";
		Retry.style.display = "none";
		directionX = Math.random() < 0.5 ? -1 : 1;
		directionY = -1;
		speed = 1 * (windowwidth/1000);
	}
	Reset();
	
    function MoveBall() {
		Setup();
			
		if(playing == true) {
			Pan.style.left = Math.min(Math.max(mouseX, left), right-(parseFloat(GetStyleValue(Pan, 'width'))))+"px";
			Pan.style.top = bottom-(windowwidth*5/100)+"px";
			
			bufferX = parseFloat(Ball.style.left) + (directionX*speed);
			bufferY = parseFloat(Ball.style.top) + (directionY*speed);
			if(bufferX > right-ballsize || bufferX < left) {
				directionX *= -1
				if(bufferX > right-ballsize) {
					bufferX = right-ballsize;
				}
				if(bufferX < left) {
					bufferX = left;
				}
			}
			if(bufferY < roof) {
				directionY = 1
				bufferY = roof;
			}
			speed += 0.001 * (windowwidth/1000);
			if(speed > 15 * (windowwidth/1000)) {
				speed = (windowwidth/1000);
			}
			if(bufferY > parseFloat(Pan.style.top)-ballsize
				&& bufferX > parseFloat(Pan.style.left) 
				&& bufferX < parseFloat(Pan.style.left)+parseFloat(GetStyleValue(Pan, 'width'))) 
			{
				directionY = -1;
				bufferY = parseFloat(Pan.style.top)-ballsize;
			}
			Ball.style.left = bufferX+("px"); 
			Ball.style.top = bufferY+("px");
			if(bufferY > bottom-ballsize) {
				playing = false;
				GameOver.style.display = "block";
				Retry.style.display = "block";
			}
		}
    }

    setInterval(MoveBall, 0);
}
