Template.quizUpdate.helpers({
  quizId: function(){
    return Iron.controller().getParams().quizId;
  }
});

Template.quizUpdate.events({
  "submit form": function(e, t){
    swal("Thank you", "Your data have been saved.", "success");
  }
});

Template.quizInsert.events({
  "submit form": function(e, t){
    swal("Thank you", "Your data have been saved.", "success");
  }
});
