Template.result.helpers({
  quizId: function(){
    return Iron.controller().getParams().quizId;
  },
  quiz: function(){
    var quizId = Iron.controller().getParams().quizId;
    return Quizzes.findOne({_id: quizId});
  },
  chances: function () {
    var quizId = Iron.controller().getParams().quizId;
    var result = {};
    var profile = Profiles.findOne({quizId: quizId, owner: Meteor.userId()});
    var correctAnswersCount = Answers.find({quizId: quizId, owner: Meteor.userId(), correct:true}).count();
    if (correctAnswersCount >= 1) {
      result.plural = 's';
    }
    result.count = correctAnswersCount + 1;
    if (profile && profile.fbShared) {
      result.count += 5;
    }
    return result;
  },
  profile: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Profiles.findOne({quizId: quizId, owner: Meteor.userId()});
  }
});

Template.result.events({
  "click .viewForm": function (e, t) {
    e.preventDefault();
    Session.set('hideForm', false);
  },
  "click .fbShare": function(e, t){
    e.preventDefault();
    var quizId = Iron.controller().getParams().quizId;
    var quiz = Quizzes.findOne({_id: quizId});
    FB.ui(
      {
        method: 'feed',
        name: quiz.title,
        link: quiz.sharedUrl||Meteor.absoluteUrl('play/'+quiz._id),
        picture: quiz.sharedImage,
        caption: quiz.sharedCaption,
        description: quiz.sharedDescription
      },
      function(response) {
        if (response && response.post_id) {
          var profile = Profiles.findOne({quizId: quizId, owner: Meteor.userId()});
          if (profile && profile._id) {
            Profiles.update({_id: profile._id}, {$set: {fbShared: true}});
            // console.log('Post was published.');
          }
        } else {
          console.log('Post was not published.');
        }
      }
    );
  }
});

Template.result.rendered = function(){
  Meteor.call('enableGuestAccounts');
};
