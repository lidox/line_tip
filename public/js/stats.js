
function addData() {
    try {
            var rows = "";
            var bezeichnung = document.getElementById("bezeichnung");
            var zeit = document.getElementById("versuchsdauer").innerHTML;
            var treffer = document.getElementById("treffer").innerHTML;
            var fehlversuche = document.getElementById("fehlversuche").innerHTML;
            var versuchszeitpunkt = document.getElementById("versuchszeitpunkt").innerHTML;

            rows += "<td>" + bezeichnung.value + "</td><td>" + zeit + "</td><td>" + treffer + "</td><td>" + fehlversuche + "</td><td>" + versuchszeitpunkt + "</td>";
            var tbody = document.querySelector("#list tbody");
            var tr = document.createElement("tr");

            tr.innerHTML = rows;
            tbody.appendChild(tr)
            resetForm();
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