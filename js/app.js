(function() {
    'use strict';

    var modal = Document.getElementsByClassName("modal")[0];

    var createButton = Document.getElementsById("creatButton");
    debugger;
    createButton.onClick = function() {
        modal.style.display = "block";
    };

})();