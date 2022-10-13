var loadedaudio = document.getElementById('main-audio');

var current = 0;
var playing = false;
var unplayed = true;

//document.getElementById('play-button').addEventListener('click', playPause(), false);



function playPause() {     
    if (loadedaudio.paused) {
        loadedaudio.play();
        playing = true;
    } else {
        loadedaudio.pause();
        playing = false;
    }
    updatePlayPauseButton();
    
    trackcolours[current].classList.add('selected-track');
    
    matchLyricBoxTitles();
}

function updatePlayPauseButton() {
    if (loadedaudio.paused) {
        document.getElementById('play-button').style.backgroundImage = 'url(assets/transpixelbutton-play.png)';
        document.getElementById('tabicon').setAttribute('href', 'assets/pause-button.png');
    } else {
        document.getElementById('play-button').style.backgroundImage = 'url(assets/transpixelbutton-pause.png)';
        document.getElementById('tabicon').setAttribute('href', 'assets/play-button.png');
    }
}

function nextTrack() {
    if (current === tracks.length - 1) {
        trackcolours[current].classList.remove('selected-track');
        current = 0;
        loadedaudio.pause();
        playing = false;
        updatePlayPauseButton();
    } else {
        trackcolours[current].classList.remove('selected-track');
        current++;
        trackcolours[current].classList.add('selected-track');
    }
    loadedaudio.src = tracks[current].url;
    
    if (playing === true) {
        loadedaudio.play();
        
    } 
    
    
    
    matchLyricBoxTitles();
}

loadedaudio.addEventListener('ended', nextTrack, false);

function prevTrack() {
    if (current === 0) {
        current = current;
    } else {
        trackcolours[current].classList.remove('selected-track');
        current--;
        trackcolours[current].classList.add('selected-track');
    }
    loadedaudio.src = tracks[current].url;
    if (playing === true) {loadedaudio.play();} 
    
    matchLyricBoxTitles();
}

document.getElementById('ff-button').addEventListener('mousedown', fastForwardFunc, false);
document.getElementById('ff-button').addEventListener('mouseup', normalSpeedFunc, false);
document.getElementById('ff-button').addEventListener('mouseout', normalSpeedFunc, false);
document.getElementById('rev-button').addEventListener('mousedown', fastBackwardFunc, false);
document.getElementById('rev-button').addEventListener('mouseup', normalSpeedFunc, false);
document.getElementById('rev-button').addEventListener('mouseout', normalSpeedFunc, false);

function fastForwardFunc() {
    loadedaudio.playbackRate = 4.0;
}

var reverser;
var reversecount = 0;

function normalSpeedFunc() {
    loadedaudio.playbackRate = 1.0;
    clearInterval(reverser)
}

function fastBackwardFunc() {
    //loadedaudio.playbackRate = -2.0;
    reverser = setInterval(function() {
        loadedaudio.currentTime -= 0.1;
    }, 20)
}









//var music = document.getElementById('music'); // id for audio element
var duration = loadedaudio.duration; // Duration of audio clip, calculated here for embedding purposes
//var pButton = document.getElementById('pButton'); // play button
var scrubhead = document.getElementById('scrubhead'); // playhead
var scrubbar = document.getElementById('scrubbingbar'); // timeline
var scrubbarplayed = document.getElementById('scrubbingbarplayed');
//var scrubbarbuffed = document.getElementById('scrubbingbarbuffered');

var timereadout = document.getElementById('timereadout');

//timereadout.innerHTML = "0:00 / 0:00";

loadedaudio.addEventListener('onloadedmetadata', timeUpdate, false);

// timeline width adjusted for playhead
var scrubbarWidth = scrubbar.offsetWidth - scrubhead.offsetWidth;

// play button event listenter
//pButton.addEventListener("click", play);



// timeupdate event listener
loadedaudio.addEventListener("timeupdate", timeUpdate, false);

// makes timeline clickable
scrubbar.addEventListener("click", function(event) {
    movescrubhead(event);
    loadedaudio.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(event) {
    return (event.clientX - getPosition(scrubbar)) / scrubbarWidth;
}

// makes playhead draggable
scrubhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// Boolean value so that audio position is updated only when the playhead is released
var onscrubhead = false;

// mouseDown EventListener
function mouseDown() {
    onscrubhead = true;
    window.addEventListener('mousemove', movescrubhead, true);
    loadedaudio.removeEventListener('timeupdate', timeUpdate, false);
}

// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(event) {
    if (onscrubhead == true) {
        movescrubhead(event);
        window.removeEventListener('mousemove', movescrubhead, true);
        // change current time
        loadedaudio.currentTime = duration * clickPercent(event);
        loadedaudio.addEventListener('timeupdate', timeUpdate, false);
    }
    onscrubhead = false;
}
// mousemove EventListener
// Moves playhead as user drags
function movescrubhead(event) {
    var newMargLeft = event.clientX - getPosition(scrubbar);

    if (newMargLeft >= 0 && newMargLeft <= scrubbarWidth) {
        scrubhead.style.marginLeft = newMargLeft + "px";
        //spinningman.style.transform = "rotate(" + (((newMargLeft / scrubbarWidth) * 100) * 3.6) + "deg)";
        var converteddragtotime = (newMargLeft / scrubbarWidth) * duration;
//    timereadout.innerHTML = formatDuration(converteddragtotime) + " / " + formatDuration(duration); //update time readout as drag
        
    }
    if (newMargLeft < 0) {
        scrubhead.style.marginLeft = "0px";
        
    }
    if (newMargLeft > scrubbarWidth) {
        scrubhead.style.marginLeft = scrubbarWidth + "px";
    }
    scrubbarplayed.style.width = scrubhead.style.marginLeft;
    
}

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
    var playPercent = scrubbarWidth * (loadedaudio.currentTime / duration);
    scrubhead.style.marginLeft = playPercent + "px";
    if (loadedaudio.currentTime == duration) {
        playbutton.className = ""; //notsue what these two do
        playbutton.className = "play";
    }
    scrubbarplayed.style.width = playPercent + "px";
    //bufferupdatecheck
//    if (loadedaudio.buffered.end(0) < duration) {buffUpdate();}
    
    //time counter readout
//    timereadout.innerHTML = formatDuration(loadedaudio.currentTime) + " / " + formatDuration(duration); 

}



function formatDuration(xxxx) {// time formatting function
    yyyy = Math.floor(xxxx);
    seconds = yyyy % 60;
    minutes = (yyyy - seconds) / 60;
    if (seconds < 10) {seconds = "0" + seconds;}
    return minutes + ":" + seconds;
}

//buffering update event listener
//loadedaudio.addEventListener("canplay", buffUpdate, false);

//function buffUpdate() {
//    var buffPercent = scrubbarWidth * (loadedaudio.buffered.end(0) / duration);
//    scrubbarbuffed.style.width = (buffPercent - 2) + "px";
//}


// Gets audio file duration
loadedaudio.addEventListener("canplaythrough", function() {
    duration = loadedaudio.duration;
}, false);

// getPosition
// Returns elements left position relative to top-left of viewport
function getPosition(el) {
    return el.getBoundingClientRect().left;
}






var tracklinks = document.getElementsByClassName('svg-track-overlay');
var trackcolours = document.getElementsByClassName('svg-track-underlay');


//for (var x = 0; x < tracklinks.length; x++) {
//    console.log(tracklinks[x]);
//    tracklinks[x].addEventListener('click', trackSelect(x), false);
//}

for (var i = 0; i < tracklinks.length; i++) {

     (function(index){
        tracklinks[i].onclick = function(){
            
            if (unplayed == true && index == 0) {//first track play without reloading
            } else {
                loadedaudio.src = tracks[index].url;
            }
            
            unplayed = false;
            loadedaudio.play();
//            playFunc;//timeUpdate;
            
            //add colour highlight for next track
            for (var ii = 0; ii < trackcolours.length; ii++) {
                trackcolours[ii].classList.remove('selected-track');
            }
            trackcolours[index].classList.add('selected-track');
            
            playing = true;
            current = index;
            updatePlayPauseButton();
            matchLyricBoxTitles();
        }
    })(i);
}

//function remove

//
//function trackSelect(track) {
//    console.log(track);
//
//}

var tracktitlesinlyrics = document.getElementsByClassName('track-title');

function matchLyricBoxTitles() {
    for (var i = 0; i < tracktitlesinlyrics.length; i++) {
        tracktitlesinlyrics[i].classList.remove('currently-playing');
    }
    tracktitlesinlyrics[current].classList.add('currently-playing');
}



