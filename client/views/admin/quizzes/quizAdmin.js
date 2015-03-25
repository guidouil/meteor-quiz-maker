Template.quizAdmin.helpers({
  quizId: function(){
    return Iron.controller().getParams().quizId;
  },
  questionsCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Questions.find({quizId: quizId}).count();
  },
  answersCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Answers.find({quizId: quizId}).count();
  },
  profilesCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Profiles.find({quizId: quizId}).count();
  }
});
