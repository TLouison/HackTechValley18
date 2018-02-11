function timedelay(){
	var timer = setTimeout(showPage(), 3000);
}

function showPage() {
  $("#loader").style.display = "none";
  $("#wrap").style.height = "100%";
  $("#wrap").style.opacity = "1";
}	