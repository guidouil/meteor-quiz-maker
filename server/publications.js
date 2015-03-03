Meteor.publish('Questions', function () {
  return Questions.find({});
});

Meteor.publish('Images', function () {
  return Images.find({});
});
