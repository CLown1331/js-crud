(function() {
    'use strict';

    var modal = document.getElementsByClassName("modal")[0];

    var createButton = document.getElementById("createButton");
    
    var prevButton = document.getElementById("prev");

    var nextButton = document.getElementById("next");

    var span = document.getElementsByClassName("close")[0];
    
    var table = document.getElementsByTagName('table')[0];

    var phonebook;

    var pagination = 0;

    (function() {
        phonebook = window.localStorage.getItem('phonebook');
        if(!phonebook) {
            phonebook = [];
        } else {
            phonebook = JSON.parse(phonebook);
        }
    })();

    function deleteData(item) {
        console.log(item);
        if( !confirm("Delete This Data? " + "Name: " + phonebook[item].firstname + " " + phonebook[item].lastname + ", Phonenumber: " + phonebook[item].phonenumber ) ) {
            return;
        }
        phonebook.splice(item, 1);
        window.localStorage.setItem('phonebook', JSON.stringify(phonebook));
        populateList(phonebook);
    }

    function editData(item) {
        modal.style.display = "block";
        let previousValues = [];
        for (let key in phonebook[item]) {
            previousValues.push(phonebook[item][key]);
        }
        for (let i=0; i<previousValues.length; i++ ) {
            document.forms[0].elements[i].value = previousValues[i];
        }
        document.forms[0].onsubmit = function(event) {
            event.preventDefault();
            modal.style.display = "none";
            phonebook[item] = getFormData(document.forms[0].elements);
            window.localStorage.setItem('phonebook', JSON.stringify(phonebook));
            populateList(phonebook);
        }
    }

    function populateList(list) {
        table.innerHTML = `<tr> <td> First Name </td> <td> Last Name </td> <td> Phone Number </td> <td> Address </td> <td> Action </td> </tr>`;
        for (let i = 0; i < phonebook.length; i++) {
            if (pagination > i || i >= pagination + 5) continue;
            table.innerHTML += `<tr> <td> ${phonebook[i].firstname} </td> <td> ${phonebook[i].lastname} </td> <td> ${phonebook[i].phonenumber} </td> <td> ${phonebook[i].address} </td> <td> <button class="editButton" > Edit </button> <button class="deleteButton"> Delete </button> </td> </tr>`
        }
        var editButtons = document.getElementsByClassName("editButton");
        var deleteButtons = document.getElementsByClassName("deleteButton");
        for (let i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].onclick = function( ) {
                deleteData(i);
            }
        }
        for (let i = 0; i < editButtons.length; i++) {
            editButtons[i].onclick = function( ) {
                editData(i);
            }
        }
    }

    populateList(phonebook);

    createButton.onclick = function() {
        modal.style.display = "block";
        document.forms[0].onsubmit = function(event) {
            event.preventDefault();
            modal.style.display = "none";
            phonebook.push(getFormData(document.forms[0].elements));
            window.localStorage.setItem('phonebook', JSON.stringify(phonebook));
            populateList(phonebook);
        }
    };

    nextButton.onclick = function() {
        if (pagination + 5 < phonebook.length) {
            pagination += 5;
        }
        populateList(phonebook);
    }

    prevButton.onclick = function() {
        if (pagination - 5 >= 0) {
            pagination -= 5;
        }
        populateList(phonebook);
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function getFormData(form) {
        let data = {};
        for (let element of form) {
            if ( element.type !== 'submit' ) {
                data[element.name] = element.value;
            }
        }
        return data;
    }    

})();