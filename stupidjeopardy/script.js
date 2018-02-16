//dollar sign is a jQuery thing
//calls function after page is loaded

$(document).ready(function() {

  answerDiv.submit();

});

function newQuestion(callback) {
  var offset = Math.floor(Math.random() * 300);
  var myurl= "http://jservice.io/api/clues?category=136&offset=" + offset;
  var b;
  $.ajax({
    url : myurl,
    dataType : "json",
    success : function(json) {
      q = json[1];
      // console.log(q);
      var results = "";

      results += '<h4>' + q.question + "</h4>";
      results += "<p>"
      results += q.value + " points"
      results += "</p>"

      $("#questionDiv").html(results);

      b = {points: q.value, answer: q.answer};
      callback(b);
    }
  });

}

var answerDiv = new Vue({
  el: '#answerDiv',
  data: {
    submitSeen : true,
    nextSeen: false,
    input: '',
    yourAnswer : '',//your answer
    cAnswer : '', //holder for correctAnswer because the display needs to be delayed
    answerResult : '',
    pointValue : 0,
    score : 0,
    numCorrect : 0,
    numAnswered : 0,
    percent : 0,
    nextQuestion : false,
    buttonMessage : 'Submit',
  },

  methods: {
    submit: function(event) {
      if (event) { event.preventDefault(); }
      if (this.nextQuestion == true) {

        if (this.input == '') {
          this.answerResult = "No answer given";
          return;
        }
        this.yourAnswer = this.input;
        this.input = '';

        $("#correctSpan").html(cAnswer);

        this.buttonMessage = "Next Question";

        if (isRight(this.yourAnswer,cAnswer)) {
          this.answerResult = "Correct!";

          this.numCorrect++;
          this.numAnswered++;
          this.score += pointValue;

          this.percent = Math.round(100 * this.numCorrect / this.numAnswered, 1);
        }
        else {
          this.answerResult = "Wrong!";

          this.score -= pointValue;

          this.numAnswered++;
          this.percent = Math.round(100 * this.numCorrect / this.numAnswered, 1);
        }

        this.nextQuestion = false;
      }
      else {
        newQuestion(function(cb) {
          this.cAnswer = cb.answer;
          this.pointValue = cb.points;

          console.log(cb.answer);
        });

        this.buttonMessage = "Submit";

        this.answerResult = "";

        this.nextQuestion = true;
      }
    },
  }
})

function isRight(y, c) { //y = youranswer, c = correctanswer
  y = y.toLowerCase();
  y = y.replace(/[^0-9a-z]/gi, '').replace('the','')
  c = c.toLowerCase();
  c = c.replace(/[^0-9a-z]/gi, '')

  // console.log(c);
  // console.log(y);

  if (y == c) {
    return true;
  }

  if (y.indexOf(c) !== -1) {
    return true;
  }

  if (c.indexOf(y) !== -1) {
    return true;
  }


  return false;

}
