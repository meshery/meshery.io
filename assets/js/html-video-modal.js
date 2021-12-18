var modal = document.querySelector('.modal-window');
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
    video.pause();
});

btnOpen.addEventListener('click',function(){
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
    modal.style.pointerEvents = "auto";
});

// get elements


// build functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    // alternatively this can be written with a ternary operator
    /*
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    */
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

function toggleFullscreen() {
    if (!document.webkitFullscreenElement && !document.fullscreenElement &&!document.mozFullScreen) {
        if (player.requestFullscreen) {
            player.requestFullscreen();
          } else if (player.webkitRequestFullscreen) { /* Safari */
            player.webkitRequestFullscreen();
          } else if (player.msRequestFullscreen) { /* IE11 */
            player.msRequestFullscreen();
          } 
        image.src = "images/normal-screen.png";
    } 
    else{
        image.src = "images/full-screen.png"
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

fullscreen.addEventListener('click', toggleFullscreen);
video.addEventListener('dblclick', toggleFullscreen);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
