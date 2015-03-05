Meteor.publish('Questions', function () {
  if (Roles.userIsInRole(this.userId, "admin")) {
    return Questions.find({}, {$sort: {order: 1}});
  } else {
    return Questions.find({}, {$sort: {order: 1}}, {fields: {'answers.correct': 0}});
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

Meteor.publish('UsersData', function () {
  if (Roles.userIsInRole(this.userId, "admin")) {
    return Meteor.users.find({});
  } else {
    return false;
  }
});
