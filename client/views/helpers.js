UI.registerHelper('email', function () {
  if(Meteor.user()) {
    var userId = Meteor.userId();
    var profile = Profiles.findOne({owner: userId}, {sort: {createdAt: -1} });
    if (profile && profile.mail) {
      return profile.mail;
    }
    var user = Meteor.user();
    if (user.emails && user.emails.length) {
      // Quick pattch for
      if (user.emails[0].address.search('@example.com') > 0) {
        return null;
      }
      return user.emails[0].address;
    }
    if (user.services && user.services.facebook && user.services.facebook.email) {
      return user.services.facebook.email;
    }
    if (user.services && user.services.google && user.services.google.email) {
      return user.services.google.email;
    }
    if (user.services && user.services.twitter && user.services.twitter.email) {
      return user.services.twitter.email;
    }
    return null;
  }
});

UI.registerHelper('quiz', function(){
  var quizId = Iron.controller().getParams().quizId;
  if (quizId) {
    var quiz = Quizzes.findOne({_id: quizId});
    return quiz;
  }
});

UI.registerHelper('fromNow', function(date){
  if(date !== null) {
    moment.locale(Session.get('language'));
    return moment(date).fromNow();
  }
});

UI.registerHelper('isNotLoggedIn', function () {
  if (Meteor.userId() === null) {
    return true;
  }
  return false;
});
UI.registerHelper('isLoggedIn', function () {
  if (Meteor.userId()) {
    return true;
  }
  return false;
});

UI.registerHelper('isMobile', function () {
  if (Meteor.isCordova) {
    return true;
  } else {
    return false;
  }
});

UI.registerHelper('isAdminUser', function() {
  return Roles.userIsInRole(Meteor.user(), ['admin']);
});

UI.registerHelper('isImage', function (imageId) {
  if (!imageId || imageId === "dummyId") {
    return false;
  }
  return true;
});

UI.registerHelper('getImage', function (imageId) {
  // Meteor.subscribe('Images', imageId);
  var image = Images.findOne({_id: imageId});
  if (image && image.url()) {
    return image.url();
  }
});

UI.registerHelper('isOpen', function () {
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
});
