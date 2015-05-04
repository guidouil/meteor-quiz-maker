Profiles = new Meteor.Collection("profiles");

//Ground.Collection(Profiles);

Profiles.allow({
  insert: function (userId, doc) {
    return (userId && doc.owner === userId);
  },
  update: function (userId, doc, fields, modifier) {
    return (userId && doc.owner === userId);
  },
  remove: function (userId, doc) {
    return (userId && Roles.userIsInRole(userId, 'admin'));
  },
  fetch: ['owner']
});

Profiles.deny({
  update: function (userId, doc, fields, modifier) {
    if (doc.owner === userId) {
      return false;
    }
    return true;
  },
  fetch: ['owner']
});

var Schemas = {};

Schemas.birthdate = new SimpleSchema({
  day: {
    type: Number,
    optional: true,
    min: 1,
    max: 31,
    autoform: {
      type: "select"
    }
  },
  month: {
    type: Number,
    optional: true,
    min: 1,
    max: 12,
    autoform: {
      type: "select"
    }
  },
  year: {
    type: Number,
    optional: true,
    autoform: {
      type: "select"
    }
  },
});

Schemas.Profiles = new SimpleSchema({
  title: {
    type: String,
    label: 'Civilité*',
    autoform: {
      type: "select-radio-inline",
      options: function () {
        return [
          {label: "Mr", value: "Mr"},
          {label: "Mme", value: "Mme"},
          {label: "Mlle", value: "Mlle"}
        ];
      }
    }
  },
  firstname: {
    type: String,
    label: 'Prénom*'
  },
  lastname: {
    type: String,
    label: 'Nom*'
  },
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
  birthdate: {
    type: Schemas.birthdate,
    label: 'Date de naissance',
    optional: true
  },
  address: {
    type: String,
    label: 'Adresse postale*'
  },
  zip: {
    type: String,
    label: 'Code postal*',
    max: 5
  },
  city: {
    type: String,
    label: 'Ville*'
  },
  validate: {
    type: Boolean,
    label: ' ',
    allowedValues: [true],
    autoform: {
      afFieldInput: {
        type: "boolean-checkbox"
      }
    }
  },
  nlTefal: {
    type: Boolean,
    label: "Je souhaite recevoir des informations de la part de Tefal",
    optional: true
  },
  nlSebGroup: {
    type: Boolean,
    label: "Je souhaite recevoir des informations sur les marques du Groupe SEB (Calor, Krups, Rowenta, Seb, Moulinex et Lagostina)",
    optional: true
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
  fbShared: {
    type: Boolean,
    denyInsert: true,
    optional: true,
    autoform :
    {
      omit: true
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

Profiles.attachSchema(Schemas.Profiles);
