/*
 obsolete, because maybe we don't want to show data everytime a patient is doing the test. Could be some sort of
 psychological problem if he could figure out he/she is failing. Maybe move the whole statistics stuff to the mainpage?
 */
function addData() {
    try {
        var rows = "";
        var bezeichnung = document.getElementById("bezeichnung");
        var zeit = document.getElementById("versuchsdauer").innerHTML;
        var treffer = document.getElementById("treffer").innerHTML;
        var fehlversuche = document.getElementById("fehlversuche").innerHTML;
        var versuchszeitpunkt = document.getElementById("versuchszeitpunkt").innerHTML;
        if(!isEmpty(bezeichnung.value) && !isEmpty(zeit)){
            rows += "<td>" + bezeichnung.value + "</td><td>" + zeit + "</td><td>" + treffer + "</td><td>" + fehlversuche + "</td><td>" + versuchszeitpunkt + "</td>";
            var tbody = document.querySelector("#list tbody");
            var tr = document.createElement("tr");

            tr.innerHTML = rows;
            tbody.appendChild(tr);
            resetForm();
        }
        else if(isEmpty(zeit)){
            alert("Bitte erst einen Versuch durchführen, stoppen und dann speichern.");
        }
        else{
            alert("Bitte eine Bezeichnung für diesen Versuch angeben.");
        }
    }catch(err) {
        console.log(err.message);
    }
}
/*
 Load the Cookies values and change the Headline of the Table.
 Cookies are loaded as JSON Data, so we can iterate over each object by itself.
 Build a variable @tableRow for each set of records
 The "replace" function is there to accomodate the JSON.stringify - normally it would print with double quotes
 */
function lickCookie() {
    var patient = document.getElementById("bezeichnung").value;
    var heading = $('#patient');
    if (patient) {
        try {
            var name = $.parseJSON($.cookie(patient));
        } catch (e) {
            //console.log(e);
            //console.log('Something went wrong');
            heading.text('Patient wurde noch nicht angelegt');
            return;
        }

        var tableRow = '';
        heading.text('MED-ID: ' + name[0]);
        for (i = 1; i < name.length; i++) {
            tableRow += '<tr>';
            $.each(name[i], function (key, value) {
                $.each(value, function (index, data) {
                    tableRow += '<td>' + JSON.stringify(data).replace(/"/g, "") + '</td>';
                });
            });
            tableRow += '</tr>';
        }
        $('#list').find('tr:last').after(tableRow);
    }
}
/*
 Simple Button function for the "Laden" button. Better separate the code, so we can easily switch the functions that
 are being executed on a click
 */
function loadDataBtn() {
    $('#list').find('tbody').children('tr:not(:first)').remove();
    lickCookie();
}
/*
 Does a validation before saving the cookie
 */
function isUserInputCorrect() {
    var timeStamp = document.getElementById("versuchsdauer").innerHTML;
    var description = document.getElementById("bezeichnung").value;
    if(isEmpty(description)){
        var result = prompt("Bitte die MED-ID für diesen Versuch angeben.");
        document.getElementById('bezeichnung').value = result; 
        if(isEmpty(result)){
            isUserInputCorrect();
        }
    }
    return (!isEmpty(timeStamp));

}

/*
 Simple Button function for the "Speichern" button. Better separate the code, so we can easily switch the functions that
 are being executed on a click
 */
function saveDataBtn() {
    if (isUserInputCorrect()) {
        if ($.cookie(document.getElementById("bezeichnung").value)) {
            bakeCookie(0);
        } else {
            bakeCookie(1);
        }
        //resetForm();
    } else {
       console.log('wrong input');
       alert("Bitte erst einen Versuch durchführen, stoppen und dann speichern.");
    }  
}
/*
 Baking a cookie. Everybody loves cookies, especially the ones with chocolate Chips ;). Chokolate Chips tell the
 function to create a new Patient - we could check for another cookie with the same name, but ... meh. We don't want
 to overthink it, do we?

 If the patient already exists we push a new set of records to the end of the list and save it again. New records
 can be added easily by cloning a line in the variable @values
 */
function bakeCookie(chocolateChips) {
    var patient = document.getElementById("bezeichnung").value;
    if (chocolateChips) {
        var name = [patient];
    } else {
        try {
            var name = $.parseJSON($.cookie(patient));
        } catch (e) {
            console.log(e);
            console.log('Something went wrong');
            return;
        }
    }
    var values = [
        //{'id':new Date(document.getElementById("id").innerHTML).getTime().toString()},
        {'zei': document.getElementById("versuchsdauer").innerHTML},
        {'tre': document.getElementById("treffer").innerHTML},
        {'feh': document.getElementById("fehlversuche").innerHTML},
        {'pun': document.getElementById("versuchszeitpunkt").innerHTML}
    ];
    name.push(
        values
    );
    $.cookie(patient, JSON.stringify(name));
}
/*
 Unused - why do we need it? We could move the whole statistics part to the main page.
 */
function resetForm() {
    //ocument.getElementById("eingabeForm").reset();
    printToHTMLById("versuchsdauer","");
    printToHTMLById("treffer","");
    printToHTMLById("fehlversuche","");
    printToHTMLById("versuchszeitpunkt","");
}
/*
 Unused, because we don't use "addData" function anymore
 */
function isEmpty(stringToCheck) {
    return (stringToCheck == null || stringToCheck.length === 0);
}
/*
 Artur needs to step up his game. Use the Prototypes, man!
 */
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