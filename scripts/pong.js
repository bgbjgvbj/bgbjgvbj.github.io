let Ball = document.getElementById("ball");
let Pan1 = document.getElementById("pan1");
let Pan2 = document.getElementById("pan2");
let Barrier = document.getElementById("barrier");

if(Ball && Pan1 && Pan2 && Barrier) {
    width = window.innerWidth;
    height = window.innerHeight;
    centerX = (width/2);
    centerY = (height/2);
    Ball.style.position = 'absolute';
    Ball.style.left = centerX+"px";
    Ball.style.top = centerY+"px";
    Barrier.style.position = 'absolute';
    Barrier.style.left = (centerX-(Barrier.offsetWidth/2))+"px";
    Barrier.style.top = (centerY-(Barrier.offsetHeight/2))+"px";
    console.log((Barrier.style.height))
    directionX = 1;
    directionY = 1;
    speed = 1;
    function MoveBall() {
        left = (centerX-200);
        right = (centerX+200);
        roof = (centerY-100);
        bottom = (centerY+100);
        bufferX = parseFloat(Ball.style.left) + (directionX*speed);
        bufferY = parseFloat(Ball.style.top) + (directionY*speed);
        bounced = false;
        if(bufferX > right || bufferX < left) {
            directionX *= -1
            if(bufferX > right) {
                bufferX = right;
            }
            if(bufferX < left) {
                bufferX = left;
            }
            bounced = true;
        }
        if(bufferY > bottom || bufferY < roof) {
            directionY *= -1
            if(bufferY > bottom) {
                bufferY = bottom;
            }
            if(bufferY < roof) {
                bufferY = roof;
            }
            bounced = true;
        }
        if(bounced == true) {
            if(speed < 5) {
                speed += 0.05
            }
            bounced = false;
        }
        Ball.style.left = bufferX+("px"); 
        Ball.style.top = bufferY+("px"); 
    }

    setInterval(MoveBall, 0);
}