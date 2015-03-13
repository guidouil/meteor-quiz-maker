Template.footer.events({
  'click .logout': function () {
    Meteor.logout();
  }
});

Template.footer.helpers({
  email: function () {
    if(Meteor.user()) {
      user = Meteor.user();
      if (user.emails && user.emails.length)
        return user.emails[0].address;
      if (user.services && user.services.facebook && user.services.facebook.email)
        return user.services.facebook.email;
      if (user.services && user.services.google && user.services.google.email)
        return user.services.google.email;
      if (user.services && user.services.twitter && user.services.twitter.email)
        return user.services.twitter.email;
      return null;
    }
  }
});
