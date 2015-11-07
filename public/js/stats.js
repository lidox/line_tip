
function addData() {
    try {
        var rows = "";
        var bezeichnung = document.getElementById("bezeichnung");
        var zeit = document.getElementById("versuchsdauer").innerHTML;
        var treffer = document.getElementById("treffer").innerHTML;
        var fehlversuche = document.getElementById("fehlversuche").innerHTML;
        var versuchszeitpunkt = document.getElementById("versuchszeitpunkt").innerHTML;
        if(!isEmpty(bezeichnung.value)){
            rows += "<td>" + bezeichnung.value + "</td><td>" + zeit + "</td><td>" + treffer + "</td><td>" + fehlversuche + "</td><td>" + versuchszeitpunkt + "</td>";
            var tbody = document.querySelector("#list tbody");
            var tr = document.createElement("tr");

            tr.innerHTML = rows;
            tbody.appendChild(tr)
            resetForm();   
        }
        else if(isEmpty(zeit)){
            alert("Bitte erst einen Versuch durchführen, stoppen und dann hinzufügen.");
        }
        else{
            alert("Bitte eine Bezeichnung für diesen Versuch angeben.");
        }
    }catch(err) {
        console.log(err.message);
    }
}

function resetForm() {
    document.getElementById("eingabeForm").reset();
    printToHTMLById("versuchsdauer","");
    printToHTMLById("treffer","");
    printToHTMLById("fehlversuche","");
    printToHTMLById("versuchszeitpunkt","");
}

function isEmpty(stringToCheck) {
    return (stringToCheck == null || stringToCheck.length === 0);
}

//trial
var Trial = function (description, trialTime, hits, fails) {
    this.description = description;
    this.hits = hits;
    this.fails = fails;
    this.trialTime = trialTime;
    this.timeStamp = new Date().getTime();
};

Trial.prototype.getDescription = function() {
  return this.description;
};

Trial.prototype.getHits = function() {
    return this.hits;
};

Trial.prototype.getFails = function() {
    return this.fails;
};

Trial.prototype.getTrialTime = function() {
    return this.trialTime;
};

Trial.prototype.getTimeStamp = function() {
    return this.timeStamp;
};