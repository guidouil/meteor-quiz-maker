Meteor.methods({
  update_email: function (newEmail) {
    var count = Meteor.users.find({'emails.address': newEmail}).count();
    if (count === 0) {
      Meteor.users.update({_id: this.userId()}, {$set: {emails: [{address: newEmail}]}});
      return true;
    }
    return false;
  },
  checkTheAnswer: function (theAnswerId) {
    var theAnswer = Answers.findOne({_id: theAnswerId});
    if (theAnswer && theAnswer.questionId) {
      var question = Questions.findOne({_id: theAnswer.questionId});
      var correctAnswerId = false;
      _.each(question.answers, function(answer) {
        if (answer.correct === true) {
          correctAnswerId = answer._id;
        }
      });
      if (correctAnswerId) {
        var responseIs = false;
        if (correctAnswerId === theAnswer.answerId) {
          responseIs = true;
        }
        Answers.update({_id: theAnswerId}, {$set: {correct: responseIs}});
      }
    }
  },
  resetAnswers: function (quizId) {
    if (Roles.userIsInRole(this.userId(), "admin")) {
      Answers.remove({quizId: quizId});
      Profiles.remove({quizId: quizId});
      Emails.remove({quizId: quizId});
      return true;
    }
  },
  resetAnswer: function (quizId, userId) {
    if (Roles.userIsInRole(this.userId(), "admin")) {
      Answers.remove({quizId: quizId, owner: userId});
      Profiles.remove({quizId: quizId, owner: userId});
      Emails.remove({quizId: quizId, owner: userId});
      return true;
    }
  },
  getUserEmail: function (userId) {
    var email = '';
    var user = Meteor.users.findOne({_id: userId});
    if (user.emails && user.emails.length)
      email = user.emails[0].address;
    if (user.services && user.services.facebook && user.services.facebook.email)
      email = user.services.facebook.email;
    if (user.services && user.services.google && user.services.google.email)
      email = user.services.google.email;
    if (user.services && user.services.twitter && user.services.twitter.email)
      email = user.services.twitter.email;
    var profile = Profiles.findOne({owner: userId}, {sort: {createdAt: -1} });
    if (profile && profile.mail) {
      email = profile.mail;
    }
    return email;
  },
  disableGuestAccounts: function () {
    AccountsGuest.enabled = false;
    return true;
  },
  enableGuestAccounts: function () {
    AccountsGuest.enabled = true;
    return true;
  },
  alreadyPlayed: function (quizId, mail) {
    var profile = Profiles.findOne({quizId: quizId, mail: mail});
    if (profile && profile._id) {
      // Session.set('alreadyPlayed', true);
      return true;
    }
    return false;
  },
  alreadyPlayedOnce: function (quizId, mail) {
    var profileCount = Profiles.find({quizId: quizId, mail: mail}).count();
    if (profileCount > 1) {
      return true;
    }
    return false;
  },
  sendSharedMail: function (quizId) {
    var quiz = Quizzes.findOne({_id: quizId});
    var sharedEmails = Emails.find({quizId: quizId, owner: this.userId, sent: false}).fetch();
    var replyToMail = Meteor.call('getUserEmail',this.userId);
    if (sharedEmails && sharedEmails.length > 0) {
      _.each(sharedEmails, function (sharedEmail) {
        var sendMessage = function (toId, msg) {
          var from = quiz.title;
          var to = sharedEmail.mail;
          var fromEmail = 'no-reply@tefal.fr';
          var toEmail = sharedEmail.mail;
          Email.send({
            from: fromEmail,
            to: toEmail,
            replyTo: replyToMail,
            subject: quiz.mailSubject,
            text: quiz.mailText,
            html: quiz.mailHtml
          });
        };
        sendMessage();
        Emails.update({_id: sharedEmail._id},{$set: {sent: true}});
      });
    }
  }
});
