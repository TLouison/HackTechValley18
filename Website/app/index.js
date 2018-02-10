var gameArea = null;
var map = null;
var deltaX = 0;
var deltaY = 0;

function update()
{
	if(deltaX != 0 || deltaY != 0)
		map.panBy(deltaX, deltaY);
}

function initMap()
{
	var overlay = document.getElementById('overlay');
	
	map = new google.maps.Map(document.getElementById('map'), {
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
	
	gameArea = {
		canvas : overlay,
		start : function() {
			this.context = this.canvas.getContext("2d");
			this.interval = setInterval(update, 20);
		},
		clear : function() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	};
	
	gameArea.start();
	
	document.addEventListener('keydown', (event) => {
		switch(event.key)
		{
			case 'ArrowUp':
				deltaY = -10;
				break;
			case 'ArrowDown':
				deltaY = 10;
				break;
			case 'ArrowLeft':
				deltaX = -10;
				break;
			case 'ArrowRight':
				deltaX = 10;
				break;
		}
	});
	
	document.addEventListener('keyup', (event) => {
		switch(event.key)
		{
			case 'ArrowUp':
			case 'ArrowDown':
				deltaY = 0;
				break;
			case 'ArrowLeft':
			case 'ArrowRight':
				deltaX = 0;
				break;
		}
	});
		
}
