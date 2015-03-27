Profiles = new Meteor.Collection("profiles");

//Ground.Collection(Profiles);

Profiles.allow({
  insert: function (userId, doc) {
    return (userId && doc.owner == userId);
  },
  update: function (userId, doc, fields, modifier) {
    return (userId && doc.owner == userId);
  },
  remove: function (userId, doc) {
    return (userId && Roles.userIsInRole(userId, 'admin'));
  },
  fetch: ['owner']
});

Profiles.deny({
  update: function (userId, doc, fields, modifier) {
    return false;
  },
  fetch: null
});

var Schemas = {};

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
    type: String,
    label: 'Date de naissance',
    optional: true
  },
  address: {
    type: String,
    label: 'Adresse postale',
    optional: true
  },
  zip: {
    type: String,
    label: 'Code postal*'
  },
  city: {
    type: String,
    label: 'Ville*'
  },
  country: {
    type: String,
    label: 'Pays*'
  },
  validate: {
    type: Boolean,
    label: "J’ai lu et j’accepte le règlement",
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
