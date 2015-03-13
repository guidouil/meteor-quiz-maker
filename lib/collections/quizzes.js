Quizzes = new Meteor.Collection("quizzes");

//Ground.Collection(Quizzes);

Quizzes.allow({
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

Quizzes.deny({
  update: function (userId, doc, fields, modifier) {
    return (!Roles.userIsInRole(userId, 'admin'));
  }
});

var Schemas = {};

Schemas.Quizzes = new SimpleSchema({
  title: {
    type: String
  },
  startDate: {
    type: Date,
    optional: true,
    label: "Start date"
  },
  endDate: {
    type: Date,
    optional: true,
    label: "End date"
  },
  header: {
    type: String,
    optional: true,
    autoform: {
      rows: 5
    }
  },
  home: {
    type: String,
    optional: true,
    autoform: {
      rows: 5
    }
  },
  footer: {
    type: String,
    optional: true,
    autoform: {
      rows: 5
    }
  },
  css: {
    type: String,
    optional: true,
    autoform: {
      rows: 5
    }
  },
  closing: {
    type: String,
    optional: true,
    autoform: {
      rows: 5
    }
  },
  winners: {
    type: String,
    optional: true,
    autoform: {
      rows: 5
    }
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

Quizzes.attachSchema(Schemas.Quizzes);
