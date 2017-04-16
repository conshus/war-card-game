let Card = require('./Card');
let Deck = require('./Deck');
let cardValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
function War (playerOne, playerTwo){
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.deck = new Deck;
  this.playerOneCards = [];
  this.playerTwoCards = [];
  this.tableCards = [];
}
module.exports = War;

War.prototype.warWinner = function(){
  //console.log(this.numberOfTotalCards);
  //console.log(this.playerOneCards.length);
  //console.log(this.playerTwoCards.length);
  if (this.playerOneCards.length == this.numberOfTotalCards){
    return "Player One Wins"
  } else if (this.playerTwoCards.length == this.numberOfTotalCards){
    return "Player Two Wins"
  }
}
War.prototype.evaluateCards = function(){
  //console.log('tableCards: ', this.tableCards);
  for (i=0; i<this.tableCards.length; i++){
    //console.log(this.tableCards[i].value)
    //console.log(cardValues.indexOf(this.tableCards[i].value));
  }
  let playerOneCardValue = cardValues.indexOf(this.tableCards[this.tableCards.length-2].value);
  let playerTwoCardValue = cardValues.indexOf(this.tableCards[this.tableCards.length-1].value);
  //console.log(playerOneCardValue, playerTwoCardValue);
  if (playerOneCardValue > playerTwoCardValue){
    this.playerOneCards.push.apply(this.playerOneCards, this.tableCards.splice(0));
  } else if (playerOneCardValue < playerTwoCardValue){
      this.playerTwoCards.push.apply(this.playerTwoCards, this.tableCards.splice(0));
  } else if (playerOneCardValue == playerTwoCardValue){
      this.gameMessage = "This means WAR!";
      //console.log("This means WAR!");
      for (i=0; i<2; i++){
        this.tableCards.push(this.playerOneCards.shift());
        this.tableCards.push(this.playerTwoCards.shift());
      }
      this.evaluateCards();
  }
  //console.log('tableCards: ',this.tableCards);
  //console.log('playerOneCards: ',this.playerOneCards);
  //console.log('playerTwoCards: ',this.playerTwoCards);
}
War.prototype.showCards = function(){
  //console.log('playerOneCards Top: ',this.playerOneCards[0]);
  this.tableCards.push(this.playerOneCards.shift());
  //console.log('playerTwoCards Top: ',this.playerTwoCards[0]);
  this.tableCards.push(this.playerTwoCards.shift());
  //console.log('tableCards: ', this.tableCards);
  //console.log(this.playerOneCards.length, this.playerTwoCards.length);
}
// War.prototype.playerOnePlays = function(){
//   console.log('playerOneCards Top: ',this.playerOneCards[0]);
//   this.tableCards.push(this.playerOneCards.shift());
// }
// War.prototype.playerTwoPlays = function(){
//   console.log('playerTwoCards Top: ',this.playerTwoCards[0]);
//   this.tableCards.push(this.playerOneCards.shift());
// }
War.prototype.startGame = function(){
  this.numberOfTotalCards = this.deck.cards.length;
  this.deck.shuffle(7);
  for (i=0; i< this.numberOfTotalCards/2; i++){
    this.playerOneCards.push(this.deck.deal());
    this.playerTwoCards.push(this.deck.deal());
  }
  //console.log('playerOneCards: ',this.playerOneCards.length);
  //console.log('playerTwoCards: ',this.playerTwoCards.length);
}
