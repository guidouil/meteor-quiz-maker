Questions = new Meteor.Collection('questions');

//Ground.Collection(Questions);

Questions.allow({
  insert: function (userId, doc) {
    return (userId && Roles.userIsInRole(userId, 'admin'));
  },
  update: function (userId, doc, fields, modifier) {
    return (userId && Roles.userIsInRole(userId, 'admin'));
  },
  remove: function (userId, doc) {
    return (userId && Roles.userIsInRole(userId, 'admin'));
  }
});

Questions.deny({
  update: function (userId, doc, fields, modifier) {
    return (!Roles.userIsInRole(userId, 'admin'));
  }
});

var Schemas = {};

Schemas.Questions = new SimpleSchema({
  'question': {
    type: String
  },
  'description': {
    type: String,
    optional: true,
    autoform: {
      rows: 5
    }
  },
  'video': {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    autoform: {
      afFieldInput: {
        type: 'url'
      }
    }
  },
  'image': {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    autoform: {
      afFieldInput: {
        type: 'url'
      }
    }
  },
  'order': {
     type: Number,
     min: 1
  },
  'answers': {
      type: Array,
      optional: true
  },
  'answers.$': {
    type: Object,
    optional: true
  },
  'answers.$._id': {
    type: String,
    autoValue: function() {
      if (!this.value) {
        return Random.id();
      }
    },
    autoform: {
      label: false,
      afFieldInput: {
        type: 'hidden'
      }
    }
  },
  'answers.$.answer': {
    type: String
  },
  'answers.$.correct': {
    type: Boolean
  },
  'quizId': {
    type: String,
    autoform: {
      label: false,
      afFieldInput: {
        type: 'hidden'
      }
    }
  },
  'createdAt': {
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
  'updatedAt': {
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

Questions.attachSchema(Schemas.Questions);
