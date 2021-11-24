// document.addEventListener('DOMContentLoaded', function(event){
    var modal = document.querySelectorAll('.modal-window');
    var btnOpen = document.querySelectorAll('.link');
    var btnClose = document.querySelectorAll('.close');
    var iframe = document.querySelectorAll('iframe')
    var cont = document.querySelectorAll('.talks')


    console.log(cont);
    for(i=0;i<cont.length;i++){
        console.log(cont[i]);
        if(i%2!=0){
            cont[i].style.flexDirection = "row-reverse";
        }
    }
    console.log(modal);
    for(let i in modal){
        console.log(modal[i]);
    modal[i].addEventListener('click',function(){
        modal[i].style.visiblity = "hidden";
        modal[i].style.opacity = "0";
        modal[i].style.pointerEvents= "none";
        src = iframe[i].getAttribute('src');
        iframe[i].setAttribute('src', '');
        iframe[i].setAttribute('src',src);
        console.log('clicked outside');

    });
    btnClose[i].addEventListener('click',function(){
        modal[i].style.visiblity = "hidden";
        modal[i].style.opacity = "0";
        modal[i].style.pointerEvents= "none";
        console.log('clicked btn');
    });
    btnOpen[i].addEventListener('click',function(){
        modal[i].style.visibility = "visible";
        modal[i].style.opacity = "1";
        modal[i].style.pointerEvents="auto";
        console.log('click btn open');
        console.log(modal);
    });
    }
// });