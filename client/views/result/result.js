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
    var sharedEmailCount = Emails.find({owner: Meteor.userId(), sent: true}).count();
    if (sharedEmailCount > 0) {
      result.count += sharedEmailCount;
    }
    return result;
  },
  profile: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Profiles.findOne({quizId: quizId, owner: Meteor.userId()});
  },
  isOpen: function () {
    var quizId = Iron.controller().getParams().quizId;
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

Template.result.events({
  "click .viewForm": function (e, t) {
    e.preventDefault();
    // Session.set('hideForm', false);
    var quizId = Iron.controller().getParams().quizId;
    Router.go('/form/'+quizId);
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
  },
  "click .sendMails": function (evt, tmpl) {
    evt.preventDefault();
    var quizId = Iron.controller().getParams().quizId;
    $('.sharedMail').each(function (index, mail) {
      console.log($(mail).val());
      var sharedEmail = $(mail).val();
      var existingEmail = Emails.findOne({owner: Meteor.userId(), mail: sharedEmail});
      var countSharedEmail = Emails.find({owner: Meteor.userId()}).count();
      if (!existingEmail && countSharedEmail <= 10) {
        Emails.insert({
          owner: Meteor.userId(),
          quizId: quizId,
          mail: sharedEmail,
          sent: false
        });
      }
      var countNotSentEmail = Emails.find({owner: Meteor.userId(), sent: false}).count();
      if (countNotSentEmail > 0) {
        Meteor.call('sendSharedMail', quizId);
      }
    });
  }
});

Template.result.rendered = function(){
  Meteor.call('enableGuestAccounts');
  Session.set('activeTab', 1);
};
