function Question(q, a, b, c, d, answer) {
    this.q = q;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.answer = answer;
}

const questionBank = [new Question("What is the meaning of Life?", "There is no meaning to life", "To be happy", "To break the wheel of karma", "42", 'd'),
new Question("What piece of sports equipment is actully a truncated icosahedron?", "Uh, I flunced geometry in highschool...", "A hockey puck", "A soccer ball", "None of the above", 'c'),
new Question("How many Plutonic solids are there?", "Seven", "Five", "Twenty", "What is this pseudoscience nonsense!?", 'b'),
new Question("What element is allegedly used in the antigravity propulsion systems studied by Robert Lazar at the Los Alamos National Labs in New Mexico?", "Plutonium", "Osmium", "Di-Lithium Crystal", " Element 115", 'd'),
new Question("What element, other than carbon, do scientists speculate life might evolve around?", "Silicon", "Nitrogen", "Oxygen", "Busmuth", 'a'),
new Question("What is the speed of light, often denoted as 'C', in the vacuum?", "About 300,000 Km per hour", "'C' is not a speed, it has a rate of induction through a medium.", "9.8 meters per second per second", "Einsteins is my hero!", 'b'),
new Question("Whats the name of the largest machine ever made by humans?", "The Great Pyramid of Giza", "The Great Wall of China", "The Large Haydron Collider", "The Laser Interferometer Gravitational Wave Obervatory, LIGO.", 'c'),
new Question("What happened to Galileo after he published his works on heliocentrism after observing the movements of the planets through his telescope?", "The Church ordered him to stop looking through his telescope.",
"The scientific community of the time praised his work did away with the idea of geocentrism.", "The scientific community ignored his work.", "Everyone loved him.", 'a'),
new Question("How many years does it take for the processtion of the Earth's axis to rotate through one acr degree of the zodiac?", "2160 years", "72 years", "100 years", "26000 years", 'b'),
new Question("How tall were the largest (verified to be authentic) giant human skeletons found in north america?", "What kind of tinfoil hat question is this?", "About 9 feet", "Arount 12 feet", " About 36 feet", 'c'),
new Question("Who was recently awarded the title of 'Sexiest Astrophysicist of All Time'?", "Einstein", "Paul LaViolette", "Carl Sagan", "Neil deGrasse Tyson", 'd'),
new Question("How old is the universe according to the Big Bang theory?(the actual theory, not the TV show...)", "18 million years", "13.4 Billion years", "One gazilliontrillion years", "The universe has no age", 'b'),
new Question("Another question:", "1", "2", "3", "4", ''),
new Question("Another question:", "1", "2", "3", "4", ''),
new Question("Another question:", "1", "2", "3", "4", ''),
];


var totesTrivial = {

    gameRunning: false,
    clockRunning: false,
    intervalId: '',
    timeLeft: 25,
    numRight: 0,
    numWrong: 0,
    selectedAnswer: '',
    answerSubmitted: false,
    currentQuestion: {},

    timer: function () {

        this.timeLeft--;
        console.log(this.timeLeft);
        $("#clock").text(`${totesTrivial.timeLeft} sec.`);

    },

    stopTimer: function () {

        clearInterval(totesTrivial.intervalId);
        this.clockRunning = false;

    },

    gameInit: function () {

        this.gameRunning = false;
        this.timer = 25;
        this.numRight = 0;
        this.numWrong = 0;

    },

    // startGame: () => {

    //     this.gameRunning = true;
    //     this.questionLoop();

    // },

    // cycle through each question

    questionLoop: function () {
         
        for (let i = 0; i < questionBank.length; i++) {
            this.timeLeft = 25;
            this.answerSubmitted = false;
            this.clockRunning = true;
            totesTrivial.intervalId = setInterval(this.timer(), 1000);
            this.currentQuestion = questionBank[i];
            
            $("#question").text(this.currentQuestion.q);
            $("#a").text(this.currentQuestion.a);
            $("#b").text(this.currentQuestion.b);
            $("#c").text(this.currentQuestion.c);
            $("#d").text(this.currentQuestion.d);
            
            // setTimeout(this.checkAnswer(), 25000);
        }

        // TODO: after all questions have cycled, show endgame stats page and render button to start a new game

        this.stopTimer();
        setTimeout(this.postGameStats, 4000);

    },

    checkAnswer: function () {

        //if answer not subbmitted before countdown reaches 0 display time up message then advance to next question.

        this.stopTimer();

        if (this.selectedAnswer === null) {
            $("#gameMsg").text('Times Up! No answer selected... =(');
            this.numWrong++;
            $('#num-wrong').text(this.numWrong);

        } else if (this.currentQuestion.answer === this.selectedAnswer) {
            $("#gameMsg").text(`Thats right! The correct answer is: ${this.currentQuestion.answer}`);
            this.numRight++;
            $('#num-right').text(this.numRight);

        } else if (this.currentQuestion.answer !== this.selectedAnswer) {
            $("#gameMsg").text(`Sorry wrong answer! The correct answer is: ${this.currentQuestion.answer}`);
            this.numWrong++;
            $('#num-wrong').text(this.numWrong);

        }
    },

    postGameStats: function() {

        var answersDiv = $('#answerButtons');
        var percentRight = (this.numRight / questionBank.length) * 100;
        answersDiv.empty();
        answersDiv.append(`<h3>Correct answers: ${this.numRight}.</h3> <br><br>`);
        answersDiv.append(`<h3>Incorrect answers: ${this.numwrong}.</h3> <br><br>`);
        answersDiv.append(`<h3>${percentRight}% of the questions were answered correctly.</h3>`);

    },

}

$(document).ready(function () {

    //set a timer to begin the game 5 seconds after page loads.
    setTimeout(totesTrivial.questionLoop(), 5000);

    $(".answerBtn").on("click", function () {
        totesTrivial.selectedAnswer = $(this).attr("id");
        totesTrivial.answerSubmitted = true;
    });

    // submit btn only works if the game is running and some answer button has been clicked.

    $("#submit").on("click", function () {
        if (totesTrivial.gameRunning && totesTrivial.answerSubmitted) {
            totesTrivial.checkAnswer();
        }
    });

});