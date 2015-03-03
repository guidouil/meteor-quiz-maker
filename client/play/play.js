Template.play.helpers({

  selected: function(value, input) {
    if (value === input) {
      return 'selected';
    } else {
      return false;
    }
  },
  checked: function (value, input) {
    if (value === input) {
      return 'checked';
    } else {
      return false;
    }
  },
  boxed: function (value, input) {
    if (_.contains(input, value)) {
      return 'checked';
    } else {
      return false;
    }
  }
});

Template.play.events({

});
