var app = new Vue({
  el: '#app',
  data: {
    userPokemonSrc: "../../truck_boy/battle_boy.gif",
    opponentPokemonSrc: "../../truck_boy/pixel-art-garbage-truck_1959078.gif",
    userPokemon: "stickboii",
    opponentPokemon: "TruCk",
    startUserHP: 100,
    userHP: 100,
    startOpponentHP: 100,
    opponentHP: 100,
    userLevel: 50,
    opponentLevel: 50,
    battleText: "What will your boi do?",
    optionText: "Kill truk",
    userHpBar: {
		width: "100%"
	},
  	opponentHpBar: {
  		width: "100%"
  	},
  },
  methods:{
    killTruck: function() {
          setTimeout(() => {
            this.battleText = this.userPokemon + " killed " + this.opponentPokemon
          }, 2000);  
          this.battleText = "What will your boi do?";
          document.getElementById("map").style.display = "block";
          document.getElementById("app").style.display = "none";
          
                 
    }
  }
  
})