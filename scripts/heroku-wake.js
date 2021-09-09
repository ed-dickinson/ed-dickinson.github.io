async function wakeUpHeroku(url) {
  const response = await fetch(url, {mode: 'cors'});
  const result = await response.json();
}
wakeUpHeroku('https://multi-mask.herokuapp.com/');

// fetch('https://multi-mask.herokuapp.com/',{mode: 'cors'})
// .then(function(response) {
//   // Successful response :)
//   return response.json();
// })
// .catch(function(err) {
//   // Error :(
//   console.log(err);
// });

//OLD for safari?

// if (window.XMLHttpRequest) { // Mozilla, Safari, ...
// request = new XMLHttpRequest();
// } else if (window.ActiveXObject) { // IE
// try {
//   request = new ActiveXObject('Msxml2.XMLHTTP');
// }
// catch (e) {
//   try {
//     request = new ActiveXObject('Microsoft.XMLHTTP');
//   }
//   catch (e) {}
// }
// }
// // Open, send.
// request.open('GET', 'https://multi-mask.herokuapp.com/', true);
// request.send(null);
