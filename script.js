// DOM Variables
let textArea = document.getElementById('textArea');
let newGame = document.getElementById('newGame');
let hit = document.getElementById('hit');
let stay = document.getElementById('stay');
////////
// Game variables
let gameStarted = false,
		gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];
 
hit.style.display = 'none';
stay.style.display = 'none';
showStatus();

newGame.addEventListener('click', function(){
		gameStarted = true;
    gameOver = false;
    playerWon = false;

		deck = deckBuilder(deck);
		shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];
    
    newGame.style.display = 'none';
    hit.style.display = 'inline';
    stay.style.display = 'inline';
    showStatus();
});

hit.addEventListener('click', function(){
	playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stay.addEventListener('click', function(){
	gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function deckBuilder(deck) {
  let suits = ["Hearts", "Diamonds", "Spade", "Clubs"];
  let value = ["Ace", "King", "Queen", "Jack", "Ten", "Nine",
    "Eight", "Seven", "Six", "Five", "Four", "Three", "Two" ];

  for (let suitidx = 0; suitidx < suits.length; suitidx++) {
    for (let valueidx = 0; valueidx < value.length; valueidx++) {
      let card = {
        suit: suits[suitidx],
        value: value[valueidx]
      };
      
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck){
	for(let i = 0; i < deck.length; i++){
  let swapIdx = Math.trunc(Math.random() * deck.length);
  let tmp = deck[swapIdx];
  deck[swapIdx] = deck[i];
  deck[i] = tmp;
  }
}

function getCardString(card) {
  return card.value + ' of ' + card.suit;
}

function getCardNumericValue(card){
	switch(card.value){
		case 'Ace':
    	return 1;
    case 'Two':
    	return 2;
    case 'Three':
    	return 3;
    case 'Four':
    	return 4;
    case 'Five':
    	return 5;
    case 'Six':
    	return 6;
    case 'Seven':
    	return 7;
    case 'Eight':
    	return 8;
    case 'Nine':
    	return 9;
    default:
    	return 10;  
	}
}

function getScore(cardArray){
	let score = 0;
  let hasAce = false;
  for(let i = 0; i < cardArray.length; i++){
  	let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace'){
    	hasAce = true;
    }
  }
	if (hasAce && score + 10 <= 21){
  	return score + 10;
  }
	return score;
}

function getNextCard(){
  return deck.shift();
}
function updateScores(){
	dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame(){
		
    updateScores();
    
    if(gameOver){
    	while(dealerScore < playerScore && playerScore <=21
      												&& dealerScore <= 21){
      dealerCards.push(getNextCard());
      updateScores();
      }                        
    }
    
    if (playerScore > 21){
    	playerWon =false;
      gameOver = true;
    }
    else if (dealerScore > 21){
    	playerWon =true;
      gameOver = true;
    }
    else if (gameOver){
    
    	if(playerScore > dealerScore){
      	playerWon = true;
      }
      else {
      	playerWon = false;
      }
    }
      
}

function showStatus(){
	if(!gameStarted){
		textArea.innerText = 'Welcome to Blackjack!';
    return;
	}
  let dealerCardString = "";
  for (let i =0; i< dealerCards.length; i++){
  	dealerCardString += getCardString(dealerCards[i]) + '\n';
  }  
  let playerCardString = "";
  for(let i =0; i< playerCards.length; i++){
  playerCardString += getCardString(playerCards[i]) + "\n";
  }

updateScores();

textArea.innerText = 'Dealer has:\n' +
											dealerCardString +
                      '(score: ' + dealerScore + ')\n\n' +
                      
                      'Player has:\n' +
                      playerCardString +
                      '(score: ' + playerScore + ')\n\n';

if (gameOver){
	if(playerWon){
  	textArea.innerText += "You Won!";
  }
  else {
  	textArea.innerText += "Dealer Wins!";
  }
  newGame.style.display ='inline';
  hit.style.display = 'none';
  stay.style.display = 'none';
}
}