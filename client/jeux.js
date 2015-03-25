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

// Facebook sdk - start
window.fbAsyncInit = function() {
  FB.init({
    appId      : '416260791889799',
    xfbml      : true,
    version    : 'v2.3'
  });

  // ADD ADDITIONAL FACEBOOK CODE HERE
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/fr_FR/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
 // Facebook sdk - End
