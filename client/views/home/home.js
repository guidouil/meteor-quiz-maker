Template.home.helpers({
  quizzes: function () {
    return Quizzes.find({});
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
