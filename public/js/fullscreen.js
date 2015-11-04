function togglefullscreen() {
      var out = document.getElementById('myCanvas');
      if (document.webkitIsFullScreen) {
          document.webkitCancelFullScreen();
      } else {
          out.webkitRequestFullScreen();
          zeichneGraph();
       }
 }