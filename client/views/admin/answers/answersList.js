Template.answersList.helpers({
  quizId: function(){
    return Iron.controller().getParams().quizId;
  },
  usersAnswers: function () {
    var questionsCount = Questions.find().count();
    var answers = Answers.find({}).fetch();
    var answersCount = answers.length;
    var usersAnswers = [];
    var userCorrectAnswersCount = 0;
    $.each(answers, function(index, answer) {
      var winner = false;
      if (index === 0) {
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
    return usersAnswers;
  },
  userEmail: function (userId) {
    Meteor.call('getUserEmail', userId, function (error, data) {
      Session.set('email_'+userId, data);
    });
    return Session.get('email_'+userId);
  }
});

Template.answersList.events({
  'click .reset': function(evt, tmpl) {
    evt.preventDefault();
    swal(
      {
        title: "Are you sure ?",
        text: "Reseting answers is final!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Reset",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: true
      },
      function(){
        Meteor.call('resetAnswers');
        swal("Deleted", "The answers have been deleted.", "success");

      }
    );
  }
});
