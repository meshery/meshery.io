// get elements
var modal = document.querySelector('.video-modal');
var body = document.querySelector('body');
var btnOpen = document.querySelector('.link.recording-link');
var btnClose = document.querySelector('.close');
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const fullscreen = player.querySelector('.player__fullscreen');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const image =  player.querySelector('.player__fullscreen img');

btnClose.addEventListener('click',function(){
    modal.style.visiblity = "hidden";
    modal.style.opacity = "0";
    modal.style.pointerEvents= "none";
    body.style.overflow = "scroll";
    video.pause();
});

btnOpen.addEventListener('click',function(){
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
    body.style.overflow = "hidden";
    modal.style.pointerEvents = "auto";
});

// build functions
function togglePlay() {
    if (video.paused) {
        video.play();
        toggle.focus();
    } else {
        video.pause();
        toggle.focus();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    const sliderValue = this.value;
    this.setAttribute('title', sliderValue);
    video[this.name] = sliderValue;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function ChangeFullscreenIcon(){
    if (!document.webkitFullscreenElement && !document.fullscreenElement &&!document.mozFullScreen)
        image.src = "images/full-screen.png";
    else
        image.src = "images/normal-screen.png";
}

function toggleFullscreen() {
    ChangeFullscreenIcon()
    if (!document.webkitFullscreenElement && !document.fullscreenElement &&!document.mozFullScreen) {
        if (player.requestFullscreen) {
            player.requestFullscreen();
          } else if (player.webkitRequestFullscreen) { /* Safari */
            player.webkitRequestFullscreen();
          } else if (player.msRequestFullscreen) { /* IE11 */
            player.msRequestFullscreen();
          } 
    } 
    else{
        ChangeFullscreenIcon()
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }  
}




// event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('dblclick', toggleFullscreen);
fullscreen.addEventListener('click', toggleFullscreen);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
let mousedown = false;
progress.addEventListener('click', scrub);
document.addEventListener("webkitfullscreenchange",ChangeFullscreenIcon);
document.addEventListener("fullscreenchange",ChangeFullscreenIcon);
document.addEventListener("mozfullscreenchange",ChangeFullscreenIcon);
document.addEventListener("msfullscreenchange",ChangeFullscreenIcon);
