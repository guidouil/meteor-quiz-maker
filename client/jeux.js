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

Template.layout.onRendered(function () {
  if (Router.current().params.query && Router.current().params.query.mobile === '1') {
    Session.set("mobile", true);
  }
});

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
      version    : 'v2.4'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
 // Facebook sdk - End

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-48461352-4', 'auto');
ga('send', 'pageview');
