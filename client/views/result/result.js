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
    // result.count = correctAnswersCount + 1;
    result.count = 1;
    if (profile && profile.fbShared) {
      result.count += 5;
    }
    var sharedEmailCount = Emails.find({owner: Meteor.userId(), sent: true, quizId: quizId}).count();
    if (sharedEmailCount > 0) {
      result.count += sharedEmailCount;
    }
    if (result.count > 1) {
      result.plural = 's';
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
  },
  sharedEmail: function () {
    var quizId = Iron.controller().getParams().quizId;
    var count = Emails.find({owner: Meteor.userId(), sent: true, quizId: quizId}).count();
    var plural = '';
    if (count > 0) {
      if (count > 1) {
        plural = 's';
      }
      return {count: count, plural: plural};
    }
    return false;
  },
  resultPhrase: function () {
    if (Session.get('hideForm') === false) {
      return false;
    }
    var quizId = Iron.controller().getParams().quizId;
    var questionsCount = Questions.find({quizId: quizId}).count();
    var correctAnswersCount = Answers.find({quizId: quizId, owner: Meteor.userId(), correct:true}).count();
    var phrase = 'Vous devez d\'abord valider toutes vos réponses.';
    switch (correctAnswersCount) {
      case 0:
        phrase = "Fatigué ?  Revoyez votre leçon... Consultez la fiche produit sur <a href='http://www.tefal.fr/Cuisson-%C3%A0-table/Gril-viande/OptiGrill/p/7211001395' target='_blanck'>tefal.fr</a>";
        break;
      case 1:
        phrase = "Vous auriez pu faire mieux...";
        break;
      case questionsCount:
        phrase = "Bravo, vous êtes incollable sur l'OptiGrill";
        break;
      default:
        phrase = "Vous avez " + correctAnswersCount + " bonnes réponses sur " + questionsCount;
        break;
    }
    return phrase;
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
      $(mail).val('');
    });
  }
});

Template.result.rendered = function(){
  Meteor.call('enableGuestAccounts');
  Session.set('activeTab', 1);
};

Template.mailShareModal.helpers({
  sharedEmail: function () {
    var quizId = Iron.controller().getParams().quizId;
    var count = Emails.find({owner: Meteor.userId(), sent: true, quizId: quizId}).count();
    var plural = '';
    if (count > 0) {
      if (count > 1) {
        plural = 's';
      }
      return {count: count, plural: plural};
    }
    return false;
  }
});
