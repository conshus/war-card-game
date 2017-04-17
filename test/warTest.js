/*
x has playerOne
x has playerTwo
x has a full deck of cards
x shuffle cards
x each player gets the same amount of cards
x each player shows the first card in hand
x high card (Ace is the highest) wins
x winner puts both cards at the bottom of hand
x if the cards played are the same value, "War" is declared
x WAR winner places all six cards at the bottom of their hand
x winner is the player with all the cards
*/
const assert = require('assert');
const Card = require('../lib/Card');
const Deck = require('../lib/Deck');
const War = require('../lib/War');

describe('War', function(){
  let game;
  beforeEach(function(){
    game = new War('JJ','Michael');
  });
  it('has playerOne', function(){
    assert.equal(game.playerOne, 'JJ');
  });
  it('has playerTwo', function(){
    assert.equal(game.playerTwo, 'Michael');
  });
  it('has a full deck of cards', function(){
    //assert.equal(game.deck.cards.length,52);
    assert.equal(game.numberOfTotalCards,52);
  });
  it('should have the deck shuffled a determined amount of time', function(){
    this.originalCard
    game.deck.shuffle(7);
    assert.equal(game.deck.timesShuffled,7);
  });
  describe('#startGame()', function(){
    it('each player gets dealt the same amount of cards', function(){
      game.startGame();
      assert.equal(game.playerOneCards.length == game.playerTwoCards.length, true)
    });
  });
   beforeEach(function(){
     game.startGame();
     game.showCards();
   });

  describe('#showCards()', function(){
    it('each player shows the first card in hand', function(){
      //game.startGame();
      //game.showCards();
      assert.equal(game.tableCards.length==2, true);
      assert.equal(game.playerOneCards.length == game.playerTwoCards.length, true);
    });
  });
  describe('#evaluateCards()', function(){
    it('should evaluate which card has a higher value', function(){
      //game.startGame();
      //game.showCards();
      game.tableCards[0].value = 'Queen';
      game.tableCards[1].value = 7;
      game.evaluateCards();
      assert.equal(game.playerOneCards.length > game.playerTwoCards.length, true);
    });
    it('hand winner should add cards to bottom of their deck', function(){
      //game.startGame();
      //game.showCards();
      game.tableCards[0].value = 'Queen';
      let playerOneCardOriginal = game.tableCards[0];
      game.tableCards[1].value = 7;
      let playerTwoCardOriginal = game.tableCards[1];
      game.evaluateCards();
      assert.equal(game.playerOneCards[game.playerOneCards.length-2] == playerOneCardOriginal, true);
      assert.equal(game.playerOneCards[game.playerOneCards.length-1] == playerTwoCardOriginal, true);
    });
    it('if cards played have the same value, WAR is declared', function(){
      //game.startGame();
      //game.showCards();
      game.tableCards[0].value = 10;
      game.tableCards[1].value = 10;
      game.evaluateCards();
      assert.equal(game.gameMessage, "This means WAR!");
    });
    it('WAR winner places the cards at the bottom of their hand', function(){
      //game.startGame();
      //game.showCards();
      game.tableCards[0].value = 10;
      game.tableCards[1].value = 10;
      game.evaluateCards();
      assert.equal(Math.abs(game.playerOneCards.length - game.playerTwoCards.length)>=6,true);
    });
  });
  describe('#warWinner()', function(){
    it('Winner is determined when one player has all the cards', function(){
      //game.startGame();
      //game.showCards();
      game.playerOneCards.push.apply(game.playerOneCards, game.playerTwoCards.splice(0));
      game.tableCards[0].value = 'Jack';
      game.tableCards[1].value = 10;
      game.evaluateCards();
      assert(game.warWinner());
    });
  });
});
