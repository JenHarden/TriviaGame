// Ensures that the page's DOM is ready before executing any JavaScript
$(document).ready(function () {

    // Hiding elements until game started

    $("#gameDiv").hide();
    $("#endingStatDiv").hide();
    $("#gameStatDiv").hide();

    // Game start click event

    $('#startButton').on('click', resetGame);

    var correctlyAnswered = 0;
    var incorrectlyAnswered = 0;
    var unanswered = 0;
    var initialTimePlay = 30;
    var timeLeftPlay = initialTimePlay;
    var pauseTimer = false;
    var currentCorrectAnswer = "";
    var currentQuestionIndex = 0;
    var trivia = [{
        question: "How does Harry manage to breathe underwater during the second task of the Triwizard Tournament?",
        answers: ["He transfigures into a shark", "He kisses a mermaid", "He eats gillyweed", "He performs a bubble-head charm"],
        correct: {
            answer: "He eats gillyweed",
            image: "./assets/images/gillyweed.gif"
        }
    },

    {
        question: "Who played Lord Voldemort in the movies?",
        answers: ["Jeremy Irons", "Tom Hiddleston", "Gary Oldman", "Ralph Fiennes"],
        correct: {
            answer: "Ralph Fiennes",
            image: "./assets/images/lordvodemort.gif"
        }
    },

    {
        question: "What house does Harry belong to at Hogwarts School of Witchcraft and Wizardry?",
        answers: ["Gryffindor", "Ravenclaw", "Slytherin", "Hufflepuff"],
        correct: {
            answer: "Gryffindor",
            image: "./assets/images/gryffindor.gif"
        }
    },

    {
        question: "What color are Dobby the House Elf's eyes?",
        answers: ["Brown", "Green", "Blue", "Black"],
        correct: {
            answer: "Green",
            image: "./assets/images/dobby.gif"
        }
    },

    {
        question: "What is the name of Harry's pet owl?",
        answers: ["Norbert", "Fluffy", "Hedwig", "Hagrid"],
        correct: {
            answer: "Hedwig",
            image: "./assets/images/hedwig.gif"
        }
    },

    {
        question: "What is the address of the house Harry lived in with the Dursley's?",
        answers: ["No. 12 Prinet Drive", "No. 4 Privet Drive", "No. 6 Priket Drive", "No. 9 Privey Drive"],
        correct: {
            answer: "No. 4 Privet Drive",
            image: "./assets/images/privitdrive.gif"
        }
    },

    {
        question: "What position does Harry play on his Quidditch team?",
        answers: ["Bludger", "Seeker", "Chaser", "Keeper"],
        correct: {
            answer: "Seeker",
            image: "./assets/images/quidditch.gif"
        }
    },

    {
        question: "What is Harry Potter's wand made of?",
        answers: ["Holly wood and dragon heartstring", "Yew wood and phoenix feather", "Elder wood and dragon scale", "Holly wood and phoenix feather"],
        correct: {
            answer: "Holly wood and phoenix feather",
            image: "./assets/images/wand.gif"
        }
    },

    {
        question: "Harry Potter shares the same birthday as the author, J.K. Rowling.",
        answers: ["True", "False"],
        correct: {
            answer: "True",
            image: "./assets/images/birthday.gif"
        }
    },
    ];

    // Setting game timer

    function countdown() {
        if (!pauseTimer) {
            timeLeftPlay--;
            answerCheck();
        }

        // Makes the game timer viewable in the DOM

        $("#answerTimer").text(timeLeftPlay + ' seconds');
    }

    // Reset game function to reset variables, timer and stat display

    function resetGame() {
        currentQuestionIndex = 0;
        $('#startDiv').hide();
        $("#gameStatDiv").show();
        $("#gameDiv").show();
        $("#endingStatDiv").hide();
        displayQuestionAnswers(trivia[currentQuestionIndex]);
        correctlyAnswered = 0;
        incorrectlyAnswered = 0;
        unanswered = 0;
        pauseTimer = false;
        timeLeftPlay = initialTimePlay;
        $(".wins").text(correctlyAnswered);
        $(".losses").text(incorrectlyAnswered);
        $(".outOfTime").text(unanswered);
        setInterval(function () {
            countdown();
        }, 1000);
    };

    // Displaying the question and answers into the game and dynamically creates buttons to display in the DOM

    function displayQuestionAnswers(triviaItem) {
        $("#answerOptions").html('');
        if (triviaItem) {
            currentCorrectAnswer = triviaItem.correct;
            $("#questionAsked").text(triviaItem.question);
            $.each(triviaItem.answers, function (i, answer) {

                var btn = $('<button/>', {
                    text: answer, click: function () { answerClicked(answer); }

                });
                btn.addClass("btn btn-secondary");

                $("#answerOptions").append('<div>');
                $("#answerOptions").append(btn);
                $("#answerOptions").append('</div>');
            });
        }
    };

    // This is the click event for the buttons and compare the guess to the correct answer.  Updates game win/loss state

    function answerClicked(answerGuessed) {
        timeLeftPlay = initialTimePlay;
        if (answerGuessed === currentCorrectAnswer.answer) {
            correctlyAnswered++;
            $(".wins").text("" + correctlyAnswered);
        } else {
            incorrectlyAnswered++;
            $(".losses").text(incorrectlyAnswered);
        }

        // End game state

        currentQuestionIndex++;
        if (currentQuestionIndex === trivia.length) {
            pauseTimer = true;
            $("#gameDiv").hide();
            $("#gameStatDiv").hide();
            $("#endingStatDiv").show();
        }
        displayQuestionAnswers(trivia[currentQuestionIndex]);
    };

    // Checking to see if an answer was clicked before time ran out.

    function answerCheck() {
        if (timeLeftPlay === 0) {
            pauseTimer = true;
            unanswered++;
            setTimeout(unansweredPause, 2000);
            $(".outOfTime").text(unanswered);
            $("#gameDiv").show();
            $("#gameStatDiv").show();
        }
    }

    // This is the call back function for a 2 second pause

    function unansweredPause() {
        pauseTimer = false;
        timeLeftPlay = initialTimePlay;
        currentQuestionIndex++;

        if (currentQuestionIndex < trivia.length) {
            displayQuestionAnswers(trivia[currentQuestionIndex]);
        }
        else {
            if (currentQuestionIndex === trivia.length) {
                pauseTimer = true;
                $("#gameDiv").hide();
                $("#gameStatDiv").hide();
                $("#endingStatDiv").show();
                // End game here
            }
        }
    }

    // This is the restart game event click

    $('#startOverButton').on('click', resetGame);

});