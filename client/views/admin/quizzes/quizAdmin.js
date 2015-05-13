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
  profilesCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Profiles.find({quizId: quizId}).count();
  },
  sharesCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    var fbSharedCount = Profiles.find({quizId: quizId, fbShared: true}).count();
    var emailSharedCount = Emails.find({quizId: quizId, sent: true}).count();
    var sharesCount = {
      total: fbSharedCount + emailSharedCount,
      fb: fbSharedCount,
      mail: emailSharedCount
    };
    return sharesCount;
  },
});
