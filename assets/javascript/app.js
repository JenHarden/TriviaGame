
$(document).ready(function () {

    var correctlyAnswered = 0;
    var incorrectlyAnswered = 0;
    var Unanswered = 0;
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
    ];
    console.log(trivia);

    function countdown() {   
        if (!pauseTimer) {
            timeLeftPlay--;
        }
        if (timeLeftPlay == 0) {
            $("#gameDiv").show();
            $("#gameStatDiv").show();
        }
        $("#answerTimer").text(timeLeftPlay + ' seconds');
    }

    $("#gameDiv").hide();
    $("#endingStatDiv").hide();
    $("#answerDiv").hide();

    function resetGame() {
        currentQuestionIndex = 0;
        $('#startDiv').hide();
        $("#gameStatDiv").show();
        $("#gameDiv").show();
        $("#endingStatDiv").hide();
        displayQuestionAnswers(trivia[currentQuestionIndex]);
        correctlyAnswered = 0;
        incorrectlyAnswered = 0;
        Unanswered = 0;
        pauseTimer = false;
        timeLeftPlay = 30;
        setInterval(function () {
            countdown();
        }, 1000);
    };

    function displayQuestionAnswers(triviaItem) {
        $("#answerOptions").html('');
        // $("#answerOptions").append('<ul>');
        currentCorrectAnswer = triviaItem.correct;
        $("#questionAsked").text(triviaItem.question);
        $.each(triviaItem.answers, function (i, answer) {
            // console.log("answer", answer);

            var btn = $('<button/>', {
                text: answer, click: function () { answerClicked(answer); }

            });
            btn.addClass("btn btn-secondary");

            $("#answerOptions").append('<div>');
            $("#answerOptions").append(btn);
            $("#answerOptions").append('</div>');
        });

    };

    function answerClicked(answerGuessed) {
        console.log(answerGuessed);
        timeLeftPlay = initialTimePlay;
        if (answerGuessed === currentCorrectAnswer.answer) {
            correctlyAnswered++;
        } else {
            incorrectlyAnswered++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex === trivia.length) {
            pauseTimer = true;
            $("#gameDiv").hide();
            $("#gameStatDiv").hide();
            $("#endingStatDiv").show();
            // End game here
        }
        displayQuestionAnswers(trivia[currentQuestionIndex]);
    };


    $('#startButton').on('click', resetGame);

    $('#startOverButton').on('click', resetGame);


});
