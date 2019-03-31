function Question(q, a, b, c, d, answer) {
    q = this.q;
    a = this.a;
    b = this.b;
    c = this.c;
    d = this.d;
    answer = this.answer;
}

const questionBank = [q1 = new Question("What is my favorite color?", "red", "yellow", "green", "blue", c),
                q2 = new Question("Another question:", "1", "2", "3", "4", a), 
                q3 = new Question("what do you seek?", "the holy grail", "cake", "ale", "cookies", a)];

var totesTrivial = {
    gameRunning: false,
    isThinking: false,
    intervalId: "",
    count: 15,
    numRight: 0,
    numWrong: 0,
    selectedAnswer: "",
    currentQuestion: "",

    gameStart: function () {

        this.gameOn = true;
        this.questionLoop();

    },
    // cycle through each question 

    questionLoop: () => {

        // Display question timer
        for (let i = 0; i <= triviaQs.length; i++) {
            this.isThinking = true;
            this.intervalId = setInterval(this.countdown(), 1000);
            this.currentQuestion = triviaQs[i];
            console.log(this.currentQuestion);


            $("#question").text(this.currentQuestion.q);
            $("#aText").text(this.currentQuestion.a);
            $("#bText").text(this.currentQuestion.b);
            $("#cText").text(this.currentQuestion.c);
            $("#dText").text(this.currentQuestion.d);
            $("#rightAnswer").html(`<img ${this.currentQuestion.rightA} />`);
            $("#wrongAnswer").html(`<img ${this.currentQuestion.wrongA} />`);

        }

        // if (this.count === 0) {
        //     this.isThinking = false;
        //     this.checkAnswer();
        // }
    },

    timer: () => {
        this.count--;
        $("#clock").text(`00:${this.count}`);
    },


    checkAnswer: () => {
        clearInterval(this.intervalId);
        //if answer not subbmitter before countdown reaches 0 display time up Alert. Advance to next page.
        this.isThinking = false;
        if ((this.selectedAnswer === null) && (this.count === 0)) {
            $("#timeUp").show;
            this.count = 15;
            this.questionLoop();
            // in answer is 
        } else if (currentQuestion.answer === selectedAnswer) {
            $("#rightAnswer").show;
        } else if (currentQuestion.answer != selectedAnswer) {
            $("wrongAnswer").show;
        }
    },


    // after all questions have cycled, show endgame stats page and render button to start a new game
    gameInit: () => {
        this.gameOn = false;
        this.count = 20;
        this.numRight = 0;
        this.numWrong = 0;

    },
}

// for (let key in totesTrivial) {
//     if (typeof totesTrivial[key] == 'function') {
//         totesTrivial[key] = totesTrivial[key].bind(totesTrivial);
//     }
// }

$(document).ready(function () {

    setTimeout(totesTrivial.gameStart, 5000);


    $(".radioBtn").on("click", function () {
        totesTrivial.selectedAnswer = $(this).attr("id");
    })

    $("#submitA").on("click", function (event) {
        event.preventDefault();
        totesTrivial.checkAnswer();
    })

});