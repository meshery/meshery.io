var modal = document.querySelector('.modal-window');
var btn = document.querySelector('.link');
var btnClose = document.querySelector('.close');
modal.addEventListener('click',function(){
    modal.style.visiblity = "hidden";
    modal.style.opacity = "0";
    modal.style.pointerEvents= "none";
    console.log('click');
});
btnClose.addEventListener('click',function(){
    modal.style.visiblity = "hidden";
    modal.style.opacity = "0";
    modal.style.pointerEvents= "none";
    console.log('click');
});
btn.addEventListener('click',function(){
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
    modal.style.pointerEvents="auto";
    console.log('click');
    });
    