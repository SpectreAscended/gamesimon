'use strict';

const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
let highscore = 0;

const playSound = function (name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const animatePress = function (currentColor) {
  $(`.${currentColor}`).addClass('pressed');
  setTimeout(function () {
    $(`.${currentColor}`).removeClass('pressed');
  }, 100);
};

const nextSequence = function () {
  let randomNumber = Math.trunc(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $('#level-title').text(`Level ${level}`);
  userClickedPattern = [];
};

$('.btn').click(function (event) {
  let userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  console.log(userClickedPattern);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$('.restart').click(function () {
  if (!started) {
    $('.restart').text('Restart Game');
    $('#level-title').text(`Level ${level}`);
    started = true;
    nextSequence();
  }
});

const checkAnswer = function (currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success');
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('wrong');
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    if (level > highscore) highscore = level - 1;
    $('#level-title').text(
      'Game Over, Press Any Key to Restart.  Highscore:' + highscore
    );
    startOver();
  }
};

const startOver = function () {
  level = 0;
  gamePattern = [];
  started = false;
};
