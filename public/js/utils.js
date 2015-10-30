var clicks = 0;
function countHit() {
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
}
var fails = 0;
function countMiss() {
    fails += 1;
    document.getElementById("fails").innerHTML = fails;
}

function PlaySound() {
  var sound = document.getElementById("audio");
  sound.play()
}

// @return {integer} a random int between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function removeOldListenerByName(clipboard, listenerName) {
    // remove listerner if possible to clear old stuff
    try {
       clipboard.removeEventListener(listenerName);
       //alert('listener removed');
    }
    catch(err) { 
        alert('no old listener to remove');
    }
}

//var spotBreite = 30;
//var lineSize = 5;

function zeichneGraph(){   
    var spotSize = 40;//rename: spotSize
    var lineSize = 5;
    
    var clipboard = document.getElementById('myCanvas');

    // clear clipboard!
    clipboard.width+=0;
    
    // calculate points of line and middle spot
    var x1 = getRandomInt(50, 100);
    var y1 = getRandomInt(10, 700);
    var x2 = getRandomInt(400, 1000);
    var y2 = y1;//getRandomInt(10, 700);
    var m1 = (x1+x2)/2;
    var m2 = (y1+y2)/2;
    
    var ctx = clipboard.getContext('2d');
    var canvasOffset = $("#myCanvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;

    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = lineSize;
    ctx.stroke();
    
    //alert('1');
    // jetzt das click-element
    var elem = document.getElementById('myCanvas');
    var elemLeft = elem.offsetLeft;
    var elemTop = elem.offsetTop;
    var context = elem.getContext('2d');
    var elements = [];
    //alert('2');
    
    // Add element to listen.
    elements.push({
        colour: '#ffffff',
        width: spotSize,
        height: spotSize,
        top: m2-(spotSize/2),
        left: m1-(spotSize/2)
     });
    //alert('6');
    // Render elements.
    elements.forEach(function(element) {
        //alert('element');
        //context.fillStyle = element.colour;
        context.fillStyle = 'rgba(0, 0, 0, 0.4)';
        context.fillRect(element.left, element.top, element.width, element.height);
     });
    
    elem.addEventListener('click', function(event) {
        var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
        // Collision detection between clicked offset and element.
        elements.forEach(function(element) {
            if (y > element.top && y < element.top + element.height
            && x > element.left && x < element.left + element.width) {
                //alert('clicked an element');
                removeOldListenerByName(elem, 'click');
                elements = [];
                countHit();
                PlaySound();
                zeichneGraph();
            }
            else{countMiss();}
        });
    }, false);
}

