document.addEventListener('DOMContentLoaded', function(event){
    var modal = document.querySelector('.modal-window');
    var btnOpen = document.querySelector('.link');
    var btnClose = document.querySelector('.close');
    var iframe = document.getElementById('#iframe');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.visiblity = "hidden";
            modal.style.opacity = "0";
            modal.style.pointerEvents= "none";
            // Resets the src so that the video stops playing
            var iframeSrc = iframe.src;
		    iframe.src = iframeSrc;
        }
        if(event.target == btnClose){
            modal.style.visiblity = "hidden";
            modal.style.opacity = "0";
            modal.style.pointerEvents= "none";
            // Resets the src so that the video stops playing
            console.log(btnClose);
            // var iframeSrc = iframe.src;
		    // iframe.src = iframeSrc;
        }
        if(event.target == btnOpen){
            modal.style.visibility = "visible";
            modal.style.opacity = "1";
            modal.style.pointerEvents="auto";
            console.log("Hello");
        }
    }
});