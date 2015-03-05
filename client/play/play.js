Template.play.helpers({
  questions: function () {
    return Questions.find().fetch();
  },
  isActive: function (order) {
    if (order === 1) {
      return active;
    }
  },
  questionId: function (answerId) {
    var question = Questions.findOne({'answers._id': answerId});
    return question._id;
  },
  answered: function (questionId) {
    return Answers.findOne({owner: Meteor.userId(), questionId: questionId});
  },
  theAnswer: function (questionId) {
    var theAnswer = '';
    var answered = Answers.findOne({owner: Meteor.userId(), questionId: questionId});
    var answerId = answered.answerId;
    var question = Questions.findOne({_id: questionId});
    $.each(question.answers, function(index, answer) {
      if (answer._id === answerId) {
        theAnswer = answer.answer;
      }
    });
    return theAnswer;
  },
  isCorrect: function (questionId) {
    var answer = Answers.findOne({owner: Meteor.userId(), questionId: questionId});
    return answer.correct;
  }

});

Template.play.events({
  'click .validate': function (evt, tmpl) {
    var userId = Meteor.userId();
    var questionId = evt.currentTarget.attributes.id.value;
    var answerId = tmpl.find('input:radio[name='+questionId+']:checked').value;
    console.log({
      owner: userId,
      questionId: questionId,
      answerId: answerId
    });
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
  }
});
