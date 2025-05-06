var modal = document.querySelectorAll('.modal-window');
var talkPresentationModal = document.querySelector("#open-modal")
var btnOpen = document.querySelector('.link');
var btnClose = document.querySelectorAll('.close');
var recordingLink = document.querySelectorAll('.recording-link')
var n = recordingLink.length;

window.addEventListener("click", (event)=> {
    if(event.target == talkPresentationModal){
        talkPresentationModal.style.visibility = "hidden";
       }
})

for(let i=0;i<n;i++){
    btnClose[i].addEventListener('click', ()=> {
        modal[i].style.visibility = "hidden";
        modal[i].style.opacity = "0";
        modal[i].style.pointerEvents= "none";
        let iframeTEST = modal[i].childNodes[1].childNodes[5].childNodes[1];
        let src = iframeTEST.src;
        iframeTEST.src = src;
    });

    recordingLink[i].addEventListener('click', ()=> {
        modal[i+1].style.visibility = "visible";
        modal[i+1].style.opacity = "1";
        modal[i+1].style.pointerEvents="auto";
    });
}

// no of recordingLink = n and no of modals = n+1; 
// n+1 because of the one on top apart from the table
// nth modal (0 indexed) is not traversed in the loop because if we do that we would also have to traverse nth recording link which is not present and an error would appear on console.

btnClose[n].addEventListener('click', ()=> {
    modal[n].style.visibility = "hidden";
    modal[n].style.opacity = "0";
    modal[n].style.pointerEvents= "none";
    let iframeTEST = modal[n].childNodes[1].childNodes[5].childNodes[1];
    let src = iframeTEST.src;
    iframeTEST.src = src;
});

btnOpen.addEventListener('click', ()=> {
    modal[0].style.visibility = "visible";
    modal[0].style.opacity = "1";
    modal[0].style.pointerEvents="auto";
});
