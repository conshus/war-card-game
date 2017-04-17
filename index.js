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
