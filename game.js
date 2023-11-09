var buttonColours = ['red', 'blue', 'green', 'yellow']
var gamePattern = []
var userClickedPattern = []

var started = false
var level = 0

$(document).on('keypress', function () {
  if (!started) {
    $('#level-title').text('Level ' + level)
    nextSequence()
    started = true
  }
})

$('.btn').on('click', function () {
  var userChosenColour = $(this).attr('id')
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length - 1)
})

function checkAnswer (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000)
    }
  } else {
    playSound('wrong')
    $(document).addClass('game-over')
    setTimeout(function () {
      $(document).removeClass('game-over')
    }, 200)
    $('h1').text('Game Over, Press Any Key to Restart')
    startOver()
  }
}

function nextSequence () {
  userClickedPattern = []
  level++
  $('h1').text('Level ' + level)
  var randomNumber = Math.floor(4 * Math.random())
  console.log(randomNumber)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  $('#' + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
  playSound(randomChosenColour)
}

function playSound (name) {
  var audio = new Audio('sounds/' + name + '.mp3')
  audio.play()
}

function animatePress (currentColor) {
  $('#' + currentColor).addClass('pressed')
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed')
  }, 100)
}

function startOver () {
  level = 0
  gamePattern = []
  started = false
}
