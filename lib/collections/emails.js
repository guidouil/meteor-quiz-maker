Emails = new Meteor.Collection("emails");

//Ground.Collection(Emails);

Emails.allow({
  insert: function (userId, doc) {
    return (userId && doc.owner == userId);
  },
  update: function (userId, doc, fields, modifier) {
    return false;
  },
  remove: function (userId, doc) {
    return false;
  },
  fetch: ['owner']
});

Emails.deny({
  update: function (userId, doc, fields, modifier) {
    return true;
  },
  fetch: null
});

var Schemas = {};

Schemas.Emails = new SimpleSchema({
  mail: {
    type: String,
    label: 'Email*',
    regEx: SimpleSchema.RegEx.Email,
    autoform: {
      afFieldInput: {
        type: "email"
      }
    }
  },
  owner: {
    type: String,
    autoform: {
      label: false,
      afFieldInput: {
        type: "hidden"
      }
    }
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
  sent: {
    type: Boolean,
    autoform: {
      label: false,
      afFieldInput: {
        type: "hidden"
      }
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

Emails.attachSchema(Schemas.Emails);
