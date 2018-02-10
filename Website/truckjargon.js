function wordPicker(){
  var outputWord = "";
  adjectiveList = ["Big", "Green", "Sanitary", "Smelly", "Fast",
                   "Once-A-Week", "House-Visiting", "Mean", "Timely",
                   "Not-Gray", "Boxy", "Beeping", "Crushing"]
  nounList = ["Cars", "Big Boys", "Units", "Metalmen", "Wagons", "Rigs", "Lorries",
              "Freighters", "Carryalls", "Four-Wheel Drives"]

   var miracle = Math.floor(Math.random() * 50) + 1;
   if (miracle == 25){
     document.write("TRUCK")
   }
   else{
     for (i=0; i<2; i++){
       var index = Math.floor(Math.random() * adjectiveList.length-1) + 1;
       outputWord += adjectiveList[index];
       outputWord += " ";
       adjectiveList.splice(index, 1);
     }
     outputWord += nounList[Math.floor(Math.random() * nounList.length-1) + 1];
     document.getElementById('randomWords').innerHTML = outputWord;
   }
}
