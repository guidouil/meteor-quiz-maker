Template.quizAdmin.helpers({
  quizId: function(){
    return Iron.controller().getParams().quizId;
  },
  questionsCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Questions.find({quizId: quizId}).count();
  },
  // answersCount: function () {
  //   var quizId = Iron.controller().getParams().quizId;
  //   return Answers.find({quizId: quizId}).count();
  // },
  sharesCount: function () {
    var fbSharedCount = Counts.get('fbSharesCount');
    var emailSharedCount = Counts.get('emailSharesCount');
    var sharesCount = {
      total: fbSharedCount + emailSharedCount,
      fb: fbSharedCount,
      mail: emailSharedCount
    };
    return sharesCount;
  }
});
