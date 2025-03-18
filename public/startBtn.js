 
const getStarted = document.getElementById('getStartedButton')

getStarted.addEventListener('click', function(e){
   alert('Allow access to location?');
   if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
          function(position) {
      const latitude =  position.coords.latitude;
      const longitude =  position.coords.longitude;
      
      console.log('Latitude: ' + latitude);
      console.log('Longitude: ' + longitude);

  fetch(`/species?latitude=${latitude}&longitude=${longitude}`)
.then(response =>{
   if (response.redirected){
      window.location.href = response.url;
   } else if (!response.ok){
       throw new Error('Invalid network response');
   }
   return response.json();
})
.then(data => {
    console.log('Data received:', data)
})
.catch(error =>{
    console.error('Error:', error);
});

},
  function(error){
          console.error('Error occured. Error code: ' + error.code);
      }
     );
   } else {
       console.log('Geolocation not supported.')
   }
});
