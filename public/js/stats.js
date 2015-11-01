function AddData() {
    alert('HI!');
    var x = document.getElementById("treffer").value;
    var y = document.getElementById("bezeichnung").value;
    var letters = '/^[a-zA-Z]+$/';
    if ((parseInt(x) != (x)) && (y == parseInt(y))) {
        alert("Wrong Value Entered");
    } else {
        var rows = "";
        var bezeichnung = document.getElementById("bezeichnung").value;
        var zeit = document.getElementById("zeit").value;
        var treffer = document.getElementById("treffer").value;
        var fehlversuch = document.getElementById("fehlversuch").value;

        rows += "<td>" + bezeichnung + "</td><td>" + zeit + "</td><td>" + treffer + "</td><td>" + fehlversuch + "</td>";
        var tbody = document.querySelector("#list tbody");
        var tr = document.createElement("tr");

        tr.innerHTML = rows;
        tbody.appendChild(tr)

        //
    }
}

function ResetForm() {
    document.getElementById("eingabeForm").reset();
}