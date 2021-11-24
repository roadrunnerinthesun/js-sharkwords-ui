const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let numCorrect = 0;

// Loop over the chars in `word` and create divs.xww
//
const createDivsForChars = word => {
  
  // find div id="word-container"
  const wordContainer = document.querySelector('#word-container');

  // each added div has class letter-box and specified letter
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend',`<div class="letter-box ${letter}"></div>`
    );
  }

  // document.querySelector('body').insertAdjacentHTML('beforeend', '<p>Hi</p>');
};

// Loop over each letter in the alphabet and generate a button
// for each letter
const generateLetterButtons = () => {
  // Replace this with your code
  // Find section with id="letter-buttons"
  const letterButtons = document.querySelector('#letter-buttons');

  // append buttons with each letter of the alphabet
  for (const letter of ALPHABET) {
    letterButtons.insertAdjacentHTML('beforeend', `<button>${letter}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
const disableLetterButton = buttonEl => {
  // catPhoto.setAttribute('src', 'cat2.gif')
  buttonEl.setAttribute ('disabled', 'true');
  
  
};

// This is a helper function we will use in the future
// It should return `true` if `letter` is in the word
// For now, you should test it out to make sure it works

// const isLetterInWord = letter => {
   const isLetterInWord = (letter) => { 
     // select All divs that have class value .letter-box
      const letterBoxes = document.querySelectorAll('.letter-box');
     // for each div get the .classList and check if letter is in list
      for (const box of letterBoxes) {
        if (box.classList.contains(letter)) {
          return true;
        }
      }

      return false;
};

const handleCorrectGuess = (letter) => { 
    // get all letter-box divs with letter 
    // for each div with letter use .innerHTML to equal the letter
  const getAll = document.querySelectorAll('.letter-box');
  for (const div of getAll){
    if (div.classList.contains(letter)){
      div.innerHTML = letter;
      numCorrect += 1;
    }
  }
};

const handleWrongGuess = () => { 
  // if numWrong === 5 
  if (numWrong=== 5) {    
    // disable all buttons 
    const buttons = document.querySelectorAll('button');
    for (const button of buttons){
      disableLetterButton(button);
    }
    // get #play-again a element and set display = ""
    document.querySelector('#play-again').style.display = '';
  }
  // else 
  else {
    // increment numWrong  
    numWrong +=1;
    // upadate image to guess#.png
    const sharkPhoto = document.querySelector('img');
    sharkPhoto.setAttribute('src', `/static/images/guess${numWrong}.png`);
  }

};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

function random_item(items)
{
    return items[Math.floor(Math.random()*items.length)];    
}

// This is like if __name__ == '__main__' in Python
// It will be called when the file is run (because
// we call the function on line 66)
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess
  // You can change this to choose a random word from WORDS once you
  // finish this lab but we hard code it so we know what the word is
  // and can tell if things look correct for this word

  // const word = 'hello';
  const word = random_item(WORDS);
  console.log(word);
  // call the function that makes an empty line for each letter in the word
  // Replace this line with the function call
  createDivsForChars(word);

  // call the function that makes a button for each letter in the alphabet
  // Replace this line with the function call
  generateLetterButtons();

  // add an event handler to handle clicking on a letter
  document.querySelector('#letter-buttons').addEventListener('click', (evt) => {

    const clickedBtn = evt.target;

    // you should disable the button so the letter can't be clicked again
    disableLetterButton(clickedBtn);
    // you should then check if the currently clicked letter is in the word
    const letter = clickedBtn.innerHTML;
    // if it is, call `handleCorrectGuess`
    if (isLetterInWord(letter)) {
      handleCorrectGuess(letter);
    }
    // if it is not, call `handleWrongGuess`
    else {
      handleWrongGuess();
    }

    // checking is last button won the game
    if (numCorrect === word.length) {
        document.querySelector('#won-play-again').style.display = '';
        // disable all buttons 
        const buttons = document.querySelectorAll('button');
        for (const button of buttons){
          disableLetterButton(button);
        }
    
    }
  });



  // add an event handler to handle clicking on the Play Again button
  document.querySelector('#play-again').addEventListener('click', (evt) => {
    resetGame();

  });
 
  // add an event handler to handle clicking on the Play Again button if won game
  document.querySelector('#won-play-again').addEventListener('click', (evt) => {
    resetGame();

  });
})();
