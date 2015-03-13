Meteor.startup(function () {
  // First user get admin role
  // console.log(Meteor.users.find({}).count());
  if (Meteor.users.find({}).count() === 1 ) {
    var admin = Meteor.users.findOne({});
    Roles.addUsersToRoles(admin._id, ['admin']);
  }
});
