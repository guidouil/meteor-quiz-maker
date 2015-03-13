Answers = new Meteor.Collection("answers");

//Ground.Collection(Answers);

Answers.allow({
  insert: function (userId, doc) {
    return (userId && doc.owner == userId);
  },
  update: function (userId, doc, fields, modifier) {
    return false;
  },
  remove: function (userId, doc) {
    return (userId && Roles.userIsInRole(userId, 'admin'));
  },
  fetch: ['owner']
});

Answers.deny({
  update: function (userId, doc, fields, modifier) {
    return false;
  },
  fetch: null
});

var Schemas = {};

Schemas.Answers = new SimpleSchema({
  owner: {
    type: String
  },
  quizId: {
    type: String,
    autoform: {
      label: false,
      afFieldInput: {
        type: "hidden"
      }
    }
  },
  questionId: {
    type: String
  },
  answerId: {
    type: String
  },
  correct: {
    type: Boolean,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    },
    autoform :
    {
      omit: true
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true,
    autoform :
    {
      omit: true
    }
  }
});

Answers.attachSchema(Schemas.Answers);
