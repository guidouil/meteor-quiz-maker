var questionHooksObject = {
  before: {
    // To add a unique _id in questions.aswers subobject when adding a new answer in existing question
    update: function(doc) {
      // console.log(doc);
      var formSet = doc.$set;
      var formUnset = doc.$unset;
      if (formSet) {
        for (var i = 0; i < 100; i++) {
          if (formSet['answers.'+i+'.answer'] && !formSet['answers.'+i+'._id']) {
            formSet['answers.'+i+'._id'] = Random.id();
            delete formUnset['answers.'+i+'._id'];
          }
        }
        doc.$set = formSet;
        doc.$unset = formUnset;
      }
      return doc;
    }
  }
};

var profileHooksObject = {
  before: {
    insert: function (doc) {
      // var quizId = doc.quizId;
      // var mail = doc.mail;
      // Meteor.call('alreadyPlayed', quizId, mail, function (error, result) {
      //   if (result === true) {
      //     return false;
      //   }
      //   return doc;
      // });
      return doc;
    }
  },
  after: {
    insert: function(error, result) {
      if (!error && result) {
        Session.set('hideForm', true);
      }
    },
    update: function(error, result) {
      if (!error && result) {
        Session.set('hideForm', true);
      }
    }
  }
};

AutoForm.hooks({
  profileInsert: profileHooksObject
});
