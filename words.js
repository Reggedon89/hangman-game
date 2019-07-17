$(document).ready(() => {
  var commonWords = [
    "the",
    "of",
    "and",
    "a",
    "to",
    "in",
    "is",
    "you",
    "that",
    "it",
    "he",
    "was",
    "for",
    "on",
    "are",
    "as",
    "with",
    "his",
    "they",
    "I",
    "at",
    "be",
    "this",
    "have",
    "from",
    "or",
    "one",
    "had",
    "by",
    "word",
    "but",
    "not",
    "what",
    "all",
    "were",
    "we",
    "when",
    "your",
    "can",
    "said",
    "there",
    "use",
    "an",
    "each",
    "which",
    "she",
    "do",
    "how",
    "their",
    "if",
    "will",
    "up",
    "other",
    "about",
    "out",
    "many",
    "then",
    "them",
    "these",
    "so",
    "some",
    "her",
    "would",
    "make",
    "like",
    "him",
    "into",
    "time",
    "has",
    "look",
    "two",
    "more",
    "write",
    "go",
    "see",
    "number",
    "no",
    "way",
    "could",
    "people",
    "my",
    "than",
    "first",
    "water",
    "been",
    "call",
    "who",
    "oil",
    "its",
    "now",
    "find",
    "long",
    "down",
    "day",
    "did",
    "get",
    "come",
    "made",
    "may",
    "part"
  ];
  var categories = [
    [
      "apple",
      "peach",
      "pear",
      "blueberry",
      "coconut",
      "fig",
      "pineapple",
      "orange",
      "banana",
      "plum"
    ],
    [
      "soccer",
      "football",
      "tennis",
      "lacrosse",
      "golf",
      "basketball",
      "badminton",
      "bowling",
      "ballet"
    ],
    [
      "daisy",
      "tulip",
      "sunflower",
      "daffodil",
      "freesia",
      "peonies",
      "rose",
      "hydrangea",
      "lily"
    ]
  ];

  let filteredWord = commonWords.filter(word => {
    return word.length >= 3;
  });

  let randomWord = filteredWord[
    Math.floor(Math.random() * filteredWord.length)
  ].toUpperCase();
  console.log(randomWord);
  var randomWordArray = randomWord.split("");

  for (var i = 0; i < randomWord.length; i++) {
    $("#container").append('<div class="letter ' + i + '"></div></div>');
    $("#container")
      .find(":nth-child(" + (i + 1) + ")")
      .text(randomWordArray[i]);
    $(".letter").css("color", "black");
    $(".letter").css("border-radius", "25px");
  }
  //This is the lives left to the player
  let remaining = 7;

  $("#livesRemaining").html(remaining);

  var wrongGuesses = 1;
  $("button").on("click", function() {
    $(this).addClass("used");
    $(this).prop("disabled", "true");
    var matchFound = false;

    // Check if clicked letter is in secret word
    var userGuess = $(this).text();
    for (var i = 0; i < randomWord.length; i++) {
      if (userGuess === randomWord.charAt(i)) {
        $("#container")
          .find(":nth-child(" + (i + 1) + ")")
          .css("color", "white")
          .addClass("winner");
        matchFound = true;
      }
    }

    //Check for winner
    var goodGuesses = [];
    $(".letter").each(function(index) {
      if ($(this).hasClass("winner")) {
        goodGuesses.push(index);
        if (goodGuesses.length === randomWordArray.length) {
          $("#container").hide();
          $("button").prop("disabled", "true");
          $(".category").text("Great job you guessed the secret word!");
          $(".category").append(
            "<br><button enabled class='play-again'>Play again?</button>"
          );
        }
      }
    });

    // If no match, increase count and add appropriate image

    if (matchFound === false) {
      $("#hangman").attr("src", "hangman/" + wrongGuesses + ".png");
      wrongGuesses++;
      remaining--;
      $("#livesRemaining").html(remaining);
    }

    // If wrong guesses gets to 7 exit the game
    if (remaining === 0) {
      $("#container").hide();
      $("button").prop("disabled", "true");
      $(".category").text("Sorry you lost! The secret word was " + randomWord);
      $(".category").append(
        "<br><button enabled class='play-again'>Play again?</button>"
      );
    }

    // Play again button
    $(".play-again").on("click", function() {
      location.reload();
    });
  });
});
