Template.login.events({
  "click [data-action=logout]": function(e, t){
    e.preventDefault();
    Meteor.call('disableGuestAccounts', function (err, res) {
      if (!err) {
        Meteor.logout();
      }
    });
  }
});
