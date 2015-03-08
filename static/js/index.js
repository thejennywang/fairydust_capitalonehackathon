/* set all event listeners */
$(document).ready(function () {

    var inputFile = document.getElementById('inputFile');
    console.log("ADD LISTENER");
    inputFile.addEventListener('change', uploadToAstra, false);

});


var uploadFromComp = function (ev) {
    var files = ev.target.files;
    var maxSize = 10000000;
    //TODO: implement multiple file upload on the server

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();

        reader.onload = (function (theFile) {
            return function (e) {
                if (file.size < maxSize) {
                    var formData = new FormData();
                    formData.append('file', file);
                    $.ajax({
                        url: '/addvideo',
                        type: 'POST',
                        data: formData,
                        mimeType: "multipart/form-data",
                        contentType: false,
                        cache: false,
                        processData: false,
                        success: function (data, textStatus, jqXHR) {
                          console.log("done");
                        },
                        error: function (file, textStatus, jqXHR) {
                            console.log('file error');
                        }
                    });
                } else {
                    console.log("Videos and images must be smaller than 10MB. Select a different file and try again!");
                }
            };
        })(file);

        reader.readAsDataURL(file);
    }
};


var uploadToAstra = function (ev) {
  console.log("CALLED uploadToAstra");
    var files = ev.target.files;
    var maxSize = 10000000;
    //TODO: implement multiple file upload on the server

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();
        var ext = file.name.split('.').pop();
        $.get('/getastra', function(astraKey){

          var objectVideoName = createGuid() + '-' + file.name;

          reader.onload = (function (theFile) {
              return function (e) {
                  if (file.size < maxSize) {
                      var formData = new FormData();
                      formData.append('name', objectVideoName);
                      formData.append('type', 'video');
                      formData.append('content', 'application/' + ext);
                      formData.append('file', file);

                      //this demo is uploading to the sampleVideos bucket

                      $.ajax({
                            xhr: function() {
                            var xhr = new window.XMLHttpRequest();

                            xhr.upload.addEventListener("progress", function(evt) {
                              if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                percentComplete = parseInt(percentComplete * 100);

                                console.log(percentComplete);
                                $( "#uploadStatus" ).text("Upload in progress.");
                                $( "#uploadProgress" ).attr("value", percentComplete);

                                if (percentComplete === 100) {

                                }

                              }
                            }, false);

                            return xhr;
                          },
                          url: 'https://api.astra.io/v0/bucket/sampleVideos/object',
                          type: 'POST',
                          beforeSend: function (request)
                          {
                              request.setRequestHeader("Astra-Secret", astraKey);
                          },
                          data: formData,
                          mimeType: "multipart/form-data",
                          contentType: false,
                          cache: false,
                          processData: false,
                          success: function (data, textStatus, jqXHR) {
                            $( "#uploadStatus" ).text("Upload completed.");
                            console.log("file upload done");
                          },
                          error: function (file, textStatus, jqXHR) {
                            $( "#uploadStatus" ).text("Upload Error.");
                              console.log('file upload error');
                          }
                      });
                  } else {
                      $(".fileError").text("Videos and images must be smaller than 10MB. Select a different file and try again!");
                  }
              };
          })(file);

      });

        reader.readAsDataURL(file);
    }
};


function createGuid()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
