function CheckOnline() {
    var xhr = new XMLHttpRequest();
    var file = "http://www.example.com/singlepixel.gif";
    var randomNum = Math.round(Math.random() * 10000);
 
    xhr.open('HEAD', file + "?rand=" + randomNum, true);
    xhr.send();
     
    xhr.addEventListener("readystatechange", processRequest, false);
 
    function processRequest(e) {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 304) {
          alert("Online!");
        } else {
          alert("Offline!");
        }
      }
    }
}

//reference https://www.kirupa.com/html5/check_if_internet_connection_exists_in_javascript.htm