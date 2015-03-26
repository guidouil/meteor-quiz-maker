Template.answer.helpers({
  questionId: function (answerId) {
    var question = Questions.findOne({'answers._id': answerId});
    return question._id;
  }
});

Template.answered.helpers({
  questionId: function (answerId) {
    var question = Questions.findOne({'answers._id': answerId});
    return question._id;
  },
  isChecked: function (answerId) {
      var question = Questions.findOne({'answers._id': answerId});
      var answer = Answers.findOne({owner: Meteor.userId(), questionId: question._id});
      if (answer.answerId === answerId) {
        return 'checked';
      }
  }
});

Template.answer.rendered =Template.answered.rendered = function(){
  $('input').iCheck({
    checkboxClass: 'icheckbox_flat-red',
    radioClass: 'iradio_flat-red'
  });
};
