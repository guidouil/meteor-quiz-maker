Template.home.helpers({
  quizzes: function () {
    return Quizzes.find();
  },
  isOpen: function (quizId) {
    var quiz = Quizzes.findOne({_id: quizId});
    if (!quiz || !quiz.startDate) {
      return true;
    } else {
      var now = new Date();
      if (quiz.startDate <= now && (!quiz.endDate || quiz.endDate >= now) ) {
        return true;
      }
      return false;
    }
  }
});

// Template.home.events({
//   'click a': function() {
//     $('html, body').animate({ scrollTop: 0 }, 'slow');
//   }
// });
Template.home.rendered = function(){
  Meteor.call('enableGuestAccounts');
  var quizId = Iron.controller().getParams().quizId;
  if (Meteor.userId() && quizId) {
    var questionsCount = Questions.find().count();
    var answersCount = Answers.find({owner: Meteor.userId()}).count();
    if (questionsCount === answersCount) {
      // all questions are answered
      Router.go('/result/'+quizId);
    }
  }
};
