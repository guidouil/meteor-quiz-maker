Template.profile.events({
  'click .logout': function (evt, tmpl) {
    evt.preventDefault();
    Meteor.logout();
    Router.go('home');
  },
  'click .save': function (evt, tmpl) {
    evt.preventDefault();
    var user = Meteor.user();
    var inputName = tmpl.find('#inputName').value.trim();
    if (inputName !== '' && (!user.profile || user.profile.name !== inputName)) {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.name': inputName}});
    }
    var inputMail = tmpl.find('#inputMail').value.trim();
    if (inputMail !== '' && inputMail !== user.emails[0].address) {
      Meteor.call('update_email', inputMail);
    }
  }
});

Template.profile.helpers({
  username: function () {
    var user =  Meteor.user();
    if (user && user.name) {
      return user.profile.name;
    }
  },
  usermail: function () {
    var user =  Meteor.user();
    return user.emails[0].address;
  }
});
