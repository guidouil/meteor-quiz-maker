Template.answersList.helpers({
  quizId: function(){
    return Iron.controller().getParams().quizId;
  },
  questions: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Questions.find({quizId: quizId},{sort: {order: 1}});
  },
  questionsCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Questions.find({quizId: quizId}).count();
  },
  answersCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Answers.find({quizId: quizId}).count();
  },
  profilesCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Profiles.find({quizId: quizId}).count();
  },
  sharesCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Profiles.find({quizId: quizId, fbShared: true}).count();
  },
  usersAnswers: function () {
    var quizId = Iron.controller().getParams().quizId;
    var questionsCount = Questions.find({quizId: quizId}).count();
    var answers = Answers.find({quizId: quizId}, {sort: {owner: 1}}).fetch();
    var answersCount = answers.length;
    var usersAnswers = [];
    var chances = 0;
    var source = [];
    var profile = null;
    $.each(answers, function(index, answer) {
      var winner = false;
      if (index === 0) {
        previousUserId = answer.owner;
      }
      if (previousUserId !== answer.owner) {
        // lets save previous chances
        if (chances === questionsCount) {
          winner = true;
        }
        profile = Profiles.findOne({quizId: quizId, owner: previousUserId});
        if (profile && profile.fbShared) {
          chances += 5;
        }
        usersAnswers.push({user: previousUserId, winChances: chances+1, winner: winner, source: source});
        chances = 0;
        winner = false;
        source = [];
        profile = null;
      }
      source.push(answer);
      if (answer.correct === true) {
        chances += 1;
      }
      previousUserId = answer.owner;
      // for last answer
      if (index+1 === answersCount) {
        // lets save previous chances
        if (chances === questionsCount) {
          winner = true;
        }
        profile = Profiles.findOne({quizId: quizId, owner: previousUserId});
        if (profile && profile.fbShared) {
          chances += 5;
        }
        usersAnswers.push({user: previousUserId, winChances: chances+1, winner: winner, source: source});
      }
    });
    // console.log(usersAnswers);
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
      // looking for other quizzes profiles
      profile = Profiles.findOne({owner: userId});
    }
    if (profile && profile.firstname && profile.lastname && profile.birthdate && profile.city && profile.zip) {
      return  profile.firstname + ' - ' + profile.lastname + ' - ' + profile.birthdate + ' - ' + profile.zip + ' - ' + profile.city;
    }
  },
  fbShared: function (userId) {
    var quizId = Iron.controller().getParams().quizId;
    var profile = Profiles.findOne({owner: userId, quizId: quizId});
    if (profile && profile.fbShared) {
      return true;
    }
    return false;
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
