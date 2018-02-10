


function initMap()
{
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 42.815102, lng: -73.950355},
		zoom: 20,
		disableDefaultUI: true,
		zoomControl: false,
		gestureHandling: 'none',
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: true,
		rotateControl: true,
		fullscreenControl: true
	});
}
