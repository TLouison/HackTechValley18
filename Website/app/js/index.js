var app = new Vue({
  el: '#app',
  data: {
    userPokemonSrc: "file:///C:/Users/cobbn/Documents/RPI\ All\ Years/HackTechValley/HackTechValley18/truck_boy/battle_boy.gif",
    opponentPokemonSrc: "file:///C:/Users/cobbn/Documents/RPI\ All\ Years/HackTechValley/HackTechValley18/truck_boy/pixel-art-garbage-truck_1959078.gif",
    userPokemon: "stickboii",
    opponentPokemon: "TruCk",
    active: active,
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
          this.battleText = this.userPokemon + " killed " + this.opponentPokemon
    }
  }
  
})