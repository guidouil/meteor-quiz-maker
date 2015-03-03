Meteor.publish('Questions', function () {
  return Questions.find({});
});
