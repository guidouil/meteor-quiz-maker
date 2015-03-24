Template.result.helpers({
  quizId: function(){
    return Iron.controller().getParams().quizId;
  },
  quiz: function(){
    var quizId = Iron.controller().getParams().quizId;
    return Quizzes.findOne({_id: quizId});
  },
  chances: function () {
    var result = {};
    var correctAnswersCount = Answers.find({owner: Meteor.userId(), correct:true}).count();

    if (correctAnswersCount >= 1) {
      result.plural = 's';
    }
    result.count = correctAnswersCount + 1;
    return result;
  }
});

Template.result.rendered = function(){
  Meteor.call('enableGuestAccounts');
};
