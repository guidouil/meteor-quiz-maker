Template.play.helpers({
  questions: function () {
    return Questions.find({}, {sort: {order: 1}}).fetch();
  },
  isActive: function (order) {
    var answersCount = Answers.find({owner: Meteor.userId()}).count();
    if (answersCount && answersCount > 0) {
      Session.set('activeTab', answersCount+1);
    }
    if (!Session.get('activeTab')) {
      Session.set('activeTab', 1);
    }
    if (order === Session.get('activeTab')) {
      return 'active';
    }
  },
  questionId: function (answerId) {
    var question = Questions.findOne({'answers._id': answerId});
    return question._id;
  },
  answered: function (questionId) {
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
  isChecked: function (answerId) {
      var question = Questions.findOne({'answers._id': answerId});
      var answer = Answers.findOne({owner: Meteor.userId(), questionId: question._id});
      if (answer.answerId === answerId) {
        return 'checked';
      }
  },
  lastOrder: function () {
      var question = Questions.findOne({}, {sort: {order: -1}});
      if (question && question.order) {
        return question.order + 1;
      }
  },
  isWinner: function () {
    var questionsCount = Questions.find().count();
    var correctAnswersCount = Answers.find({owner: Meteor.userId(), correct:true}).count();
    if (questionsCount === correctAnswersCount) {
      return true;
    }
    return false;
  },
  allAnswered: function () {
    var questionsCount = Questions.find().count();
    var answersCount = Answers.find({owner: Meteor.userId()}).count();
    if (questionsCount === answersCount) {
      return true;
      $('#myTab a:last').tab('show');
    }
    return false;
  }

});

Template.play.events({
  'click .validate': function (evt, tmpl) {
    var userId = Meteor.userId();
    var questionId = evt.currentTarget.attributes.id.value;
    var question = Questions.findOne({_id: questionId});
    var answerId = tmpl.find('input:radio[name='+questionId+']:checked').value;
    if (userId && questionId && answerId) {
      var theAnswerId = Answers.insert({
        owner: userId,
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
      window.location.reload();
      Session.set('activeTab', questionsCount + 1);
    }
    Session.set('activeTab', question.order + 1);
  }
});

Template.play.rendered = function () {

};
