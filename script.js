// Be sure to name any p5.js functions/variables we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global circle, createVector, square, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, text, 
          mouseX, sq, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke, 
          keyCode, TEXT_COLLECTION, firebase, LEFT, createButton, textAlign, CENTER, createInput, round, sqrt, lerpColor, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

let input;
let button;
let userID;
let textsMap = {};
let backgroundColor;
let myColor;
const CUTOFF_MS = 5000;

function setup() {
  // Canvas & color settings
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100);
  
  backgroundColor = 13;
  
  background(backgroundColor, 0, 80);
  input = createInput();
  input.position(20, 20);

  button = createButton('enter');
  button.position(input.x + input.width, 20);
  button.mousePressed(addText);

  textAlign(LEFT);
  textSize(20);
  
  userID = random(99999999999);
  myColor = idColor(userID);
  
  // Listen to updates to the texts collection.
  firebase
    .firestore()
    .collection(TEXT_COLLECTION)
    .onSnapshot(querySnapshot => {
      for (let textDoc of querySnapshot.docs) {
        if (!textsMap[textDoc.id]) {
          let text = textDoc.data();
          textsMap[textDoc.id] = text;
        }
      }
    });
}

function deleteText(textId) {
  firebase
    .firestore()
    .collection(TEXT_COLLECTION)
    .doc(textId)
    .delete();
  console.log("Deleting emote", textId);
}

function addText() {
  const textInput = input.value();
  let posX = random(width-input.width);
  let posY = random(50, height-20);
  text(textInput, posX, posY);
  input.value('');
  
    // access text messages from firebase
    firebase
    .firestore()
    .collection(TEXT_COLLECTION)
    .add({
      text: textInput,
      position: {
        x: posX,
        y: posY
      },
      time: new Date(),
      user: userID,
      color: idColor(userID)
    });
}

function idColor(userNum) {
  // returns color matching user-id
  return userNum%360;
}

function draw() {
  clear();
  background(backgroundColor, 0, 80);
  
  // rect identifying user color
  fill(myColor, 63, 80);
  rect(input.x + input.width+50, 15, 20, 20);
  
  for (let textsId of Object.keys(textsMap)) {
        let textObject = textsMap[textsId];
        let timeElapsedMs = new Date().getTime() - textObject.time.toMillis();
        let timeRemainingMs = Math.max(CUTOFF_MS - timeElapsedMs, 0);
        
        if (timeRemainingMs === 0) {
          // delete message
          deleteText(textsId);
          delete textsMap[textsId];
        } else {
          // display message
          fill(textObject.color, 100, 80);
          text(textObject.text, textObject.position.x, textObject.position.y);
        }
  }
}

