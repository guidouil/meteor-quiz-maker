Template.header.helpers({
  isQuizHome: function () {
    var currentRoute = Router.current();
    if (currentRoute.lookupTemplate() === 'Quiz:quizId' || currentRoute.lookupTemplate() === 'Quiz') {
      return true;
    }
    return false;
  }
});
