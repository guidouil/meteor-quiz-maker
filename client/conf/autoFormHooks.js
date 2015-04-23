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
      var that = this;
      var quizId = doc.quizId;
      var mail = doc.mail;
      Meteor.call('alreadyPlayed', quizId, mail, function (error, result) {
        if (result === true) {
          alert('Vous ne pouvez pas jouer deux fois.');
          that.result(false);
        }
        that.result(doc);
      });
    },
    update: function (doc) {
      var that = this;
      var quizId = doc.quizId;
      var mail = doc.mail;
      Meteor.call('alreadyPlayedOnce', quizId, mail, function (error, result) {
        if (result === true) {
          alert('Vous ne pouvez pas jouer deux fois.');
          that.result(false);
        }
        that.result(doc);
      });
    }
  },
  after: {
    insert: function(error, result) {
      if (!error && result) {
        Session.set('hideForm', true);
        var quizId = Router.current().params.quizId;
        Router.go('/result/'+quizId);
      }
    },
    update: function(error, result) {
      if (!error && result) {
        Session.set('hideForm', true);
        var quizId = Router.current().params.quizId;
        Router.go('/result/'+quizId);
      }
    }
  }
};

AutoForm.hooks({
  profileInsert: profileHooksObject
});
