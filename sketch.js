let cardsImages = [];
let flippedCards = [];
let numColumns = 4;
let numRows = 11;
let cardWidth, cardHeight;
let matchedPairs = 0;
let cards = []; // this might not be needed

function setup() {
  createCanvas(400, 400);
  cardWidth = width / numColumns;
  cardHeight = height / numRows;
  
  // Create an array of card values (pairs)
  let cardValues = [];
  for (let i = 0; i < numRows * numColumns / 2; i++) {
    cardsImages.push(loadImage(`spongebob${i}.jpg`)); // Change the image file names
  }
  
  // Shuffle the card values
  shuffleArray(cardValues);

  // Create card objects
  let index = 0;
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {
      let x = j * cardWidth;
      let y = i * cardHeight;
      cards.push(new Card(x, y, cardWidth, cardHeight, cardValues[index]));
      index++;
    }
  }
}

function draw() {
  background(220);
  
  for (let card of cards) {
    card.show();
  }
  
  if (flippedCards.length === 2) {
    if (flippedCards[0].value === flippedCards[1].value) {
      flippedCards[0].isMatch = true;
      flippedCards[1].isMatch = true;
      flippedCards = [];
      matchedPairs++;
      if (matchedPairs === numRows * numColumns / 2) {
        // All pairs have been matched, you can add a game over logic here
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(255, 0, 0);
        text("You Win!", width / 2, height / 2);
      }
    } else {
      setTimeout(() => {
        for (let card of flippedCards) {
          card.flip();
        }
        flippedCards = [];
      }, 1000);
    }
  }
}

function mousePressed() {
  for (let card of cards) {
    if (card.isMouseOver(mouseX, mouseY) && !card.isFaceUp && flippedCards.length < 2) {
      card.flip();
      flippedCards.push(card);
    }
  }
}

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

class Card {
  constructor(x, y, w, h, value) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.value = value;
    this.isFaceUp = false;
    this.isMatch = false;
  }

  show() {
    if (this.isFaceUp) {
      fill(255);
      rect(this.x, this.y, this.w, this.h);
      textSize(32);
      textAlign(CENTER, CENTER);
      fill(0);
      text(this.value, this.x + this.w / 2, this.y + this.h / 2);
    } else {
      fill(0, 0, 255);
      rect(this.x, this.y, this.w, this.h);
    }
    if (this.isMatch) {
      noStroke();
      fill(0, 255, 0, 150);
      rect(this.x, this.y, this.w, this.h);
    }
  }

  flip() {
    this.isFaceUp = !this.isFaceUp;
  }

  isMouseOver(x, y) {
    return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;
  }
}
