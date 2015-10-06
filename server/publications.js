Meteor.publish('Quizzes', function () {
  return Quizzes.find({}, {reactive: true});
});

Meteor.publish('Profiles', function () {
  return Profiles.find({owner: this.userId}, {reactive: true});
});
Meteor.publish('AllProfiles', function (quizId, limit) {
  if (Roles.userIsInRole(this.userId, "admin")) {
    return Profiles.find({quizId: quizId}, {$limit: limit});
  }
});

Meteor.publish('Admin', function (quizId) {
  if (Roles.userIsInRole(this.userId, "admin")) {
    Counts.publish(this, 'profilesCount', Profiles.find({quizId: quizId}));
    Counts.publish(this, 'fbSharesCount', Profiles.find({quizId: quizId, fbShared: true}));
    Counts.publish(this, 'emailSharesCount', Emails.find({quizId: quizId, sent: true}));
  }
});

Meteor.publish('Citys', function () {
  return Citys.find({}, {reactive: true});
});

Meteor.publish('Questions', function (quizId) {
  var questionsCount = Questions.find({quizId: quizId}, {reactive: true}).count();
  var answersCount = Answers.find({quizId: quizId, owner: this.userId}, {reactive: true}).count();

  if (Roles.userIsInRole(this.userId, "admin") || (questionsCount > 0 && questionsCount === answersCount)) {
    return Questions.find({quizId: quizId}, {reactive: true});
  } else {
    return Questions.find({quizId: quizId}, {fields: {'answers.correct': 0}}, {reactive: true});
  }
  // return Questions.find({quizId: quizId}, {reactive: true});
});

Meteor.publish('Answers', function (quizId) {
  return Answers.find({quizId: quizId, owner: this.userId}, {reactive: true});
  // if (Roles.userIsInRole(this.userId, "admin")) {
  //   return Answers.find({quizId: quizId}, {sort: {owner: 1}}, {reactive: true});
  // } else {
  // }
});

Meteor.publish('Emails', function (quizId) {
  if (Roles.userIsInRole(this.userId, "admin")) {
    return Emails.find({quizId: quizId}, {reactive: true});
  } else {
    return Emails.find({quizId: quizId, owner: this.userId}, {reactive: true});
  }
});

// Meteor.publish('UsersData', function () {
//   if (Roles.userIsInRole(this.userId, "admin")) {
//     return Meteor.users.find({});
//   } else {
//     return false;
//   }
// });
