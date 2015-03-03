Meteor.subscribe('Images');

getUserLanguage = function () {
  var language = window.navigator.userLanguage || window.navigator.language;
  if (language.length > 2) {
    language = language.substring(0,2).toLowerCase();
  }
  Session.set('language', language);
  // Session.set('language', 'fr');
  return language;
};

Meteor.startup(function () {

  T9n.setLanguage('fr');

  // Session.set("showLoadingIndicator", true);
  //
  // TAPi18n.setLanguage(Session.get('language'))
  //   .done(function () {
  //     Session.set("showLoadingIndicator", false);
  //   })
  //   .fail(function (error_message) {
  //     // Handle the situation
  //     console.log(error_message);
  //   });
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
