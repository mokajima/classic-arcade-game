// Store the size of block in variables
const blockWidth = 101;
const blockHeight = 83;

// The value to be subtracted in order to center entities vertically
const blockHalfHeight = blockHeight / 2;

// Get the DOM elements
const lives = document.getElementById('lives');
const modal = document.getElementById('modal');

/**
 * @description Enemies the player must avoid
 * @constructor
 * @param {number} y - The y coordinate of the player
 */
const Enemy = function(y) {

  // The image/sprite for our enemies, this uses
  // a helper to easily load images
  this.sprite = 'images/enemy-bug.png';

  // The initial position of the enemy
  this.startX = -1 * blockWidth * 3;

  // Set the position of the enemy
  this.x = this.startX;
  this.y = y;

  // Set the speed of the enemy
  // Max speed is 500px/sec and min speed is 100px/sec
  this.speed = Math.floor(Math.random() * (500 - 100)) + 100;
};

/**
 * @description Update the enemy's position
 * @param {number} dt - A time delta between ticks
 */
Enemy.prototype.update = function(dt) {

  // Multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  // Back to the initial position if the enemy move off screen
  // blockWidth * 5 is the right edge of the canvas
  if (this.x > blockWidth * 5 + blockWidth * 3) {
    this.x = this.startX;
  }

  // Check collision with the player
  if (Math.abs(this.x - player.x) < 75 && this.y === player.y) {
    player.collision = true;
  }

};

/**
 * @description Draw the enemy on the screen
 */
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.updateSpeed = function() {
  this.speed += 100;
}

/**
 * @description The player character
 * @constructor
 */
const Player = function() {

  // The image/sprite for the player, this uses
  // a helper to easily load images
  this.sprite = 'images/char-boy.png';

  // The initial position of the player
  this.startX = blockWidth * 2; // 3th column
  this.startY = blockHeight * 5 - blockHalfHeight; // 6th row

  // Set the position of the player
  this.x = this.startX;
  this.y = this.startY;

  // Whether the player has collided with the enemy or not
  this.collision = false;

  // The lives of the player
  this.lives = 3;
};

/**
 * @description Reset the state of the player
 */
Player.prototype.reset = function() {
  this.x = this.startX;
  this.y = this.startY;
  this.collision = false;
}

/**
 * @description Update the player's position
 */
Player.prototype.update = function() {

  if (this.collision) {

    // Back to the initial position if a collision happens
    this.reset();

    // Lose a life
    this.loseLife();
  }

};

/**
 * @description Draw the player on the screen
 */
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Move the player according to the user input
 * @param {string} key - The key pressed
 */
Player.prototype.handleInput = function(key) {

  if ('left' === key) {

    if (this.x) {
      this.x -= blockWidth;
    }

  } else if ('up' === key) {

    if (blockHalfHeight === this.y) {
      game.next();
    } else {
      this.y -= blockHeight;
    }

  } else if ('right' === key) {

    if (blockWidth * 4 !== this.x) {
      this.x += blockWidth;
    }

  } else if ('down' === key) {

    if (blockHeight * 5 - blockHalfHeight !== this.y) {
      this.y += blockHeight;
    }

  }

};

/**
 * @description Update the lives of the player
 */
Player.prototype.loseLife = function() {

  // Lose a life
  this.lives -= 1;

  // Update the DOM
  lives.lastElementChild.remove();

  if (0 === this.lives) {
    game.end();
  }

};

/**
 * @description Handle the game states
 * @constructor
 */
const Game = function() {

  // The level of the game
  this.level = 1;

  // The score of the game
  this.score = 0;
};

/**
 * @description Go to next level
 */
Game.prototype.next = function() {

  // Move the player back to the initial position
  player.reset();

  // Update the speed of enemies
  allEnemies.forEach(function(element) {
    element.speed += 50;
  });

  // Level up
  this.level++;

  // Update the score
  this.score += 100;

  // Update the DOM
  document.getElementById('level').textContent = this.level;
  document.getElementById('score').textContent = this.score;
};

// Instantiate objects
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Place the game object in a variable called game
const allEnemies = [];

for (let i = 0; i < 6; i++) {

  // Set the y coordinate of the enemy
  const y = blockHeight * (i % 3 + 1) - blockHalfHeight;

  allEnemies[i] = new Enemy(y);
}

const player = new Player();

const game = new Game();

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

document.getElementById('modal__button').addEventListener('click', function() {

  // Hide the modal
  modal.classList.remove('is-active');
});
