Template.home.helpers({
  quizzes: function () {
    return Quizzes.find();
  },
  isOpen: function (quizId) {
    var quiz = Quizzes.findOne({_id: quizId});
    console.log(quiz);
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
};
