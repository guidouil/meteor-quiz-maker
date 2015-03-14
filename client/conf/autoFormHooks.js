var questionHooksObject = {
  'before': {
    // To add a unique _id in questions.aswers subobject when adding a new answer in existing question
    update: function(doc) {
      var formSet = doc.$set;
      var formUnset = doc.$unset;
      for (var i = 0; i < 100; i++) {
        if (formSet['answers.'+i+'.answer'] && !formSet['answers.'+i+'._id']) {
          formSet['answers.'+i+'._id'] = Random.id();
          delete formUnset['answers.'+i+'._id'];
        }
      }
      doc.$set = formSet;
      doc.$unset = formUnset;
      return doc;
    }
  }
};

var profileHooksObject = {
  after: {
    insert: function(error, result) {
      console.log(error);
      console.log(result);
      if (!error && result) {
        var profile = Profiles.findOne({_id: result});
        if (profile && profile.quizId) {
          Router.go('/result/'+profile.quizId);
        }
      }
    }
  }
};

AutoForm.hooks({
  questionUpdate: questionHooksObject,
  profileInsert: profileHooksObject
});
