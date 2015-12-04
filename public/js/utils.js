// variables
var clicks = 0;
var fails = 0;
var scoreText = "";
var start_time;
var lastClickTimeStamp;
var canvasSpots = [];
var isHidden = false;

//configuration
var isLineSpotVisible = false;
var amountOfLines = 800;
var spotWidthInPercentage = 0.23;
var spotHeight = 50;
var lineSize = 5;
var lineGenerationType = 'NOTrandom';

//Print config
var needToPrintRandomDataSet = false;
var amountOfLinesToPrint = 1000;

/*
    this is the oscillator! We make our sounds on the fly - so no need to worry about saving wav files anymore... haha. Could have done it up front, right?
*/
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext(), currentOsc, isMouseDown, lastY;

/* note wrong value = 110.00 + sawtooth, note correct value = 783.99 + squarewave
    send 1 for correct, 0 for incorrect
*/

function startSound(correct)
{
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    var bpm = parseInt(120);
    var notelength = parseFloat(0.25);
    var playlength = 0;
    if(correct==0){
        var frq = 250.00;
        o.type = 'square';
    }else{
        var frq = 900;
        o.type = 'square';
    }
    playlength = 1/(bpm/60)*notelength;
    if(frq){
        o.frequency.value = frq;
        o.start(ctx.currentTime);
        o.stop(ctx.currentTime + playlength);
        g.gain.value = 1;
        o.connect(g);
        g.connect(ctx.destination);
    }
}


/*
 We should acturally reset the start time, even if the patient is failing all the time. Else we get a undefined -
 horrible!
 */
function spotMissedByUser() {
    console.log('spotMissedByUser');
    countMiss();
    //startSound(0);
    if (start_time == null) {
        start_time = new Date();
    }
}

function spotClickedByUser() {
    console.log('spotClickedByUser');
    countHit();
    zeichneGraph();
}

/*
 Why do we need the Trim Seconds stuff? Too many recursions! Check the Console...
 */
function stopTrial() {
    if ((clicks > 0 && fails == 0) || (clicks == 0 && fails > 0) || (clicks > 0 && fails > 0)) {
        var end_time = lastClickTimeStamp;
        var elapsed_ms = end_time - start_time;
        var seconds = Math.round(elapsed_ms / 1000);
        var minutes = Math.round(seconds / 60);
        var hours = Math.round(minutes / 60);

        var sec = parseInt(seconds);
        var min = 0;
        while (sec > 59) {
            sec -= 60;
            min++;
        }
		
        printToHTMLById("treffer", document.getElementById("clicks").innerHTML);
        printToHTMLById("fehlversuche", document.getElementById("fails").innerHTML);
        printToHTMLById("versuchszeitpunkt", getDate());
        printToHTMLById("versuchsdauer", min + " min and " + sec + " s");
        var experimentName = getExperimentName();
        start_time = null;
        clicks = 0;
        return;
    }
    else {
        return;
    }
}

function zeichneGraph(){
    if(start_time==null){
        start_time = new Date();
    }

    // clear clipboard
    document.getElementById('myCanvas').width+=0;
    
    if(amountOfLines<=clicks){
        stopTrial();
    }
    
    var lineGenerator = new LineGenerator(lineGenerationType, amountOfLines);
    var lineList = lineGenerator.getLines();
    var line = lineList[clicks];
    console.log("amount of clicks = "+clicks);
   
    drawLine(document.getElementById('myCanvas'), line, lineSize);

    var lineSpotList = [];

    addSpotToSpotsList(lineSpotList, spotHeight, line);

    drawSpot(lineSpotList);
    
    lineSpotList.push({
        width: 50,
        height: 40,
        top: 0,
		left: 980
	});
	
    drawRedStartStopButton(lineSpotList[1]);
    
    //if spot clicked -> spotClickedByUser() will be executed
    //otherwise spotMissedByUser() will be executed
    addSpotListener(lineSpotList);
    
    if(needToPrintRandomDataSet){
        printToHTML();
    }
}

function drawRedStartStopButton(redButton) {
	document.getElementById('myCanvas').getContext('2d').fillStyle = 'rgba(153, 0, 0, 0.8)';
    document.getElementById('myCanvas').getContext('2d').fillRect(redButton.left, redButton.top, redButton.width, redButton.height);
}

function addSpotListener(elements) {
    document.getElementById('myCanvas').addEventListener('click', function(event) {
        var elemLeft = document.getElementById('myCanvas').offsetLeft;
        var elemTop = document.getElementById('myCanvas').offsetTop;
        var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
        
        var element = elements[1];
        if(element!=undefined){
          if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
             if(element.left==980){
                 onCanvasBtn();
                 return;
             }
           }
        }

        // Collision detection between clicked offset and element.
        var element = elements[0];
            //console.log('check where user clicked to:');
            lastClickTimeStamp = new Date();
        if(element!=undefined){
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
                elements = [];
                spotClickedByUser();
				startSound(1);
            }
            else{
                spotMissedByUser();
				startSound(0);
            }
        }
        
    }, false);
}

function getDate() {
    var dateObj = new Date();
    //2010-03-08 14:59:30.252
    var minutes = dateObj.getMinutes(); 
    if(dateObj.getMinutes()<10){
        minutes = "0"+minutes;
    }
    return (dateObj.getUTCFullYear() + "-" + (dateObj.getUTCMonth() + 1) + "-" + dateObj.getUTCDate() + " " + dateObj.getHours() + ":" + minutes);
}

function countHit() {
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
}

function countMiss() {
    fails += 1;
    document.getElementById("fails").innerHTML = fails;
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

function drawLine(clipboard, line, lineSize) {
    var ctx = clipboard.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(line.getX1(),line.getY1());
    ctx.lineTo(line.getX2(), line.getY2());
    ctx.lineWidth = lineSize;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
}


function addSpotToSpotsList(spotList, spotHeight, line) {
    var spotWidth = line.getLength()*spotWidthInPercentage;
    var m1 = ((line.getX1()+line.getX2())/2)-(spotWidth/2)+(spotHeight/2);
    var m2 = (line.getY1()+line.getY2())/2;
    spotList.push({
        colour: '#ffffff',
        width: (spotWidth),
        height: spotHeight,
        top: m2-(spotHeight/2),
        left: m1-(spotHeight/2)-10
     });
}

function drawSpot(elements) {
    elements.forEach(function(element) {
        if(isLineSpotVisible){
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

Line.prototype.getLength = function() {
    var x1 = parseFloat(this.getX1());
    var y1 = parseFloat(this.getY1());
    var x2 = parseFloat(this.getX2());
    var y2 = parseFloat(this.getY2());
    var result = Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1));
    console.log("länge="+result);
    return result;
};

function hideAll() {
    $(".col-md-12, #data, .hideMe").hide();
    $(document).scrollTop($("#myCanvas").offset().top);
}
function showAll() {
    $(".col-md-12, #data, .hideMe").show();
}

function toggleShowAll() {
    if(isHidden){
		showAll();
		isHidden = false;
	}
	else{
        start_time = new Date();
		hideAll();
		isHidden = true;
	}
}

function startAndStopTrial() {
    if(isHidden){
        //start
        resetForm();
        refreshCounters();
        $("body").bind('touchmove', false);
	}
	else{
        //stop
        stopTrial();
        saveDataBtn();
		$("body").bind('touchmove', true);
	}
}

function onCanvasBtn() {
	toggleShowAll();
    startAndStopTrial();
}