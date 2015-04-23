Template.questionUpdate.helpers({
  quizId: function(){
    return Iron.controller().getParams().quizId;
  }
});

Template.questionUpdate.events({
  "submit form": function(e, t){
    swal("Thank you", "Your data have been saved.", "success");
  }
});
