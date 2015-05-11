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
    type: String,
    label: "Titre du quiz"
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
    label: "Header global en HTML - #header",
    autoform: {
      rows: 5
    }
  },
  home: {
    type: String,
    optional: true,
    label: "Contenu HTML de la page d'accueil du quiz - #home",
    autoform: {
      rows: 5
    }
  },
  footer: {
    type: String,
    optional: true,
    label: "Footer global du quiz en HTML - #footer",
    autoform: {
      rows: 5
    }
  },
  formTop: {
    type: String,
    optional: true,
    label: "Contenu HTML au dessus du formulaire - #formTop",
    autoform: {
      rows: 5
    }
  },
  promo: {
    type: String,
    optional: true,
    label: "Contenu HTML du bloc promotion - #promo",
    autoform: {
      rows: 5
    }
  },
  dotation: {
    type: String,
    optional: true,
    label: "Contenu HTML du bloque dotation - #dotation",
    autoform: {
      rows: 5
    }
  },
  css: {
    type: String,
    optional: true,
    label: "CSS inséré dans toutes les pages du quiz juste sous le header",
    autoform: {
      rows: 5
    }
  },
  announce: {
    type: String,
    optional: true,
    label: "Annonce de fin de jeux sur la page résultat",
  },
  sharedUrl: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: "URL qui sera partagée sur facebook",
    autoform: {
      afFieldInput: {
        type: 'url'
      }
    }
  },
  sharedImage: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    label: "URL de l'image qui sera partagée sur facebook",
    autoform: {
      afFieldInput: {
        type: 'url'
      }
    }
  },
  sharedCaption: {
    type: String,
    optional: true,
    label: "Titre du partage sur facebook"
  },
  sharedDescription: {
    type: String,
    optional: true,
    label: "Texte du partage sur facebook",
    autoform: {
      rows: 5
    }
  },
  closing: {
    type: String,
    optional: true,
    label: "Contenu HTML inclus sous la page d'accueil et de résultats quand le quiz est terminé - #closing",
    autoform: {
      rows: 5
    }
  },
  winners: {
    type: String,
    optional: true,
    label: "Contenu HTML inclus sous la page d'accueil et de résultats quand le quiz est terminé - #winners",
    autoform: {
      rows: 5
    }
  },
  rules: {
    type: String,
    optional: true,
    label: "URL du fichier PDF du réglement - #rules",
    autoform: {
      afFieldInput: {
        type: 'url'
      }
    }
  },
  conditions: {
    type: String,
    optional: true,
    label: "Contenu HTML des conditions du quiz - #conditions",
    autoform: {
      rows: 5
    }
  },
  mailSubject: {
    type: String,
    optional: true,
    label: "Titre du mail partagé par les utilisateur"
  },
  mailHtml: {
    type: String,
    optional: true,
    label: "HTML du mail partagé par les utilisateurs",
    autoform: {
      rows: 5
    }
  },
  mailText: {
    type: String,
    optional: true,
    label: "TXT du mail partagé par les utilisateurs",
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
