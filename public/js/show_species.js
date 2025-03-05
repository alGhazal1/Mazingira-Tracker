document.getElementById('getLocationButton').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchSpeciesData(latitude, longitude);
        }, (error) => {
            handleGeolocationError(error);
        });
    } else {
        document.getElementById('speciesResults').innerHTML = '<p>Geolocation is not supported.</p>';
    }
});

function fetchSpeciesData(latitude, longitude) {
    document.getElementById('speciesResults').innerHTML = '<p>Loading ...</p>';

    fetch(`/species1?latitude=${latitude}&longitude=${longitude}`)
        .then((response) => response.text())
        .then((html) => {
            document.getElementById('speciesResults').innerHTML = html;
        });
}

function handleGeolocationError(error) {
    let errorMessage = 'Geolocation error.';
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = 'User denied geolocation permission.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            errorMessage = 'The request to get user location has timed out.';
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = 'Unknown error occurred.';
            break;
    }
    document.getElementById('speciesResults').innerHTML = `<p>${errorMessage}</p>`;
}

