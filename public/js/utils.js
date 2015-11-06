// variables
var clicks = 0;
var fails = 0;
var scoreText = "";
var start_time;

//configuration
var isMiddleVisible = true;
var amountOfLines = 3;
var generatorType = 'NOTrandom';

//Print config
var needToPrintRandomDataSet = false;
var amountOfLinesToPrint = 1000;

function spotClickedByUser() {
    console.log('spotClickedByUser');
    countHit();
    playSoundByID('goodaudio');
    zeichneGraph();
}

function spotMissedByUser() {
    console.log('spotMissedByUser');
    countMiss();
    playSoundByID('wrongaudio');
}

function zeichneGraph(){
    if(start_time==null){
        start_time = new Date();
    }

    var spotSize = 50;
    var lineSize = 5;
    
    var clipboard = document.getElementById('myCanvas');

    // clear clipboard!
    clipboard.width+=0;
    
    if(amountOfLines<=clicks){
        var end_time = new Date();
        var elapsed_ms = end_time - start_time;
        var seconds = Math.round(elapsed_ms / 1000);
        var minutes = Math.round(seconds / 60);
        var hours = Math.round(minutes / 60);
        var sec = TrimSecondsMinutes(seconds);
        var min = TrimSecondsMinutes(minutes);
        
        alert('Das Experiment ist abgeschlossen');
        printToHTMLById("treffer",document.getElementById("clicks").innerHTML);
        printToHTMLById("fehlversuche",document.getElementById("fails").innerHTML);
        printToHTMLById("versuchszeitpunkt",getDate());
        printToHTMLById("versuchsdauer",min+" min und "+sec +" s");
        var experimentName = getExperimentName();
        //var trial = new Trial(document.getElementById("bezeichnung").value,trailTIme, hits, fails);
        refreshCounters();
        start_time = null;
        return;
    }
    
    var lineGenerator = new LineGenerator(generatorType, amountOfLines);
    var lineList = lineGenerator.getLines();
    var line = lineList[clicks];
   
    drawLine(document.getElementById('myCanvas'), line, lineSize);

    var elements = [];

    addSpotToSpotsList(elements, spotSize, line);

    drawSpot(elements);

    //if spot clicked -> spotClickedByUser() will be executed
    //otherwise spotMissedByUser() will be executed
    addSpotListener(elements);
    
    if(needToPrintRandomDataSet){
        printToHTML();
    }
}

function addSpotListener(elements) {
    document.getElementById('myCanvas').addEventListener('click', function(event) {
        var elemLeft = document.getElementById('myCanvas').offsetLeft;
        var elemTop = document.getElementById('myCanvas').offsetTop;
        var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
        
        // Collision detection between clicked offset and element.
        elements.forEach(function(element) {
            //console.log('check where user clicked to:');
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
                elements = [];
                spotClickedByUser();
            }
            else{
                spotMissedByUser();
            }
        });
    }, false);
}

function getDate() {
    var dateObj = new Date();
    //2010-03-08 14:59:30.252
    return (dateObj.getUTCFullYear() + "-" + (dateObj.getUTCMonth() + 1) + "-" + dateObj.getUTCDate() + " " + dateObj.getHours() + ":" + dateObj.getMinutes());
}

function countHit() {
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
}

function countMiss() {
    fails += 1;
    document.getElementById("fails").innerHTML = fails;
}

function playSoundByID(audioId) {
  var sound = document.getElementById(audioId);
  sound.play();
}

function refreshCounters() {
    clicks = 0;
    fails = 0;
    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("fails").innerHTML = fails;
}

// @return {integer} a random int between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function TrimSecondsMinutes(elapsed) {
    if (elapsed >= 60)
        return TrimSecondsMinutes(elapsed - 60);
    return elapsed;
}

function drawLine(clipboard, line, lineSize) {
    var ctx = clipboard.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(line.getX1(),line.getY1());
    ctx.lineTo(line.getX2(), line.getY2());
    ctx.lineWidth = lineSize;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
}


function addSpotToSpotsList(spotList, spotSize, line) {
    var m1 = (line.getX1()+line.getX2())/2;
    var m2 = (line.getY1()+line.getY2())/2;
    spotList.push({
        colour: '#ffffff',
        width: spotSize+20,
        height: spotSize,
        top: m2-(spotSize/2),
        left: m1-(spotSize/2)-10
     });
}

function drawSpot(elements) {
    elements.forEach(function(element) {
        //alert('element');
        //context.fillStyle = element.colour;
        if(isMiddleVisible){
            document.getElementById('myCanvas').getContext('2d').fillStyle = 'rgba(0, 0, 121, 0.4)';
        }
        else{
            document.getElementById('myCanvas').getContext('2d').fillStyle = 'rgba(0, 0, 0, 0.0)';
        }
        document.getElementById('myCanvas').getContext('2d').fillRect(element.left, element.top, element.width, element.height);
     });
}

function getExperimentName() {
    var text;
    try {
        text = document.getElementById("bezeichnung").value;
        if(text===''){
            alert('Bitte einen Namen für den Versuch angeben!');
        }
    }
    catch(err) {
        console.log('Could not read bezeichnung');
    }
    return text;
}

var Line = function (x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
};

Line.prototype.printCoordinates = function() {
  return ("Koordinaten: (" + this.x1+","+ this.y1+") und (" + this.x2+","+ this.y2+")");
};

Line.prototype.getX1 = function() {
    return this.x1;
};

Line.prototype.getX2 = function() {
    return this.x2;
};

Line.prototype.getY1 = function() {
    return this.y1;
};

Line.prototype.getY2 = function() {
    return this.y2;
};

