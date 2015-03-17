Template.header.helpers({
  isQuizHome: function () {
    var currentRoute = Router.current();
    if (currentRoute.lookupTemplate() === 'Quiz:quizId') {
      return true;
    }
    return false;
  }
});
