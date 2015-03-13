Template.quizzesList.helpers({
  quizzes: function() {
    return Quizzes.find({}, {sort: {updatedAt: -1}}).fetch();
  }

});

Template.quizzesList.events({
  "click .delete": function(evt, tmpl){
    evt.preventDefault();
    swal(
      {
        title: "Are you sure ?",
        text: "Deleting a quiz is final!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: true
      },
      function(){
        var quizId = evt.currentTarget.attributes.id.value;
        var questions = Questions.find({quizId: quizId}).fetch();
        if (questions && questions.length) {
          $.each(questions, function (index, question) {
            Questions.remove({_id: question._id});
          });
        }
        var answers = Answers.find({quizId: quizId}).fetch();
        if (answers && answers.length) {
          $.each(answers, function (index, answer) {
            Answers.remove({_id: answer._id});
          });
        }
        var result = Quizzes.remove({_id: quizId});
        if (result) {
          swal("Deleted", "The quiz has been deleted.", "success");
        } else {
          swal("Oops...", "You don't have the right to delete this quiz  ", "error");
        }
      }
    );
  }
});
