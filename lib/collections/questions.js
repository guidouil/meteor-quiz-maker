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
  question: {
    type: String,
    label: 'Texte de la question'
  },
  description: {
    type: String,
    optional: true,
    label: "Description en HTML a droite sous l'image - #description",
    autoform: {
      rows: 5
    }
  },
  video: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: "URL de la video youtube embeded pour la popin sur l'image de droite",
    autoform: {
      afFieldInput: {
        type: 'url'
      }
    }
  },
  image: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: "URL de l'image de droite",
    autoform: {
      afFieldInput: {
        type: 'url'
      }
    }
  },
  order: {
     type: Number,
     min: 1,
     label: "Ordre de la question (veuillez a ne pas sauter un numéro)"
  },
  answers: {
      type: Array,
      optional: true,
      label: "Réponses proposées pour cette question"
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
    type: String,
    label: 'Texte de la réponse'
  },
  'answers.$.correct': {
    type: Boolean,
    label: "C'est la bonne réponse (une seule bonne réponse par question)"
  },
  answerTitle: {
    type: String,
    optional: true,
    label: "Titre de l'explication de la bonne réponse - #answerTitle"
  },
  answerText: {
    type: String,
    optional: true,
    label: "Texte de l'explication de la bonne réponse - #answerText",
    autoform: {
      rows: 5
    }
  },
  answerImage: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: "URL de l'image d'explication de la bonne réponse - #answerImage",
    autoform: {
      afFieldInput: {
        type: 'url'
      }
    }
  },
  quizId: {
    type: String,
    autoform: {
      label: false,
      afFieldInput: {
        type: 'hidden'
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

Questions.attachSchema(Schemas.Questions);
