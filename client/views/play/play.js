Template.play.helpers({
  quiz: function(){
    var quizId = Iron.controller().getParams().quizId;
    return Quizzes.findOne({_id: quizId});
  },
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
    var questionsCount = Questions.find({quizId: quizId}).count();
    var answersCount = Answers.find({quizId: quizId, owner: Meteor.userId()}).count();
    if (answersCount && answersCount > 0 && answersCount < questionsCount) {
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
      // $('#myTab a:last').tab('show');
      return true;
    }
    return false;
  },
  icheck: function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_flat-red',
      radioClass: 'iradio_flat-red'
    });
  },
  profile: function () {
    if (Session.get('hideForm') === true) {
      return true;
    }
    if (Session.get('hideForm') === false) {
      return false;
    }
    var quizId = Iron.controller().getParams().quizId;
    var profile = Profiles.findOne({quizId: quizId, owner: Meteor.userId()});
    if (profile && profile.city) {
      Session.set('hideForm', true);
      return true;
    }
    return false;
  },
  isLastQuestion: function (order) {
    var quizId = Iron.controller().getParams().quizId;
    var questionsCount = Questions.find({quizId: quizId}).count();
    if (order === questionsCount) {
      return true;
    }
    return false;
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
      Router.go('/form/'+quizId);
    } else {
      Session.set('activeTab', question.order + 1);
    }
  }
});

Template.play.rendered = function () {
  Meteor.call('enableGuestAccounts');
};
