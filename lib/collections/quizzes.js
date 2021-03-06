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
  headerMobile: {
    type: String,
    optional: true,
    label: "Header global en HTML - #headerMobile",
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
  homeMobile: {
    type: String,
    optional: true,
    label: "Contenu HTML de la page d'accueil du quiz - #homeMobile",
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
  footerMobile: {
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
  resultBottom: {
    type: String,
    optional: true,
    label: "Contenu HTML affiché sous le bloc de résultat - #resultBottom",
    autoform: {
      rows: 5
    }
  },
  resultBottomMobile: {
    type: String,
    optional: true,
    label: "Contenu HTML affiché sous le bloc de résultat - #resultBottomMobile",
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
  dotationMobile: {
    type: String,
    optional: true,
    label: "Contenu HTML du bloque dotation - #dotationMobile",
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
  cssMobile: {
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
  closingMobile: {
    type: String,
    optional: true,
    label: "Contenu HTML inclus sous la page d'accueil et de résultats quand le quiz est terminé - #closingMobile",
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
  winnersMobile: {
    type: String,
    optional: true,
    label: "Contenu HTML inclus sous la page d'accueil et de résultats quand le quiz est terminé - #winnersMobile",
    autoform: {
      rows: 5
    }
  },
  resultPhraseWinner: {
    type: String,
    optional: true,
    label: "Contenu HTML sous le H1 'Bravo <PRÉNOM>' si le joueur à gagné - #result-phrase-winner",
    autoform: {
      rows: 5
    },
    defaultValue: "<h2 class=\"text-center\">vous avez répondu correctement à toutes les questions !<br> Votre participation au tirage au sort pour gagner un OptiGrill est validée.</h2>"
  },
  resultPhraseLooser: {
    type: String,
    optional: true,
    label: "Contenu HTML sous le H1 'Dommage,' si le joueur à perdu - #result-phrase-looser",
    autoform: {
      rows: 5
    },
    defaultValue: "<h2 class=\"text-center\">vous n’avez pas trouvé toutes les bonnes réponses pour participer au tirage au sort. Rendez-vous à la fin du jeu pour découvrir les bonnes réponses.</h2><p class=\"lead text-center\">Et n’oubliez pas de partager le jeu avec vos amis : ils auront peut être la chance de gagner un OptiGrill et vous en faire profiter !</p>"
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
  resultTrackingCode: {
    type: Boolean,
    optional: true,
    label: "Activer le code de tracking inclus sur la page en fin de jeu /result"
  },
  organisationTrackingCode: {
    type: String,
    optional: true,
    label: "Numero organisation du tracking"
  },
  eventTrackingCode: {
    type: String,
    optional: true,
    label: "Numero event du tracking"
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
