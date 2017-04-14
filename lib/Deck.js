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
