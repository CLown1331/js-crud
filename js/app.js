(function() {
    'use strict';

    var modal = document.getElementsByClassName("modal")[0];

    var createButton = document.getElementById("createButton");
    
    createButton.onclick = function() {
        modal.style.display = "block";
    };

})();