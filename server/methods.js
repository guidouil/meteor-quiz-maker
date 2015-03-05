Meteor.methods({
  update_email: function (newEmail) {
    var count = Meteor.users.find({'emails.address': newEmail}).count();
    if (count === 0) {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {emails: [{address: newEmail}]}});
      return true;
    }
    return false;
  },
  checkTheAnswer: function (theAnswerId) {
    var theAnswer = Answers.findOne({_id: theAnswerId});
    if (theAnswer && theAnswer.questionId) {
      var question = Questions.findOne({_id: theAnswer.questionId});
      var correctAnswerId = false;
      _.each(question.answers, function(answer) {
        if (answer.correct === true) {
          correctAnswerId = answer._id;
        }
      });
      if (correctAnswerId) {
        var responseIs = false;
        if (correctAnswerId === theAnswer.answerId) {
          responseIs = true;
        }
        Answers.update({_id: theAnswerId}, {$set: {correct: responseIs}});
      }
    }
  }
});
