function supports_history_api() {
   return !!(window.history && history.pushState);
}


function swapPhoto(href) {
  var req = new XMLHttpRequest();
  req.open("GET",
           "http://localhost:8000/gallery" +
             href.split("/").pop(),
           false);
  req.send(null);
  if (req.status == 200) {
    document.getElementById("gallery").innerHTML = req.responseText;
    setupHistoryClicks();
    return true;
  }
  return false;
}

function addClicker(link) {
  link.addEventListener("click", function(e) {
    console.log("addCLicker 1");
    if (swapPhoto(link.href)) {
       console.log("addCLicker 2");
      history.pushState(null, null, link.href);
       console.log("addCLicker 3");
      e.preventDefault();
       console.log("addCLicker 4");
    }
  }, true);
}

function setupHistoryClicks() {
    console.log("s1");
  addClicker(document.getElementById("photonext"));
    console.log("s2");
  addClicker(document.getElementById("photoprev"));
}

window.onload = function() {
  console.log("1");
  if (!supports_history_api()) { return; }
  setupHistoryClicks();
  console.log("2");
  window.setTimeout(function() {
    console.log("3");
    window.addEventListener("popstate", function(e) {
      console.log("4");
      swapPhoto(location.pathname);
      console.log("5");
    }, false);
  }, 1);
}

