// Get the file name from the URL
let fileName = window.location.pathname.split("/").pop();

// Get the JSON file object from your data
let url = "https://raw.githubusercontent.com/disnos10/protect/main/approved.json";
let xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.send();
xhr.onload = function() {
  if (xhr.status === 200) {
    let data = JSON.parse(xhr.responseText);

    // Check if the file name matches any of the approved URLs in the JSON object
    if (data.approvedURLS[fileName]) {
      // The file is on the correct domain, load it normally
      let xhr2 = new XMLHttpRequest();
      xhr2.open("GET", data.approvedURLS[fileName], true);
      xhr2.send();
      xhr2.onload = function() {
        if (xhr2.status === 200) {
          // The file was loaded successfully, execute it as usual
          eval(xhr2.responseText);
        } else {
          // The file was not loaded successfully, show an error message
          console.log("The file could not be loaded. Please check the URL and try again.");
          window.location.href = "https://sigmasec.me/protect/errors/1.html";
        }
      };
    } else {
      // The file is not on the correct domain, redirect to a different page
      window.location.href = "https://sigmasec.me/protect/errors/2.html";
    }
  } else {
    // The JSON file was not loaded successfully, show an error message
    console.log("The JSON file could not be loaded. Please check the URL and try again.");
    window.location.href = "https://sigmasec.me/protect/errors/3.html";
  }
};
