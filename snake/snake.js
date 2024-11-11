document.addEventListener("DOMContentLoaded", (event) => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const gridSize = 20;
  let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
  let direction = { x: 0, y: 0 };
  let food = { x: gridSize * 10, y: gridSize * 10 };
  let score = 0;

  // Define obstacles
  const obstacles = [
    { x: gridSize * 8, y: gridSize * 8 },
    { x: gridSize * 12, y: gridSize * 12 },
    { x: gridSize * 16, y: gridSize * 16 },
  ];

  // Function to draw a rectangle (used for snake segments, food, and obstacles)
  function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridSize, gridSize);
  }

  // Function to draw the snake
  function drawSnake() {
    snake.forEach((segment) => drawRect(segment.x, segment.y, "lime"));
  }

  // Function to draw the food
  function drawFood() {
    drawRect(food.x, food.y, "red");
  }

  // Function to draw the obstacles
  function drawObstacles() {
    obstacles.forEach((obstacle) => drawRect(obstacle.x, obstacle.y, "gray"));
  }

  // Function to draw the score
  function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
  }

  // Function to move the snake
  function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
      score++;
      placeFood();
    } else {
      snake.pop();
    }
  }

  // Function to place food at a random position
  function placeFood() {
    food.x = Math.floor((Math.random() * canvas.width) / gridSize) * gridSize;
    food.y = Math.floor((Math.random() * canvas.height) / gridSize) * gridSize;
  }

  // Function to check for collisions
  /**
   * Checks for collisions in the snake game.
   *
   * This function checks if the snake has collided with the walls, itself, or any obstacles.
   *
   * @returns {boolean} Returns true if a collision is detected, otherwise false.
   */
  function checkCollision() {
    const head = snake[0];
    // Check if the snake hits the walls
    if (
      head.x < 0 ||
      head.x >= canvas.width ||
      head.y < 0 ||
      head.y >= canvas.height
    ) {
      return true;
    }
    // Check if the snake hits itself
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    // Check if the snake hits an obstacle
    for (let i = 0; i < obstacles.length; i++) {
      if (head.x === obstacles[i].x && head.y === obstacles[i].y) {
        return true;
      }
    }
    return false;
  }

  /**
   * Restarts the game by resetting the snake's position, direction, food position, and score.
   * Hides the game over message and restart button, and updates the score display.
   */
  function restartGame() {
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    direction = { x: 0, y: 0 };
    food = { x: gridSize * 10, y: gridSize * 10 };
    score = 0;
    document.getElementById("gameOverMessage").style.display = "none";
    document.getElementById("restartButton").style.display = "none";
    drawScore();
  }

  // Afficher le bouton de redémarrage lorsque le jeu est terminé
  /**
   * The main game loop function that handles the game's logic and rendering.
   * It checks for collisions, updates the game state, and renders the game elements.
   * If a collision is detected, it displays the final score and game over message,
   * and shows the restart button.
   */
  function gameLoop() {
    if (checkCollision()) {
      document.getElementById("finalScore").textContent = score;
      document.getElementById("gameOverMessage").style.display = "block";
      document.getElementById("restartButton").style.display = "block";
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawObstacles();
    moveSnake();
    drawSnake();
    drawScore();
  }

  // Event listener for keyboard input to change the snake's direction
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        if (direction.y === 0) direction = { x: 0, y: -gridSize };
        break;
      case "ArrowDown":
        if (direction.y === 0) direction = { x: 0, y: gridSize };
        break;
      case "ArrowLeft":
        if (direction.x === 0) direction = { x: -gridSize, y: 0 };
        break;
      case "ArrowRight":
        if (direction.x === 0) direction = { x: gridSize, y: 0 };
        break;
    }
  });

  // Set the game loop to run every 100 milliseconds
  setInterval(gameLoop, 100);
});
