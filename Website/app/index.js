var gameArea = null;
var playerCharacter = null;
var map = null;
var left = false;
var right = false;
var up = false;
var down = false;


function character(width, height, color, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.x = gameArea.canvas.width / 2;
  this.y = gameArea.canvas.height / 2;

	if (left || down) {
		this.image.src = "../../truck_boy/pixel_boy_walk_left.gif";
	} else if (right || up) {
		this.image.src = "../../truck_boy/pixel_boy_walk.gif";
	} else {
		this.image.src = "../../truck_boy/pixel_boy_idle.gif";
	} 
    
  this.update = function() {
    ctx = gameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, 
        this.x, 
        this.y,
        this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

  }
}

function update()
{
	var deltaX = 0;
	var deltaY = 0;
	
	if(left) deltaX = -10;
	else if(right) deltaX = 10;
	
	if(down) deltaY = 10;
	else if(up) deltaY = -10;
	
	if(deltaX != 0 || deltaY != 0)
		map.panBy(deltaX, deltaY);

	playerCharacter.update();
}

function initMap()
{
	console.log("Start initing the map");
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
	console.log("overlay declared as", overlay);
	
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
	console.log("Game Area now is set to", gameArea);
	
	playerCharacter = new character(100, 100, "../../truck_boy/pixel_boy_idle.gif", "image");
	gameArea.start();
	
	console.log("character is now set to", playerCharacter);

	document.addEventListener('keydown', (event) => {
		switch(event.key)
		{
			case 'ArrowUp':
				up = true;
				break;
			case 'ArrowDown':
				down = true;
				break;
			case 'ArrowLeft':
				left = true;
				break;
			case 'ArrowRight':
				right = true;
				break;
		}
	});
	
	document.addEventListener('keyup', (event) => {
		switch(event.key)
		{
			case 'ArrowUp':
				up = false;
				break;
			case 'ArrowDown':
				down = false;
				break;
			case 'ArrowLeft':
				left = false;
				break;
			case 'ArrowRight':
				right = false;
				break;
		}
	});
		
}
