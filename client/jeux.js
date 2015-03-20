Meteor.subscribe('Quizzes');

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

  T9n.setLanguage(Session.get('language'));
  // T9n.setLanguage(getUserLanguage());
  // T9n.setLanguage('fr');

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
