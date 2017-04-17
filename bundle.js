(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const War = require('./lib/War');
let game = new War('JJ', 'Michael');
game.startGame();
placeCardsOnTable();
document.querySelector("#playARound").addEventListener('click', game.showCards);

function placeCardsOnTable(){
  console.log(game.playerOneCards);
  console.log(game.playerTwoCards);
  //Player One's hand
  let playerOneHandSource = document.querySelector("#playerOneHand-template").innerHTML;
  let playerOneHandTemplate = Handlebars.compile(playerOneHandSource);
  let newArrayForPlayerOne = game.playerOneCards.map(function(card){
    //card.suit = "&"+card.suit.toLowerCase()+";";
    card.suit = card.suit.toLowerCase();
    if (card.suit == "diamonds"){
      card.suit = "diams";
    }
    card.faceValue = card.value
    if (['Ace','Jack','Queen','King'].includes(card.value)){
      card.faceValue = card.value.toString().charAt(0);
      card.value = card.value.toString().toLowerCase().charAt(0);
    }
    return card;
    //console.log(card);
  });
  console.log(newArrayForPlayerOne);
  let playerOneHandHtml = playerOneHandTemplate(newArrayForPlayerOne);
  let destinationPlayerOne = document.querySelector(".playerOneHand");
  destinationPlayerOne.innerHTML = playerOneHandHtml;

  //Player Two's hand
  let playerTwoHandSource = document.querySelector("#playerTwoHand-template").innerHTML;
  let playerTwoHandTemplate = Handlebars.compile(playerTwoHandSource);
  let newArrayForPlayerTwo = game.playerTwoCards.map(function(card){
    //card.suit = "&"+card.suit.toLowerCase()+";";
    card.suit = card.suit.toLowerCase();
    if (card.suit == "diamonds"){
      card.suit = "diams";
    }
    card.faceValue = card.value
    if (['Ace','Jack','Queen','King'].includes(card.value)){
      card.faceValue = card.value.toString().charAt(0);
      card.value = card.value.toString().toLowerCase().charAt(0);
    }
    return card;
    //console.log(card);
  });
  console.log(newArrayForPlayerTwo);
  let playerTwoHandHtml = playerTwoHandTemplate(newArrayForPlayerTwo);
  let destinationPlayerTwo = document.querySelector(".playerTwoHand");
  destinationPlayerTwo.innerHTML = playerTwoHandHtml;

  //Table Cards
  let cardTableSource = document.querySelector("#cardTable-template").innerHTML;
  let cardTableTemplate = Handlebars.compile(cardTableSource);
  let newArrayForCardTable = game.tableCards.map(function(card){
    //card.suit = "&"+card.suit.toLowerCase()+";";
    card.suit = card.suit.toLowerCase();
    if (card.suit == "diamonds"){
      card.suit = "diams";
    }
    card.faceValue = card.value
    if (['Ace','Jack','Queen','King'].includes(card.value)){
      card.faceValue = card.value.toString().charAt(0);
      card.value = card.value.toString().toLowerCase().charAt(0);
    }
    return card;
    //console.log(card);
  });
  console.log(newArrayForCardTable);
  let cardTableHtml = cardTableTemplate(newArrayForCardTable);
  let destinationCardTable = document.querySelector(".cardTable");
  destinationCardTable.innerHTML = cardTableHtml;
}

},{"./lib/War":4}],2:[function(require,module,exports){
let valueToWords = {
  1: 'Ace',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten'
};
function Card (value, suit) {
  this.suit = suit;
  this.value = value;
}
Card.prototype.toString = function () {
  if ((this.value > 0) && (this.value <= 10)){
    return `${valueToWords[this.value]} of ${this.suit}`;
  } else {
    return `${this.value} of ${this.suit}`;
  }
}
module.exports = Card;

},{}],3:[function(require,module,exports){
let Card = require('./Card');

function Deck () {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
  this.cards = suits.reduce((cards, suit) => {
    return cards.concat(values.reduce((cardsOfSuit, value) => {
      return cardsOfSuit.concat(new Card(value, suit));
    }, []));
  }, []);
}
Deck.prototype.deal = function(){
  return this.cards.shift();
}
Deck.prototype.shuffle = function(shuffles){
  this.timesShuffled = 0;
  for (i=0; i<shuffles; i++){
    this.cards.sort(function(a,b){return 0.5 - Math.random()});
    this.timesShuffled++
  }
  return this.cards;
}
module.exports = Deck;

},{"./Card":2}],4:[function(require,module,exports){
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

},{"./Card":2,"./Deck":3}]},{},[1]);
