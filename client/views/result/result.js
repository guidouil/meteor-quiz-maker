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

Template.result.events({
  "click .fbShare": function(e, t){
    e.preventDefault();
    var quizId = Iron.controller().getParams().quizId;
    var quiz = Quizzes.findOne({_id: quizId});
    FB.ui(
      {
        method: 'feed',
        name: quiz.title,
        link: Meteor.absoluteUrl('play/'+quiz._id),
        picture: quiz.sharedImage,
        caption: quiz.sharedCaption,
        description: quiz.sharedDescription
      },
      function(response) {
        if (response && response.post_id) {
          alert('Post was published.');
        } else {
          alert('Post was not published.');
        }
      }
    );
  }
});

Template.result.rendered = function(){
  Meteor.call('enableGuestAccounts');
};
