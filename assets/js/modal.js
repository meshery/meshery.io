var modal = document.querySelector('.modal-window');
var btnOpen = document.querySelector('.link.recording-link');
var btnClose = document.querySelector('.close');
console.log(modal);
console.log(btnOpen);
console.log(btnClose);
modal.addEventListener('click',function(){
    modal.style.visiblity = "hidden";
    modal.style.opacity = "0";
    modal.style.pointerEvents= "none";

});
btnClose.addEventListener('click',function(){
    modal.style.visiblity = "hidden";
    modal.style.opacity = "0";
    modal.style.pointerEvents= "none";
});

btnOpen.addEventListener('click',function(){
    console.log("click");
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
    modal.style.pointerEvents="auto";
});