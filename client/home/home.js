Template.navbar.events({
  'click a': function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  }
});
