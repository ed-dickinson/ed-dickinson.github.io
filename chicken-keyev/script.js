
var slider = document.getElementById("myRange");
var output = document.getElementById("readout");
//readout.innerHTML = slider.value; // Display the default slider value
var chromatic = ['O','C','C#','D','D#','E','F','F#','G','G#','A','A#','B','C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
var I = 1;
var x = 1;
var vi = 7;

//for rotating the chicken
var rota = 0;
var rota2 = 0;
var chicki = document.getElementById("readout");

//slider.oninput = function () {
function chordChange() {

  //for rotating the chicken
  //rota2 = ((this.value - 1) * 1) / 5;
  rota2 = ((slider.value - 1) * 1) / 5;
  rota = "rotate(" + (rota2) + "deg)";
  document.getElementById('chicken').style.transform = rota;

  //I = Number(this.value);
  I = Number(slider.value);
  ii = I + 2;
  iii = I + 4;
  IV = I + 5;
  V = I + 7;
  vi = I + 9;
  note7 = I + 11;

  var sharporno = chromatic[I].length;

  if (sharporno==2) {readoutsharp.innerHTML = "#";}
  if (sharporno==1) {readoutsharp.innerHTML = "&nbsp;";}

  if (I > 11) {readoutnote.innerHTML = "B";}
  else if (I > 9) {readoutnote.innerHTML = "A";}
  else if (I > 7) {readoutnote.innerHTML = "G";}
  else if (I > 5) {readoutnote.innerHTML = "F";}
  else if (I > 4) {readoutnote.innerHTML = "E";}
  else if (I > 2) {readoutnote.innerHTML = "D";}
  else {readoutnote.innerHTML = "C";}


  minorreadoutnote.innerHTML = chromatic[vi];

  let note_string = chromatic[I] + " " + chromatic[ii] + " " + chromatic[iii] + " " + chromatic[IV] + " " + chromatic[V] + " " + chromatic[vi] + " " + chromatic[note7] + " "

  noteline2.innerHTML = note_string;

  chordline2.innerHTML = chromatic[I] + " " + chromatic[ii] + "m " + chromatic[iii] + "m " + chromatic[IV] + " " + chromatic[V] + " " + chromatic[vi] + "m ";

  Ichord.innerHTML = chromatic[I];
  iichord.innerHTML = chromatic[ii];
  iiichord.innerHTML = chromatic[iii];
  IVchord.innerHTML = chromatic[IV];
  Vchord.innerHTML = chromatic[V];
  vichord.innerHTML = chromatic[vi];

  var Ispaces = document.getElementsByClassName("Ispace");
  var Idashes = document.getElementsByClassName("Idash");
  var vispaces = document.getElementsByClassName("vispace");
  var vidashes = document.getElementsByClassName("vidash");

  var Vspaces = document.getElementsByClassName("Vspace");
  var Vdashes = document.getElementsByClassName("Vdash");
  var iiispaces = document.getElementsByClassName("iiispace");
  var iiidashes = document.getElementsByClassName("iiidash");

  var IVspaces = document.getElementsByClassName("IVspace");
  var IVdashes = document.getElementsByClassName("IVdash");
  var iispaces = document.getElementsByClassName("iispace");
  var iidashes = document.getElementsByClassName("iidash");



  if (chromatic[I].length == 2) {
    for (var i = 0; i < Ispaces.length; i++) {
    Ispaces[i].innerHTML = "&nbsp;&nbsp;";}
    for (var i = 0; i < Idashes.length; i++) {
    Idashes[i].innerHTML = "--";}}
  if (chromatic[I].length == 1) {
    for (var i = 0; i < Ispaces.length; i++) {
    Ispaces[i].innerHTML = "&nbsp;";}
    for (var i = 0; i < Idashes.length; i++) {
    Idashes[i].innerHTML = "-";}}

  if (chromatic[vi].length == 2) {
    for (var i = 0; i < vispaces.length; i++) {
    vispaces[i].innerHTML = "&nbsp;&nbsp;&nbsp;";}
    for (var i = 0; i < vidashes.length; i++) {
    vidashes[i].innerHTML = "---";}}
  if (chromatic[vi].length == 1) {
    for (var i = 0; i < vispaces.length; i++) {
    vispaces[i].innerHTML = "&nbsp;&nbsp;";}
    for (var i = 0; i < vidashes.length; i++) {
    vidashes[i].innerHTML = "--";}}


    if (chromatic[V].length == 2) {
    for (var i = 0; i < Vspaces.length; i++) {
    Vspaces[i].innerHTML = "&nbsp;&nbsp;";}
    for (var i = 0; i < Vdashes.length; i++) {
    Vdashes[i].innerHTML = "--";}}
  if (chromatic[V].length == 1) {
    for (var i = 0; i < Vspaces.length; i++) {
    Vspaces[i].innerHTML = "&nbsp;";}
    for (var i = 0; i < Vdashes.length; i++) {
    Vdashes[i].innerHTML = "-";}}

  if (chromatic[iii].length == 2) {
    for (var i = 0; i < iiispaces.length; i++) {
    iiispaces[i].innerHTML = "&nbsp;&nbsp;&nbsp;";}
    for (var i = 0; i < iiidashes.length; i++) {
    iiidashes[i].innerHTML = "---";}}
  if (chromatic[iii].length == 1) {
    for (var i = 0; i < iiispaces.length; i++) {
    iiispaces[i].innerHTML = "&nbsp;&nbsp;";}
    for (var i = 0; i < iiidashes.length; i++) {
    iiidashes[i].innerHTML = "--";}}


    if (chromatic[IV].length == 2) {
    for (var i = 0; i < IVspaces.length; i++) {
    IVspaces[i].innerHTML = "&nbsp;&nbsp;";}
    for (var i = 0; i < IVdashes.length; i++) {
    IVdashes[i].innerHTML = "--";}}
  if (chromatic[IV].length == 1) {
    for (var i = 0; i < IVspaces.length; i++) {
    IVspaces[i].innerHTML = "&nbsp;";}
    for (var i = 0; i < IVdashes.length; i++) {
    IVdashes[i].innerHTML = "-";}}

  if (chromatic[ii].length == 2) {
    for (var i = 0; i < iispaces.length; i++) {
    iispaces[i].innerHTML = "&nbsp;&nbsp;&nbsp;";}
    for (var i = 0; i < iidashes.length; i++) {
    iidashes[i].innerHTML = "---";}}
  if (chromatic[ii].length == 1) {
    for (var i = 0; i < iispaces.length; i++) {
    iispaces[i].innerHTML = "&nbsp;&nbsp;";}
    for (var i = 0; i < iidashes.length; i++) {
    iidashes[i].innerHTML = "--";}}



    document.querySelectorAll('.note-toggle').forEach(note => {
      note.style.color = note_string.match(note.textContent + ' ') ? 'black' : 'white'
    })

}


chordChange()

//slider.addEventListener('input', chordChange());


document.getElementById('inner-chicken-clicker1').addEventListener('click', function() {
    slider.focus();
    slider.value -= 1;
    console.log(slider.value);
    chordChange();
    });

document.getElementById('inner-chicken-clicker2').addEventListener('click', function() {
    slider.readOnly = false;
    slider.focus();
    slider.value = Number(slider.value) + 1;
    console.log(slider.value);
    chordChange();
    });
