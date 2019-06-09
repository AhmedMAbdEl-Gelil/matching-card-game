const cards = document.querySelectorAll('.card');

var hasFlippedCard = false;
var Card1, Card2;
var lockborad = false;
var count=0;
var time=60;

function flipCard() {
  
  if (lockborad){
	  return;
  }
	
   if (this === Card1){
	   return;
   }
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    Card1 = this;
  
  }else{
    Card2 = this;
	
	  checkformatch();
  }
}

function checkformatch(){
	if(Card1.dataset.image === Card2.dataset.image){
		window.count +=2;
		if(window.count==16){
			document.getElementById("msg").innerHTML=
				"<p style='display: flex;justify-content: center;align-items: center;margin:0 auto;font-size: 32px;font-family: Gloria Hallelujah;color:#435f77'> Congratulations you're a winner 🎉🎉 </p>";
			 setTimeout(() => {
    location.reload(true);
  }, 2000);
			
		}
		removecard();
	
  }else{
	notmatch();
	  
  }
}

function removecard(){
	
	 setTimeout(() => {
    Card1.style.visibility = "hidden";
	Card2.style.visibility = "hidden";
	
	resetBoard();
  }, 300);
}

function notmatch(){
	lockborad = true;
	
	setTimeout(() => {
    Card1.classList.remove('flip');
    Card2.classList.remove('flip');
		 
	resetBoard();
  }, 300);
}
function resetBoard(){
	[hasFlippedCard, lockborad] = [false, false];
	[Card1,Card2] = [null, null]
}

var myVar=setInterval(function(){
 	time--;
 	if(time<0){
		document.getElementById("msg").innerHTML=
				"<p style='display: flex;justify-content: center;align-items: center;margin:0 auto;font-size: 32px;font-family: Gloria Hallelujah;color:#435f77'> Time out you're loss game </p>";
  		clearInterval(myVar);
		setTimeout(() => {
    		location.reload(true);
  		}, 2000);
	}
},1000);

(function shuffle(){
	cards.forEach(card => {
		var randompos = Math.floor( Math.random()*32 );
		card.style.order = randompos;
	});
})();


cards.forEach(card => card.addEventListener('click', flipCard));
