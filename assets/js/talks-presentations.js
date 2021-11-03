document.addEventListener('DOMContentLoaded', function(event){
    var modal = document.querySelector('.modal-window');
    var btnOpen = document.querySelector('.link');
    var btnClose = document.querySelector('.close');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.visiblity = "hidden";
            modal.style.opacity = "0";
            modal.style.pointerEvents= "none";
            console.log('clicked');
        }
        if(event.target == btnClose){
            modal.style.visiblity = "hidden";
            modal.style.opacity = "0";
            modal.style.pointerEvents= "none";
            console.log('click');
        }
        if(event.target == btnOpen){
            modal.style.visibility = "visible";
            modal.style.opacity = "1";
            modal.style.pointerEvents="auto";
            console.log('click');
        }
    }
});