      // Get the modal
      var Helpmodal = document.getElementById("myModal");

      // Get the button that opens the modal
      var button = document.getElementById("myBtn");
      
      var Closespan = document.getElementsByClassName("closed")[0];
      
      button.onclick = function() {
        Helpmodal.style.display = "flex";
      }
      
      // When the user clicks on <span> (x), close the modal
      Closespan.onclick = function() {
        Helpmodal.style.display = "none";
      }
      
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == Helpmodal) {
          Helpmodal.style.display = "none";
        }
      }