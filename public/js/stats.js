function addData() {
    //alert('HI!');
    try {
        var x = document.getElementById("treffer").value;
        var y = document.getElementById("bezeichnung").value;
        var letters = '/^[a-zA-Z]+$/';
        if ((parseInt(x) != (x)) && (y == parseInt(y))) {
            alert("Wrong Value Entered");
        } else {
            var rows = "";
            var bezeichnung = document.getElementById("bezeichnung");
            var zeit = document.getElementById("zeit");
            var treffer = document.getElementById("treffer");
            var fehlversuch = document.getElementById("fehlversuch");

            rows += "<td>" + bezeichnung.value + "</td><td>" + zeit + "</td><td>" + treffer + "</td><td>" + fehlversuch + "</td>";
            var tbody = document.querySelector("#list tbody");
            var tr = document.createElement("tr");

            tr.innerHTML = rows;
            tbody.appendChild(tr)
        }
    }catch(err) {
        console.log(err.message);
    }
}

function resetForm() {
    document.getElementById("eingabeForm").reset();
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