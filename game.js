'use strict';

const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
let highscore = 0;

$('.instruction-text').slideUp();

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
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  console.log(userClickedPattern);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$('.restart').click(function () {
  $('.restart').css('background-color', 'darkorange');
  setTimeout(function () {
    $('.restart').css('background-color', 'orange');
  }, 100);
  if (!started && level === 0) {
    $('#level-title').text(`Level ${level}`);
    started = true;
    nextSequence();
    setTimeout(function () {
      $('.restart').addClass('hidden').text('Restart Game');
    }, 100);
  }
});

const checkAnswer = function (currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    if (level > highscore) highscore = level - 1;
    console.log('wrong');
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over.  Highscore: ' + highscore);
    setTimeout(function () {
      startOver();
      $('.restart').removeClass('hidden');
    }, 200);
  }
};

const startOver = function () {
  level = 0;
  gamePattern = [];
  started = false;
};

$('.instruction-btn').click(function () {
  $('.instruction-text').slideToggle().removeClass('hidden');
});
