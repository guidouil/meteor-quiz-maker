Template.play.helpers({
  questions: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Questions.find({quizId: quizId}, {sort: {order: 1}}).fetch();
  },
  lastOrder: function () {
    var quizId = Iron.controller().getParams().quizId;
    var questionsCount = Questions.find({quizId: quizId}).count();
    return questionsCount+1;
  },
  isActive: function (order) {
    var quizId = Iron.controller().getParams().quizId;
    var answersCount = Answers.find({quizId: quizId, owner: Meteor.userId()}).count();
    if (answersCount && answersCount > 0) {
      var activeTab = answersCount+1;
      Session.set('activeTab', activeTab);
    } else {
      Session.set('activeTab', 1);
    }
    if (order == Session.get('activeTab')) {
      return 'active';
    }

  },
  questionId: function (answerId) {
    var question = Questions.findOne({'answers._id': answerId});
    return question._id;
  },
  isAnswered: function (questionId) {
    if (questionId) {
      return Answers.findOne({owner: Meteor.userId(), questionId: questionId});
    }
  },
  theAnswer: function (questionId) {
    if (questionId) {
      var theAnswer = '';
      var answered = Answers.findOne({owner: Meteor.userId(), questionId: questionId});
      if (answered && answered.answerId) {
        var answerId = answered.answerId;
        var question = Questions.findOne({_id: questionId});
        $.each(question.answers, function(index, answer) {
          if (answer._id === answerId) {
            theAnswer = answer.answer;
          }
        });
        return theAnswer;
      }
    }
  },
  isCorrect: function (questionId) {
    var answer = Answers.findOne({owner: Meteor.userId(), questionId: questionId});
    if (answer && answer.correct) {
      return answer.correct;
    }
  },
  isWinner: function () {
    var quizId = Iron.controller().getParams().quizId;
    var questionsCount = Questions.find({quizId: quizId}).count();
    var correctAnswersCount = Answers.find({quizId: quizId, owner: Meteor.userId(), correct:true}).count();
    if (questionsCount === correctAnswersCount) {
      return true;
    }
    return false;
  },
  allAnswered: function () {
    var quizId = Iron.controller().getParams().quizId;
    var questionsCount = Questions.find({quizId: quizId}).count();
    var answersCount = Answers.find({quizId: quizId,owner: Meteor.userId()}).count();
    if (questionsCount === answersCount) {
      $('#myTab a:last').tab('show');
      return true;
    }
    return false;
  },
  icheck: function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_flat-red',
      radioClass: 'iradio_flat-red'
    });
  }
});

Template.play.events({
  'click .validate': function (evt, tmpl) {
    var quizId = Iron.controller().getParams().quizId;
    var userId = Meteor.userId();
    var questionId = evt.currentTarget.attributes.id.value;
    var question = Questions.findOne({_id: questionId});
    var answerId = tmpl.find('input:radio[name='+questionId+']:checked').value;
    if (userId && questionId && answerId) {
      var theAnswerId = Answers.insert({
        owner: userId,
        quizId: quizId,
        questionId: questionId,
        answerId: answerId
      });
      if (theAnswerId) {
        Meteor.call('checkTheAnswer', theAnswerId);
      }
    }
    var questionsCount = Questions.find().count();
    var answersCount = Answers.find({owner: Meteor.userId()}).count();
    if (questionsCount === answersCount) {
      // all questions are answered
      Session.set('activeTab', questionsCount + 1);
      window.location.reload();
    } else {
      Session.set('activeTab', question.order + 1);
    }
  },
  'submit #profileInsert': function (evt, tmpl) {

  }
});

Template.play.rendered = function () {
  Meteor.call('enableGuestAccounts');
  if ($('#birthdate')) {
    $('#birthdate').datepicker({
      format: "dd/mm/yyyy",
      startView: 2,
      orientation: "bottom auto",
      autoclose: true,
      language: 'fr',
      defaultViewDate: {
        year: 1990,
        month: 1,
        day: 1
      }
    });
  }

};
