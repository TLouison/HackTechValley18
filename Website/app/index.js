var gameArea = null;
var playerCharacter = null;
var map = null;
var left = false;
var right = false;
var up = false;
var down = false;
var current_time = 0;
var allText;
var trucks = {};

function read_file()
{
	alert("alert test");
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET","positions.txt",false);
	rawFile.onreadystatechange = function() {
		if(rawFile.readyState === 4) {
			if(rawFile.status === 200 || rawFile.status === 0){
				allText = rawFile.responseText;
			}
		}
	}
	rawFile.send(null);
}

function update_locations()
{
	
	//Moved trucks from local to global variable for use in collision function
	
	var all_event_strings = allText.split("\n");
	console.log(all_event_strings[0]);
	for (var i = 0; i < all_event_strings.length; ++i) {
		var all_components = all_event_strings[i].split(",");
		var id = all_components[0];
		var pos1 = all_components[1];
		var pos2 =  all_components[2];
		var pos = {lat: parseFloat(pos1), lng: parseFloat(pos2)}
		var time = all_components[3];
		var time_int = parseInt(all_components[3].substring(0,2)) *60 + parseInt(all_components[3].substring(3,5));
		if(time_int<current_time)
		{
			trucks[id] = pos;
		}
		
	}
	
	for(let id in gameArea.markers)
	{
		if(trucks === null || !(id in trucks))
		{
			marker = gameArea.markers[id];
			marker.setMap(null);
			delete gameArea.markers[id];
		}
	}
	
	for(let id in trucks)
	{
		pos = trucks[id];
		
		if(id in gameArea.markers)
		{
			marker.setPosition(pos);
		}
		else
		{
			var url = "../../truck_boy/small-truck.gif"
			marker = new google.maps.Marker({
				position: pos,
				map: map,
				icon: {
					url,
					anchor: new google.maps.Point(50, 50)
				},
				title: "garbage"+id
			});
			gameArea.markers[id] = marker;
		}
		checkCollide(pos[0],pos[1]);
	}
	current_time+= 40;
}

function character(width, height, color, type) {
	this.type = type;
	if (type == "image") {
	  this.image = new Image();
	  this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.x = (gameArea.canvas.width / 2)-(this.width/2);
	this.y = (gameArea.canvas.height / 2)-(this.height/2);
    
	this.update = function() {
	  ctx = gameArea.context;

		if (left || down) {
			console.log("left image")
			this.image.src = "../../truck_boy/pixel_boy_walk_left.gif";
		} else if (right || up) {
			console.log("right image")
			this.image.src = "../../truck_boy/pixel_boy_walk.gif";
		} else {
			console.log("standing")
			this.image.src = "../../truck_boy/pixel_boy_idle.gif";
		} 
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

function distanceCheck(x1,y1,x2,y2){
	var deltaX = Math.abs(x1-x2);
	var deltaY = Math.abs(y1-y2);
	var dist = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
	return (dist);
}

function checkCollide(x,y){
	var playerPos = map.getCenter().toUrlValue().split(",");
	playerPos[0] = Number(playerPos[0]);
	playerPos[1] = Number(playerPos[1]);

	if (distanceCheck(playerPos[0], playerPos[1], x, y) < 1){
		alert("COLLISION");
		console.log("COLLISION");
	}
}

function update()
{
	gameArea.clear();
	var deltaX = 0;
	var deltaY = 0;
	
	if(left) deltaX = -10;
	else if(right) deltaX = 10;
	
	if(down) deltaY = 10;
	else if(up) deltaY = -10;
	
	if(deltaX != 0 || deltaY != 0)
		map.panBy(deltaX, deltaY);

	checkCollide();
	playerCharacter.update();
}

function initMap()
{
	console.log("Start initing the map");
	var overlay = document.getElementById('overlay');
	
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 42.815102, lng: -73.950355},
		zoom: 17,
		disableDefaultUI: true,
		zoomControl: true,
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
		},
		markers: []
	};
	console.log("Game Area now is set to", gameArea);
	
	playerCharacter = new character(27, 35, "../../truck_boy/pixel_boy_idle.gif", "image");
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
	read_file();
	var timer = setInterval(update_locations, 1000);
}
