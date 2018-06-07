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
  this.x = -101 * 3;
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
  if (this.x > 505 + 101 * 3) {
    this.x = -101 * 3;
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

/**
 * @description The player character
 * @constructor
 */
const Player = function() {

  // The image/sprite for the player, this uses
  // a helper to easily load images
  this.sprite = 'images/char-boy.png';

  // The initial position of the player
  this.startX = 101 * 2; // 3th column
  this.startY = 83 * 5 - 83 / 2; // 6th row

  // Set the position of the player
  this.x = this.startX;
  this.y = this.startY;

  // Whether the player has collided with the enemy or not
  this.collision = false;
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
      this.x -= 101;
    }

  } else if ('up' === key) {

    if (41.5 === this.y) {
      this.reset();
    } else {
      this.y -= 83;
    }

  } else if ('right' === key) {

    if (404 !== this.x) {
      this.x += 101;
    }

  } else if ('down' === key) {

    if (373.5 !== this.y) {
      this.y += 83;
    }

  }

};

// Instantiate objects
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];

for (let i = 0; i < 6; i++) {

  // Set the y coordinate of the enemy
  const y = 83 * (i % 3 + 1) - 83 / 2;

  allEnemies[i] = new Enemy(y);
}

const player = new Player();

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
