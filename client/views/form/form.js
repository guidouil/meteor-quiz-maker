Template.form.helpers({
  quiz: function(){
    var quizId = Iron.controller().getParams().quizId;
    return Quizzes.findOne({_id: quizId});
  },
  chances: function () {
    var quizId = Iron.controller().getParams().quizId;
    var result = {};
    var profile = Profiles.findOne({quizId: quizId, owner: Meteor.userId()});
    var correctAnswersCount = Answers.find({quizId: quizId, owner: Meteor.userId(), correct:true}).count();
    if (correctAnswersCount >= 1) {
      result.plural = 's';
    }
    result.count = correctAnswersCount + 1;
    if (profile && profile.fbShared) {
      result.count += 5;
    }
    var sharedEmailCount = Emails.find({owner: Meteor.userId(), sent: true, quizId: quizId}).count();
    if (sharedEmailCount > 0) {
      result.count += sharedEmailCount;
    }
    return result;
  },
  autoZip: function () {
    return {
      position: "bottom",
      limit: 5,
      rules: [
        {
          collection: Citys,
          field: "zip",
          template: Template.city
        }
      ]
    };
  },
  "autocompleteselect #zip": function(event, template, doc) {
    if(doc && doc.city) {
      $('#city').val(doc.city);
    }
  },
  userId: function () {
    return Meteor.userId();
  },
  quizId: function(){
    return Iron.controller().getParams().quizId;
  },
  quizProfile: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Profiles.findOne({owner: Meteor.userId(), quizId: quizId});
  },
  profile: function () {
    var quizId = Iron.controller().getParams().quizId;
    var profile = Profiles.findOne({owner: Meteor.userId(), quizId: quizId});
    if (!profile) {
      profile = Profiles.findOne({owner: Meteor.userId()});
    }
    return profile;
  },
  type: function () {
    var quizId = Iron.controller().getParams().quizId;
    var profile = Profiles.findOne({owner: Meteor.userId(), quizId: quizId});
    if (profile && profile._id) {
      return "update";
    } else {
      return "insert";
    }
  }
});

Template.form.events({
  'click .cancel': function (evt, tmpl) {
    evt.preventDefault();
    var quizId = Iron.controller().getParams().quizId;
    Router.go('/result/'+quizId);
  }
});

Template.form.rendered = function(){
  if (Session.get('activeTab')) {
    var zeroOrder = Session.get('activeTab') - 1;
    $('#myTab li:eq('+zeroOrder+') a').tab('show');
  }
  $('input').iCheck({
    checkboxClass: 'icheckbox_flat-red',
    radioClass: 'iradio_flat-red'
  });
  $('#birthdate').datepicker({
    format: "dd/mm/yyyy",
    startView: 2,
    orientation: "bottom auto",
    autoclose: true,
    language: 'fr',
    defaultViewDate: {
      year: 1990,
      month: 1,
      day: 1
    }
  });
};
