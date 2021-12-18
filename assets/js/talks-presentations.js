var modal = document.querySelectorAll('.modal-window');
var btnOpen = document.querySelector('.link');
var btnClose = document.querySelectorAll('.close');
var recordingLink = document.querySelectorAll('.recording-link')
var n = recordingLink.length;

for(let i=0;i<n;i++){
    modal[i].addEventListener('click',function(){
        modal[i].style.visiblity = "hidden";
        modal[i].style.opacity = "0";
        modal[i].style.pointerEvents= "none";

    });

    btnClose[i].addEventListener('click',function(){
        modal[i].style.visiblity = "hidden";
        modal[i].style.opacity = "0";
        modal[i].style.pointerEvents= "none";
    });

    recordingLink[i].addEventListener('click',function(){
        modal[i+1].style.visibility = "visible";
        modal[i+1].style.opacity = "1";
        modal[i+1].style.pointerEvents="auto";
    });
}


// no of recordingLink = n and no of modals = n+1; 
// n+1 because of the one on top apart from the table
// nth modal (0 indexed) is not traversed in the loop because if we do that we would also have to traverse nth recording link which is not present and an error would appear on console.

modal[n].addEventListener('click',function(){
    modal[n].style.visiblity = "hidden";
    modal[n].style.opacity = "0";
    modal[n].style.pointerEvents= "none";

});
btnClose[n].addEventListener('click',function(){
    modal[n].style.visiblity = "hidden";
    modal[n].style.opacity = "0";
    modal[n].style.pointerEvents= "none";
});

btnOpen.addEventListener('click',function(){
    modal[0].style.visibility = "visible";
    modal[0].style.opacity = "1";
    modal[0].style.pointerEvents="auto";
});
