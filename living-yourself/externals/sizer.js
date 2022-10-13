var clicksContainer = document.getElementById("clicks-container");
var bigBackContainer = document.getElementById("big-back-container");
var bigBackBackground = document.getElementById("big-back-background");
var bigBackWhiteUnderlay = document.getElementById("big-back-white-underlay");

var smaller;
    var height = bigBackContainer.offsetHeight;
    var width = bigBackContainer.offsetWidth;
function backgroundAdjust() {
//    var height = bigBackContainer.offsetHeight;
//    var width = bigBackContainer.offsetWidth;
    height = bigBackContainer.offsetHeight;
    width = bigBackContainer.offsetWidth;
    
    if ( (height / width) < (1540 / 1400)         /*width > height*/) { //HORIZONTAL


        smaller = bigBackContainer.offsetHeight;
        
        clicksContainer.style.position = "relative";
        
        clicksContainer.style.height = smaller + "px";
        clicksContainer.style.width = smaller / 1.1 + "px";
        
        if (width > height * (2380 / 1540)) {
            bigBackBackground.style.backgroundSize = 'contain';
        } else {
            bigBackBackground.style.backgroundSize = 'cover';
        }
        if (width > (height * (2380 / 1540)) - 20) {
            bigBackWhiteUnderlay.style.left = (width - (height * (2380 / 1540)) + 20) / 2 + 'px';
        } else {
            bigBackWhiteUnderlay.style.left = '0px';
        }
        
        bigBackBackground.style.height = smaller + 'px';
        
        if (bigBackContainer.offsetHeight > bigBackContainer.style.maxHeight) { 
            bigBackContainer.style.bottom = (document.getElementById('page-container').offsetHeight - bigBackContainer.offsetHeight) / 1.5 + 'px'; }
        
        document.getElementById('top-player-bar').classList.remove('mobile-player-bar');
    } else { //VERTICAL

        
        smaller = bigBackContainer.offsetWidth;
        
        clicksContainer.style.position = "absolute";
        bigBackBackground.style.backgroundSize = 'cover';
        bigBackBackground.style.backgroundPosition = 'bottom';
        bigBackBackground.style.height = smaller * 1.1 + 'px'; 
        bigBackBackground.style.bottom = "0px";
        clicksContainer.style.bottom = "0px";
        
        bigBackContainer.style.bottom = '0px';
        
        clicksContainer.style.height = smaller * 1.1 + "px";
        clicksContainer.style.width = smaller + "px";
        
        document.getElementById('top-player-bar').classList.add('mobile-player-bar');
    }

    bigBackWhiteUnderlay.style.maxHeight = (width * 1.1) + 'px';
    bigBackWhiteUnderlay.style.maxWidth = (height * (2380 / 1540)) - 20 + 'px';
}




backgroundAdjust();

var ceramicMan = document.getElementById("ceramic-man");
var ceramicShimmer = document.getElementById("ceramic-shimmer");
var innerSquare = document.getElementById("inner-clicks-container");

var borderCircle = innerSquare.offsetHeight * 0.22;

ceramicMan.style.borderRadius = "50%";
ceramicMan.style.width = "0%";
ceramicMan.style.height = "0%";

ceramicMan.style.left = (innerSquare.offsetHeight / 2) - (innerSquare.offsetHeight * 0.22) + "px";
ceramicMan.style.top = (innerSquare.offsetHeight / 2) - (innerSquare.offsetHeight * 0.22) + "px";
ceramicMan.style.border = innerSquare.offsetHeight * 0.22 + "px solid transparent";
ceramicMan.style.backgroundSize =  innerSquare.offsetHeight * 0.52 + "px";

          
ceramicMan.style.transition = "0.2s";
ceramicShimmer.style.transition = "0.2s";

ceramicShimmer.style.width = innerSquare.offsetHeight * 0.40 + 'px' ;
ceramicShimmer.style.height = innerSquare.offsetHeight * 0.41 + 'px';
ceramicShimmer.style.top = '-' + innerSquare.offsetHeight * 0.195 + 'px';
ceramicShimmer.style.left = '-' + innerSquare.offsetHeight * 0.195 + 'px';


var ceramicSizeBool; //undefinied 1st, true 

function ceramicSizer() {
//    console.log(ceramicSizeBool);
    if (event.type == 'click') {if (ceramicSizeBool == true || ceramicSizeBool == undefined) {ceramicSizeBool = false;} else {ceramicSizeBool = true;}}
    if (event.type == 'resize') {console.log('resize');}
    if (ceramicSizeBool == true || ceramicSizeBool == undefined) { 
        ceramicMan.style.left = (innerSquare.offsetHeight / 2) - (innerSquare.offsetHeight * 0.22) + "px";
        ceramicMan.style.top = (innerSquare.offsetHeight / 2) - (innerSquare.offsetHeight * 0.22) + "px";
        ceramicMan.style.border = innerSquare.offsetHeight * 0.22 + "px solid transparent";
        ceramicMan.style.backgroundSize =  innerSquare.offsetHeight * 0.52 + "px";
//        ceramicSizeBool = false;
        
        ceramicShimmer.style.width = innerSquare.offsetHeight * 0.40 + 'px' ;
        ceramicShimmer.style.height = innerSquare.offsetHeight * 0.41 + 'px';
        ceramicShimmer.style.top = '-' + innerSquare.offsetHeight * 0.195 + 'px';
        ceramicShimmer.style.left = '-' + innerSquare.offsetHeight * 0.195 + 'px';
    } else  {//BIG
        ceramicMan.style.left = (innerSquare.offsetHeight / 2) - (innerSquare.offsetHeight / 2) + "px";
        ceramicMan.style.top = (innerSquare.offsetHeight / 2) - (innerSquare.offsetHeight / 2) + "px";
        ceramicMan.style.border = innerSquare.offsetHeight / 2 + "px solid transparent";
        ceramicMan.style.backgroundSize =  innerSquare.offsetHeight * 1.2 + "px";
        
//        ceramicSizeBool = true;
        
        ceramicShimmer.style.width = innerSquare.offsetHeight * 0.92 + 'px' ;
        ceramicShimmer.style.height = innerSquare.offsetHeight * 0.94 + 'px';
        ceramicShimmer.style.top = '-' + innerSquare.offsetHeight * 0.45 + 'px';
        ceramicShimmer.style.left = '-' + innerSquare.offsetHeight * 0.45 + 'px';
    } 
//    if (event.type == 'click') {console.log("yup");}
//    if (event.type == 'resize') {console.log('resize');}
//    console.log(event.type);
}



//ceramicSizer();

//body.onresize = backgroundAdjust;
//body.onresize = ceramicSizer;
//body.onresize = console.log('resizing');
//
//window.addEventListener("resize", console.log('resizing'));