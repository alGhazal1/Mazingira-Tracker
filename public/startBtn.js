 
const getStarted = document.getElementById('getStartedButton')

getStarted.addEventListener('click', function(e){
//    window.location.href = 'http://127.0.0.1/species1';
   alert('Allow access to location?');
   if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
          function(position) {
      console.log('Latitude: ' + position.coords.latitude);
      console.log('Longitude: ' + position.coords.longitude);
      },
      function(error){
          console.error('Error occured. Error code: ' + error.code);
      }
     );
   } else {
       console.log('Geolocation not supported.')
   }
fetch('/getStarted')
.then(response =>{
if (response.redirected){
  window.location.href = response.url;
}
})
.catch(error =>{
console.error('Error:', error);
})
});

