Meteor.publish('Questions', function () {
  var questionsCount = Questions.find().count();
  var answersCount = Answers.find({owner: this.userId}).count();

  if (Roles.userIsInRole(this.userId, "admin") || (questionsCount > 0 && questionsCount === answersCount)) {
    console.log('yaya');
    return Questions.find({});
  } else {
    return Questions.find({}, {fields: {'answers.correct': 0}});
  }
});

Meteor.publish('Images', function () {
  return Images.find({});
});

Meteor.publish('Answers', function () {
  if (Roles.userIsInRole(this.userId, "admin")) {
    return Answers.find({}, {$sort: {owner: 1}});
  } else {
    return Answers.find({owner: this.userId}, {$sort: {owner: 1}});
  }
});

// Meteor.publish('UsersData', function () {
//   if (Roles.userIsInRole(this.userId, "admin")) {
//     return Meteor.users.find({});
//   } else {
//     return false;
//   }
// });
