(function() {
    'use strict';

    var modal = document.getElementsByClassName("modal")[0];

    var createButton = document.getElementById("createButton");
    
    var span = document.getElementsByClassName("close")[0];

    createButton.onclick = function() {
        modal.style.display = "block";
    };

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.forms[0].onsubmit = function(event) {
        event.preventDefault();
        modal.style.display = "none";
    }

})();