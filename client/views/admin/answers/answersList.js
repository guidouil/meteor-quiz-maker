Template.answersList.helpers({
  quizId: function(){
    return Iron.controller().getParams().quizId;
  },
  questions: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Questions.find({quizId: quizId},{sort: {order: 1}});
  },
  usersAnswers: function () {
    var questionsCount = Questions.find().count();
    var answers = Answers.find({},{sort: {owner: 1}}).fetch();
    var answersCount = answers.length;
    var usersAnswers = [];
    var userCorrectAnswersCount = 0;
    var source = [];
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
        usersAnswers.push({user: previousUser, correctAnswersCount: userCorrectAnswersCount+1, winner: winner, source: source});
        userCorrectAnswersCount = 0;
        winner = false;
        source = [];
      }
      source.push(answer);
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
        usersAnswers.push({user: previousUser, correctAnswersCount: userCorrectAnswersCount+1, winner: winner, source: source});
      }
    });
    return usersAnswers;
  },
  userEmail: function (userId) {
    Meteor.call('getUserEmail', userId, function (error, data) {
      Session.set('email_'+userId, data);
    });
    return Session.get('email_'+userId);
  },
  chances: function (userId) {
    var quizId = Iron.controller().getParams().quizId;
    var correctAnswersCount = Answers.find({quizId: quizId, owner: userId}).count();
    return correctAnswersCount + 1;
  },
  questionsAnswered: function (userId) {
    var quizId = Iron.controller().getParams().quizId;
    var questions = Questions.find({quizId: quizId},{sort: {order: 1}}).fetch();
    var questionsAnswered = [];
    $.each(questions, function (index, question) {

      var answer = Answers.findOne({questionId: question._id, owner: userId});
      if (answer) {
        if (answer.correct) {
          questionsAnswered.push({'icon': 'check'});
        } else {
          questionsAnswered.push({'icon': 'times'});
        }
      } else {
        questionsAnswered.push({'icon': 'minus'});
      }
    });
    return questionsAnswered;
  },
  profile: function (userId) {
    var quizId = Iron.controller().getParams().quizId;
    var profile = Profiles.findOne({owner: userId, quizId: quizId});
    if (!profile) {
      profile = Profiles.findOne({owner: Meteor.userId()});
    }
    if (profile && profile.city && profile.zip) {
      return profile.city + ' - ' + profile.zip;
    }
  }
});

Template.answersList.events({
  'click .reset-all': function(evt, tmpl) {
    evt.preventDefault();
    var quizId = Iron.controller().getParams().quizId;
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
        Meteor.call('resetAnswers', quizId);
        swal("Deleted", "The answers have been deleted.", "success");

      }
    );
  },
  'click .reset': function(evt, tmpl) {
    evt.preventDefault();
    var quizId = Iron.controller().getParams().quizId;
    var userId = evt.currentTarget.attributes.id.value;
    swal(
      {
        title: "Are you sure ?",
        text: "Reseting user answer is final!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Reset",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: true
      },
      function(){
        Meteor.call('resetAnswer', quizId, userId);
        swal("Deleted", "This user answers have been deleted.", "success");

      }
    );
  }
});
