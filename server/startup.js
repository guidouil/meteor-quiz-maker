Meteor.startup(function () {
  // First user get admin role
  // console.log(Meteor.users.find({}).count());
  if (Meteor.users.find({}).count() === 1 ) {
    var admin = Meteor.users.findOne({});
    Roles.addUsersToRoles(admin._id, ['admin']);
  }
  Kadira.connect('kTJmnfX58yxDeHpyP', 'cf6c8c53-8765-4863-a1ba-2c631f97d042');
});
