const timerText = document.getElementById('timer');
const scoreText = document.getElementById('score');
const board = document.getElementById('board');
const characters = document.querySelectorAll('div.character');

const initialTimer = 20;
let timer = initialTimer;
let score = 0;
const PEOPLE = 'people';
const THIEF = 'thief';

const startGame = () => {
  if (timer === initialTimer) {
    gameLoop()
  }
}

const gameLoop = () => {
  if (timer <= 0) {
    alert(`Game Over! You\'re score is: ${score}`);

    timer = 20;
    score = 0;
    timerText.textContent = '0';
    scoreText.textContent = '0';
  } else {
    toggleCharacters(timer % 3 === 0);
    renderCharacters(generateCharacterIndex());
  
    timerText.textContent = --timer;
    setTimeout(gameLoop, 1000);
  }

}

const toggleCharacters = (isVisible) => {
  if (isVisible) {
    characters.forEach(character => {
      character.className = character.className.replace('hidden', 'visible')
    });
  } else {
    characters.forEach(character => {
      character.className = character.className.replace('visible', 'hidden')
    });
  }
}

const generateCharacterIndex = () => {
  const characterIndexes = {
    0: PEOPLE,
    1: PEOPLE,
    2: PEOPLE,
    3: PEOPLE,
    4: PEOPLE,
    5: PEOPLE,
  };

  const thiefIndex = getRandom(characters.length);
  characterIndexes[thiefIndex] = THIEF;

  return characterIndexes;
}

const renderCharacters = (characterIndexes) => {
  characters.forEach((character, index) => {
    character.classList.remove('people')
    character.classList.remove('thief')
    character.classList.remove('active');
    character.classList.add(characterIndexes[index])

    let doOnce = true;
    character.onclick = () => {
      if (doOnce) {
        updateScore(THIEF === characterIndexes[index]);
        doOnce = !doOnce;
        character.classList.add('active');
      }
    };
  });
}

const updateScore = (isThief) => {
  if (isThief) {
    score += 1;
    scoreText.textContent = score;
  } else {
    score -= 2;
    scoreText.textContent = score;
  }
}

const getRandom = (max) => {
  return Math.floor(Math.random() * max)
}