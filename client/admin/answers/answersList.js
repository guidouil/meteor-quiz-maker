Template.answersList.helpers({
  usersAnswers: function () {
    var questionsCount = Questions.find().count();
    var answers = Answers.find({}).fetch();
    var answersCount = answers.length;
    var usersAnswers = [];
    var userCorrectAnswersCount = 0;
    var previousUser = false;
    $.each(answers, function(index, answer) {
      var winner = false;
      if (previousUser === false) {
        previousUser = answer.owner;
      }

      if (previousUser !== answer.owner) {
        // lets save previous userCorrectAnswersCount
        if (userCorrectAnswersCount === questionsCount) {
          winner = true;
        }
        usersAnswers.push({user: previousUser, correctAnswersCount: userCorrectAnswersCount, winner: winner});
        userCorrectAnswersCount = 0;
        winner = false;
      }
      if (answer.correct === true) {
        userCorrectAnswersCount += 1;
      }
      previousUser = answer.owner;
      // for last answer
      if (index+1 === answersCount) {
        // lets save previous userCorrectAnswersCount
        if (userCorrectAnswersCount === questionsCount) {
          winner = true;
        }
        usersAnswers.push({user: previousUser, correctAnswersCount: userCorrectAnswersCount, winner: winner});
      }
    });
    console.log(usersAnswers);
    return usersAnswers;
  }
});
