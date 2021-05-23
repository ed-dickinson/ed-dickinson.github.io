var loadedtime = new Date().getTime();

var mainTimer = setInterval(mainTimer, 10);
var maintimercount = 0;
function mainTimer() {
  document.getElementById("maintimer").innerHTML = (maintimercount / 100) + 's';
  maintimercount++; 
}


//set up slice colours
var slicecolourarray = ["#28989f", "#269eae", "#27a2c6", "#1e63e0", "#214fdf", "#391fa5", "#421679", "#4d246d", "#533b62"];
for (i = 0; i < slicecolourarray.length; i++) {
    var slice = document.createElement("div");
    slice.style.backgroundColor = slicecolourarray[i];
    slice.style.height = (100 / slicecolourarray.length) + 'vh';
    slice.style.opacity = 0;
    slice.classList.add('strips-slices') ;
    slice.style.top = (i * (100 / slicecolourarray.length)) + "vh";
    document.getElementById("intro-strips-container").appendChild(slice);
}

var slices = document.getElementsByClassName('strips-slices'); 

var sliceanimoffset = 20;
var sliceanimdelay = 600;
var sliceanimlength = 1;

var opacitycount = 0;
var opacityarray = [0,0,0,0,0,0,0,0,0];

var screenwidth = document.getElementById('size-finder').offsetWidth * 100;
var screenheight = document.getElementById('size-finder').offsetHeight * 100;
var animsquaresize = screenheight / 9;

var introjumpsquare = document.createElement("div");
introjumpsquare.style.height = animsquaresize + 'px';
introjumpsquare.style.width = animsquaresize + 'px';
introjumpsquare.classList.add('intro-jump-square');
document.getElementById("intro-squares-container").appendChild(introjumpsquare);
introJumpSquareAnim();

var introopenupcont = document.getElementById('intro-openup-container');
introopenupcont.style.borderRight = window.innerWidth / 4 + 'px solid black';
introopenupcont.style.borderLeft = window.innerWidth / 4 + 'px solid black';

for (var iou = 0; iou < 40; iou++) {
    var introopenupbar = document.createElement("div");
    introopenupbar.style.height = screenheight / 40 + 'px';
    introopenupbar.style.top = (screenheight / 40) * iou + 'px';
    introopenupbar.style.width = '100%';
    introopenupbar.classList.add('intro-openup-bar');
    introopenupcont.appendChild(introopenupbar);
}


//var intromainsquare = document.createElement("div");
//intromainsquare.style.height = animsquaresize + 'px';
//intromainsquare.style.width = animsquaresize + 'px'; 
//document.getElementById("intro-squares-container").appendChild(intromainsquare);

//var ijsBlackScreenStart = true;
//    if (ijsBlackScreenStart == true) {
        document.getElementById("intro-squares-container").style.backgroundColor = 'transparent';
//        ijsBlackScreenStart = false;
//    }
var introJumpSquareTiming = setInterval(introJumpSquareAnim, 1000);
function introJumpSquareAnim() {
    var timesinceload2 = (new Date().getTime()) - loadedtime;

    if (timesinceload2 > 9000) { 
        clearInterval(introJumpSquareTiming); 
//        console.log('introsquarescleared');
    }
    if (timesinceload2 > 6000) {
        var Xcoord = (screenwidth - (animsquaresize * 2)) * 0.5;
        var Ycoord = (screenheight - animsquaresize) * 0.5;
    } else if (timesinceload2 > 5500) {
        var Xcoord = (screenwidth - animsquaresize) * 0.5;
        var Ycoord = (screenheight - animsquaresize) * 0.5;
    } else {
        var Xcoord = (screenwidth - animsquaresize) * Math.random();
        var Ycoord = (screenheight - animsquaresize) * Math.random();
    }
//        console.log(Xcoord);
        introjumpsquare.style.borderLeft = Xcoord + 'px solid black';
        introjumpsquare.style.borderRight = (screenwidth - Xcoord) + 'px solid black';
        introjumpsquare.style.borderTop = Ycoord + 'px solid black';
        introjumpsquare.style.borderBottom = (screenheight - Ycoord) + 'px solid black';        
}


var glitchDelay = 7000; //7 seconds
var introsquarescontainer = document.getElementById("intro-squares-container");

var videos = document.getElementsByClassName('mock-video'); // CHANGE THIS TO JUST GRAB VIDEO TAGS

function glitchStart() {
//  setTimeout(() => console.log('test func'), 1000)
//  setTimeout(glitch1, 6000) 
    setTimeout(hideVideos(), 0)
    setTimeout(function(){
        introjumpsquare.style.width = (animsquaresize * 2) + 'px';
        for (var ii = 0; ii < 2; ii++) {
            var introjumpsquareglitchsides = document.createElement("div");
            introjumpsquareglitchsides.style.width = (animsquaresize / 1) + 'px';
            introjumpsquareglitchsides.classList.add('intro-jump-square-glitch-sides');
            document.getElementsByClassName("intro-jump-square")[0].appendChild(introjumpsquareglitchsides);
        }
    }, 6000)
    setTimeout(function(){
        for (var jj = 0; jj < 4; jj++) {
            var ijsglitchbars = document.createElement("div");
            ijsglitchbars.style.top = ((animsquaresize / 4) * jj) + 'px';
            ijsglitchbars.classList.add('intro-jump-square-glitch-bars');
            document.getElementsByClassName("intro-jump-square")[0].appendChild(ijsglitchbars);
        }
    }, 6500)
  setTimeout(glitch7s, 7100) 
  setTimeout(glitch8s, 8000) 
  setTimeout(showVideos, 8000)
  setTimeout(glitch9s, 9000) 
  
  setTimeout(() => document.getElementById('skip-button').style.display = 'none', 9000)
}
//function glitch1() {
//  var slices = document.getElementsByClassName('intro-main-square-slices');
//  for (i = 0; i < slices.length; i++) {
//    slices[i].style.backgroundColor = "HSL(120, 2%, 78%)";
//  }
//  document.getElementsByClassName("intro-main-square")[0].style.backgroundColor = 'hsla(120,2%,78%,0)';
//}
function glitch7s() {
//    document.getElementById('main-title-static').style.display = 'none';
//    document.getElementById('main-title-glitch').style.display = 'block';
    document.getElementsByClassName('split-title-static-right')[0].style.display = 'none';
    document.getElementsByClassName('split-title-static-left')[0].style.display = 'none';
    document.getElementsByClassName('split-title-glitch-right')[0].style.display = 'block';
    document.getElementsByClassName('split-title-glitch-left')[0].style.display = 'block';
}
function glitch8s() {
  introsquarescontainer.style.display = 'none';
}
function glitch9s() {
//    document.getElementById('main-title-static').style.display = 'block';
//    document.getElementById('main-title-glitch').style.display = 'none';
    document.getElementsByClassName('split-title-static-right')[0].style.display = 'block';
    document.getElementsByClassName('split-title-static-left')[0].style.display = 'block';
    document.getElementsByClassName('split-title-glitch-right')[0].style.display = 'none';
    document.getElementsByClassName('split-title-glitch-left')[0].style.display = 'none';
}
glitchStart();

function hideVideos() {
     for (var vv = 0; vv < videos.length; vv++) {
        videos[vv].style.opacity = 0;
    }
}

function showVideos() {
    for (var vv = 0; vv < videos.length; vv++) {
        videos[vv].style.opacity = 1;
    }
}

var glitchcounter = 0;
var introstrips = document.getElementsByClassName('strips-slices');
var id = setInterval(glitchAnim, 10);
function glitchAnim() {
    var timesinceload = (new Date().getTime()) - loadedtime;
    if (timesinceload > 9000) { clearInterval(id);  }

    if (timesinceload > 8000) {
        document.getElementById('intro-strips-container').style.display = 'none';
        document.getElementById('intro-openup-container').style.display = 'none';
    } else if (timesinceload > 7777) {
        document.getElementById('intro-strips-container').style.display = 'block';
        introjumpsquare.style.display = 'block';
        introjumpsquare.style.backgroundColor = 'black';
    } else if (timesinceload > 7500) {
//        introjumpsquare.style.display = 'none';
        introjumpsquare.style.backgroundColor = 'transparent';
//        introjumpsquare.style.height = '100%';
//        introjumpsquare.style.borderTop = '0px';
//        introjumpsquare.style.borderBottom = '0px';
    } else if (timesinceload > 7222){
        document.getElementById('intro-strips-container').style.display = 'none';
        introjumpsquare.style.display = 'none';
        introjumpsquare.style.backgroundColor = 'transparent';
        document.getElementById('intro-openup-container').style.display = 'block';
    } else if (timesinceload > 7000) {
        document.getElementById('intro-openup-container').style.display = 'block';
        introjumpsquare.style.backgroundColor = 'black';
    } else if (timesinceload > 6777) {
        introjumpsquare.style.backgroundColor = 'black';
    }
    if (timesinceload > 7000) {
        for (i = 0; i < introstrips.length; i++) {
            introstrips[i].style.opacity = 1;
        }
    }
    
}

function skip() {
    console.log('skipped');
    document.getElementById('maintimer').style.display = 'none';
    document.getElementById('intro-strips-container').style.display = 'none';
    document.getElementById('intro-squares-container').style.display = 'none';
    document.getElementById('intro-openup-container').style.display = 'none';
    clearInterval(id);
    document.getElementById('skip-button').style.display = 'none';
    showVideos();
    
}

function hourlyGlitch() {
    setTimeout(function(){
        for (i = 0; i < introstrips.length; i++) {
            introstrips[i].style.opacity = 1;
        }
        document.getElementById('intro-openup-container').style.display = 'block';
        introjumpsquare.style.backgroundColor = 'black';
    }, 0)
    setTimeout(glitch7s, 100) 
    setTimeout(function(){
        document.getElementById('intro-strips-container').style.display = 'none';
        introjumpsquare.style.display = 'none';
        introjumpsquare.style.backgroundColor = 'transparent';
        document.getElementById('intro-openup-container').style.display = 'block';
    }, 222)
    setTimeout(function(){
        introjumpsquare.style.backgroundColor = 'transparent';
    }, 500)
    setTimeout(function(){
        document.getElementById('intro-strips-container').style.display = 'block';
        introjumpsquare.style.display = 'block';
        introjumpsquare.style.backgroundColor = 'black';
    }, 777)
    setTimeout(function(){
        document.getElementById('intro-strips-container').style.display = 'none';
        document.getElementById('intro-openup-container').style.display = 'none';
    }, 999)
    setTimeout(glitch8s, 1000) 
    setTimeout(glitch9s, 2000)
}