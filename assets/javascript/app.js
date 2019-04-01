function Question(q, a, b, c, d, answer) {
    q = this.q;
    a = this.a;
    b = this.b;
    c = this.c;
    d = this.d;
    answer = this.answer;
}

let questionBank = [q1 = new Question("What is the meaning of Life?", "There is no meaning to life", "To be happy", "To break the wheel of karma", "42", d),
q2 = new Question("What piece of sports equipment is actully a truncated icosahedron?", "Uh, I flunced geometry in highschool...", "A hockey puck", "A soccer ball", "None of the above", c),
q3 = new Question("How many Plutonic solids are there?", "Seven", "Five", "Twenty", "What is this pseudoscience nonsense!?", b),
q4 = new Question("What element is allegedly used in the antigravity propulsion systems studied by Robert Lazar at the Los Alamos National Labs in New Mexico?", "Plutonium", "Osmium", "Di-Lithium Crystal", " Element 115", d),
q5 = new Question("What element, other than carbon, do scientists speculate life might evolve around?", "Silicon", "Nitrogen", "Oxygen", "Busmuth", a),
g6 = new Question("What is the speed of light in the vacuum?", "About 300,000 Km per hour", "Light does not have a speed, it has a rate of induction through a medium.", "9.8 meters per second per second", "Einsteins lame...", b),
q7 = new Question("Whats the name of the largest machine ever made by humans?", "The Great Pyramid of Giza", "The Great Wall of China", "The Large Haydron Collider", "", c),
q8 = new Question("Another question:", "1", "2", "3", "4", a),
q9 = new Question("Another question:", "1", "2", "3", "4", a),
q10 = new Question("Another question:", "1", "2", "3", "4", a),
q11 = new Question("Another question:", "1", "2", "3", "4", a),
q12 = new Question("Another question:", "1", "2", "3", "4", a),
q13 = new Question("Another question:", "1", "2", "3", "4", a),
q14 = new Question("Another question:", "1", "2", "3", "4", a),
q15 = new Question("Another question:", "1", "2", "3", "4", a)],

var totesTrivial = {
    gameRunning: false,
    clockRunning: false,
    intervalId: '',
    timeLeft: 25,
    numRight: 0,
    numWrong: 0,
    selectedAnswer: '',
    currentQuestion: {},
    
    timer: () => {

        this.timeLeft--;
        $("#clock").text(`${this.timeLeft} sec.`);

    },

    stopTimer: () => {

        clearInterval(this.intervalId);
        this.clockRunning = false;
        
    },
    
    gameInit: () => {

        this.gameRunning = false;
        this.timer = 25;
        this.numRight = 0;
        this.numWrong = 0;

    },

    startGame: () => {
        
        this.gameRunning = true;
        this.questionLoop();
        
    },


    // cycle through each question 
    questionLoop: () => {

        // Display question timer
        for (let i = 0; i < questionBank.length; i++) {
            this.clockRunning = true;
            this.intervalId = setInterval(this.timer(), 1000);
            this.currentQuestion = questionBank[i];
            console.log(this.currentQuestion);


            $("#question").text(this.currentQuestion.q);
            $("#a").text(this.currentQuestion.a);
            $("#b").text(this.currentQuestion.b);
            $("#c").text(this.currentQuestion.c);
            $("#d").text(this.currentQuestion.d);

        }

        if (this.timeLeft === 0) {
            this.stopTimer();
            this.checkAnswer();
        }

    },


    checkAnswer: () => {
        //if answer not subbmitted before countdown reaches 0 display time up Alert. Advance to next page.

        this.stopTimer();
        if ((this.selectedAnswer === null) && (this.count === 0)) {
            $("#gameMsg").text('Times Up!');
            this.timer = 25;
            this.questionLoop();

        } else if (currentQuestion.answer === selectedAnswer) {
            this.numRight++;
            $('#num-right').text(this.numRight);
        } else if (currentQuestion.answer !== selectedAnswer) {
            this.numWrong++;
            $('#num-wrong').text(this.numWrong);
        }
    },


    // after all questions have cycled, show endgame stats page and render button to start a new game
}


$(document).ready(function () {

    setTimeout(totesTrivial.startGame, 5000);


    $(".answerBtn").on("click", function () {
        totesTrivial.selectedAnswer = $(this).attr("id");
    })

    $("#submit").on("click", function (event) {
        event.preventDefault();
        totesTrivial.checkAnswer();
    })

});