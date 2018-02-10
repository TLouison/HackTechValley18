function wordPicker(){
  var outputWord = "";
  adjectiveList = ["Big ", "Green ", "Sanitary ", "Smelly ", "Fast ",
   "Once-A-Week ", "House-visiting ", "Mean ", "Timely ", "Not-gray ", "Boxy "]
  nounList = ["Cars", "Big boys", "Units", "Metalmen"]

   var miracle = Math.floor(Math.random() * 50) + 1;
   if (miracle == 25){
     document.write("TRUCK")
   }
   else{
     for (i=0; i<2; i++){
       var index = Math.floor(Math.random() * adjectiveList.length-1) + 1;
       outputWord += adjectiveList[index];
       adjectiveList.splice(index, 1);
     }
     outputWord += nounList[Math.floor(Math.random() * nounList.length-1) + 1];
     document.write(outputWord);
   }
}
