Template.list.helpers({
  contacts: function() {
    return Contacts.find({},{sort: {created: -1}}).fetch();
  }
});

Template.list.events({
  'click .delete': function (evt, tmpl) {
    evt.preventDefault();
    swal(
      {
        title: "Are you sure ?",
        text: "Deleting a contact is final!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: true
      },
      function(){
        var contactId = evt.currentTarget.attributes.id.value;
        var result = Contacts.remove({_id: contactId});
        if (result) {
          swal("Deleted", "The contact has been deleted.", "success");
        } else {
          swal("Oops...", "You don't have the right to delete this contact  ", "error");
        }
      }
    );
  },
  'click .edit': function (evt, tmpl) {
    var contactId = evt.currentTarget.attributes.id.value;
    Router.go('input', {_id: contactId});
  }
});
