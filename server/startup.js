Meteor.startup(function () {
  // Creating Admin PreProd
  if (Meteor.users.findOne("QDXmYCJB86Loo3gpG"))
  Roles.addUsersToRoles("QDXmYCJB86Loo3gpG", ['admin']);
  // Creating Admin Dev
  if (Meteor.users.findOne("o3rjuBkEHmpmfaNhP"))
  Roles.addUsersToRoles("o3rjuBkEHmpmfaNhP", ['admin']);
});
