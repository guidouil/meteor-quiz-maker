Meteor.startup(function () {
  // Creating Admin PreProd
  if (Meteor.users.findOne("LPu2NR3MH2QnmwP6E"))
  Roles.addUsersToRoles("LPu2NR3MH2QnmwP6E", ['admin']);
  // Creating Admin Dev
  if (Meteor.users.findOne("o3rjuBkEHmpmfaNhP"))
  Roles.addUsersToRoles("o3rjuBkEHmpmfaNhP", ['admin']);
});
