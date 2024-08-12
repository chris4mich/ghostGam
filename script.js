document.addEventListener("DOMContentLoaded", function () {
  const stage = document.getElementById("stage");
  const ghost = document.getElementById("ghost");
  const skull = document.getElementById("skull");
  const scoreElement = document.getElementById("score");
  const oou = document.getElementById("oou");
  const scream = document.getElementById("scream");
  const scaryFace = document.getElementById("scary-face");
  const theme = document.getElementById("theme");

  let screamDelay = generateScreamDelay();
  let lastGhostPosition = { x: 0, y: 0 };
  let previousLevelScore =0;
  let score = 0;
  let ghostMovementSpeed = 1500;
  let movementSpeedRemovable = 100;

  const rangeX = stage.clientWidth - ghost.clientWidth;
  const rangeY = stage.clientHeight - ghost.clientHeight;

  function generateScreamDelay() {
    return Math.floor(Math.random() * 15) + 6;
  }

  function setGhostMovementSpeed() {
    if(score-previousLevelScore===10) {
      previousLevelScore = score;
      ghostMovementSpeed-=movementSpeedRemovable;
    }
  }

  function moveghostRandomly() {
    const maxX = rangeX;
    const maxY = rangeY;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    ghost.style.transform = `translate(${randomX}px, ${randomY}px)`;
    lastGhostPosition = { x: randomX, y: randomY };
  }

  function handleScreamEvent() {
    theme.pause();
    theme.currentTime = 0;
    scream.play();
    scaryFace.style.display = "block";
    setTimeout(() => {
      scaryFace.style.display = "none";
      score = 0;
      scoreElement.textContent = `Score: ${score}`;
    }, 800);
    setTimeout(() => {
      theme.play();
    }, 3500);
    screamDelay = generateScreamDelay();
  }

  function disappearOnClick() {
    ghost.style.display = "none";
    skull.style.display = "block";
    skull.style.transform = `translate(${lastGhostPosition.x}px, ${lastGhostPosition.y}px)`;

    if (score < 50) {
      score++;
      scoreElement.textContent = `Score: ${score}`;
    }
    console.log(screamDelay);
    if (score === screamDelay && score > 5) {
      handleScreamEvent();
    } else {
      oou.play();
    }

    setTimeout(() => {
      ghost.style.display = "block";
      skull.style.display = "none";
      moveghostRandomly();
    }, 1000);
  }
  setGhostMovementSpeed();

  ghost.addEventListener("click", disappearOnClick);

  setInterval(function () {
    moveghostRandomly();
    setGhostMovementSpeed();
  }, ghostMovementSpeed); 

  
  moveghostRandomly();
});
