document.addEventListener('DOMContentLoaded', function(event){
    var modal = document.querySelectorAll('.modal-window');
    var btnOpen = document.querySelector('.link');
    var btnClose = document.querySelectorAll('.close');
    var recordingLink = document.querySelectorAll('.recording-link')
    // recordingLink = recordingLink.unshift(btnOpen);
    console.log(recordingLink);
    window.onclick = function(event) {
        for(let i=0;i<modal.length;i++){
            if (event.target == modal[i+1]) {
                modal[i+1].style.visiblity = "hidden";
                modal[i+1].style.opacity = "0";
                modal[i+1].style.pointerEvents= "none";
                console.log('clicked');
            }
            if(event.target == btnClose[i+1]){
                modal[i+1].style.visiblity = "hidden";
                modal[i+1].style.opacity = "0";
                modal[i+1].style.pointerEvents= "none";
                console.log('click');
            }
            
            if(event.target == recordingLink[i]){
                modal[i+1].style.visibility = "visible";
                modal[i+1].style.opacity = "1";
                modal[i+1].style.pointerEvents="auto";
                console.log('click');
            }
        }

        if(event.target == btnOpen){
            modal[0].style.visibility = "visible";
            modal[0].style.opacity = "1";
            modal[0].style.pointerEvents="auto";
            console.log('click');
        }
        if (event.target == modal[0]) {
            modal[0].style.visiblity = "hidden";
            modal[0].style.opacity = "0";
            modal[0].style.pointerEvents= "none";
            console.log('clicked');
        }
        if(event.target == btnClose[0]){
            modal[0].style.visiblity = "hidden";
            modal[0].style.opacity = "0";
            modal[0].style.pointerEvents= "none";
            console.log('click');
        }
        
    }
});