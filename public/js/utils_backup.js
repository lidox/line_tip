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

function checkLineTiped(){
    var clipboard = document.getElementById('myCanvas'),
    elemLeft = clipboard.offsetLeft,
    elemTop = clipboard.offsetTop,
    context = clipboard.getContext('2d');
    
    clipboard.addEventListener('click', function(event) {
          var x = event.pageX - elemLeft,
          y = event.pageY - elemTop;
          
          // Collision detection between clicked offset and element.
          var element = elements[0];
              if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
                  //alert('clicked an element');
                  countHit();
                  PlaySound();
                  
                  // clear clipboard
                  clipboard.width+=0;
                  
                  zeichneGraph();
              }
              else{
                  countMiss();
              }
          //});
      }, false);
}

function zeichneGraph(){
    var spotBreite = 40;
    //var spot_transparenz = 0.7;
    var lineSize = 5;
    var x1 = getRandomInt(50, 100);
    var y1 = getRandomInt(10, 700);
    var x2 = getRandomInt(400, 1000);
    var y2 = y1;//getRandomInt(10, 700);
    var m1 = (x1+x2)/2;
    var m2 = (y1+y2)/2;
    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');

    var canvasOffset = $("#myCanvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var PI2 = Math.PI * 2;

    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = lineSize;
    ctx.stroke();

    // jetzt das click-element
    var elem = document.getElementById('myCanvas'),
      elemLeft = elem.offsetLeft,
      elemTop = elem.offsetTop,
      context = elem.getContext('2d'),
      elements = [];
      // Add event listener for `click` events.
      elem.addEventListener('click', function(event) {
          var x = event.pageX - elemLeft,
          y = event.pageY - elemTop;
          
          // Collision detection between clicked offset and element.
          var element = elements[0];
              if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
                  //alert('clicked an element');
                  countHit();
                  PlaySound();
                  elem.width+=0;
                  zeichneGraph();
              }
              else{
                  countMiss();
              }
          //});
      }, false);
      // Add element.
      elements.push({
          colour: '#ffffff',
          width: spotBreite,
          height: spotBreite,
          top: m2-(spotBreite/2),
          left: m1-(spotBreite/2)
      });
      // Render elements.
      elements.forEach(function(element) {
          //context.fillStyle = element.colour;
          context.fillStyle = 'rgba(0, 0, 0, 0.4)';
          context.fillRect(element.left, element.top, element.width, element.height);
      });
}