Template.questionsList.helpers({
  quizId: function(){
    return Iron.controller().getParams().quizId;
  },
  questions: function() {
    return Questions.find({}, {sort: {order: 1}}).fetch();
  }
});

Template.questionsList.events({
  'click .delete': function(evt, tmpl) {
    evt.preventDefault();
    swal(
      {
        title: "Are you sure ?",
        text: "Deleting a question is final!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: true
      },
      function(){
        var questionId = evt.currentTarget.attributes.id.value;
        var result = Questions.remove({_id: questionId});
        if (result) {
          swal("Deleted", "The question has been deleted.", "success");
        } else {
          swal("Oops...", "You don't have the right to delete this question  ", "error");
        }
      }
    );
  }
});
