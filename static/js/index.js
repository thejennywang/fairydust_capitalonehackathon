/* set all event listeners */
$(document).ready(function () {

  // Add event listeners etc.

  //  var myElem = document.getElementById('elem');
  //  console.log("ADD LISTENER");
  //  inputFile.addEventListener('change', myFunc, false);

});



function createGuid()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
