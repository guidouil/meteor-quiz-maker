Template.answersList.helpers({
  quizId: function(){
    return Iron.controller().getParams().quizId;
  },
  questions: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Questions.find({quizId: quizId},{sort: {order: 1}});
  },
  questionsCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Questions.find({quizId: quizId}).count();
  },
  // answersCount: function () {
  //   var quizId = Iron.controller().getParams().quizId;
  //   return Answers.find({quizId: quizId}).count();
  // },
  profilesCount: function () {
    return Admin.profilesCount;
  },
  sharesCount: function () {
    var fbSharedCount = Counts.get('fbSharesCount');
    var emailSharedCount = Counts.get('emailSharesCount');
    var sharesCount = {
      total: fbSharedCount + emailSharedCount,
      fb: fbSharedCount,
      mail: emailSharedCount
    };
    return sharesCount;
  },
  usersAnswers: function () {
    var quizId = Iron.controller().getParams().quizId;
    var questionsCount = Questions.find({quizId: quizId}).count();
    return Profiles.find({quizId: quizId},{sort: {createdAt: -1}});
  },
  userEmail: function (userId) {
    Meteor.call('getUserEmail', userId, function (error, data) {
      Session.set('email_'+userId, data);
    });
    return Session.get('email_'+userId);
  },
  chances: function (userId) {
    var quizId = Iron.controller().getParams().quizId;
    var correctAnswersCount = Answers.find({quizId: quizId, owner: userId}).count();
    return correctAnswersCount + 1;
  },
  questionsAnswered: function (userId) {
    var quizId = Iron.controller().getParams().quizId;
    var questions = Questions.find({quizId: quizId},{sort: {order: 1}}).fetch();
    var questionsAnswered = [];
    $.each(questions, function (index, question) {

      var answer = Answers.findOne({questionId: question._id, owner: userId});
      if (answer) {
        if (answer.correct) {
          questionsAnswered.push({'icon': 'check'});
        } else {
          questionsAnswered.push({'icon': 'times'});
        }
      } else {
        questionsAnswered.push({'icon': 'minus'});
      }
    });
    return questionsAnswered;
  },
  profile: function (userId) {
    var quizId = Iron.controller().getParams().quizId;
    var profile = Profiles.findOne({owner: userId, quizId: quizId});
    if (!profile) {
      // looking for other quizzes profiles
      profile = Profiles.findOne({owner: userId});
    }
    if (profile && profile.firstname && profile.lastname  && profile.city && profile.zip) {
      return  profile.firstname + ' - ' + profile.lastname + ' - ' + profile.zip + ' - ' + profile.city;
    }
  },
  fbShared: function (userId) {
    var quizId = Iron.controller().getParams().quizId;
    var profile = Profiles.findOne({owner: userId, quizId: quizId});
    if (profile && profile.fbShared) {
      return true;
    }
    return false;
  },
  sharedEmailCount: function (userId) {
    var quizId = Iron.controller().getParams().quizId;
    return Emails.find({quizId: quizId, owner: userId, sent: true}).count();
  },
  winChances: function (userId) {
    return '?';
  }
});

Template.answersList.events({
  'click .reset-all': function(evt, tmpl) {
    evt.preventDefault();
    var quizId = Iron.controller().getParams().quizId;
    swal(
      {
        title: "Are you sure ?",
        text: "Deleting user answers and profiles is final!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: true
      },
      function(){
        Meteor.call('resetAnswers', quizId);
        swal("Deleted", "All the answers and profiles have been deleted.", "success");

      }
    );
  },
  'click .reset': function(evt, tmpl) {
    evt.preventDefault();
    var quizId = Iron.controller().getParams().quizId;
    var userId = evt.currentTarget.attributes.id.value;
    swal(
      {
        title: "Are you sure ?",
        text: "Deleting user answers and profile is final!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: true
      },
      function(){
        Meteor.call('resetAnswer', quizId, userId);
        swal("Deleted", "This user answers and profile have been deleted.", "success");

      }
    );
  },
  'click .exportAnswers': function (evt, tmpl) {
    evt.preventDefault();
    var quizId = Iron.controller().getParams().quizId;
    var questionsCount = Questions.find({quizId: quizId}).count();
    var profiles = Profiles.find({quizId: quizId},{fields:{_id: 0, quizId: 0}}).fetch();
    $.each(profiles, function(index, profile){
      if (profile.birthdate && profile.birthdate.day && profile.birthdate.month && profile.birthdate.year) {
        profiles[index].birthdate = profile.birthdate.day +'/'+ profile.birthdate.month +'/'+ profile.birthdate.year;
      }
      var correctAnswersCount = Answers.find({quizId: quizId, owner: profile.owner, correct: true}).count();
      var userChances = 0;
      if (correctAnswersCount === questionsCount) {
        userChances = 1;
        // userChances += Answers.find({quizId: quizId, owner: profile.owner, correct: true}).count();
        if (profile.fbShared === true) {
          userChances += 5;
        }
        var sharedEmailCount = Emails.find({owner: profile.owner, sent: true}).count();
        if (sharedEmailCount > 0) {
          userChances += sharedEmailCount;
        }
      }
      var sharedEmail = '';
      sharedEmails = Emails.find({owner: profile.owner, sent: true},{fields: {mail: 1}}).fetch();
      if (sharedEmails && sharedEmails.length) {
        _.each(sharedEmails,function(item){
          sharedEmail += item.mail+' ';
        });
      }
      profiles[index].chances = userChances;
      profiles[index].sharedEmail = sharedEmail;
    });
    var csv = Papa.unparse(profiles, {
      quotes: true,
      delimiter: ",",
      newline: "\r\n"
    });
    var a         = document.createElement('a');
    a.href        = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.target      = '_blank';
    a.download    = 'players_profiles.csv';

    document.body.appendChild(a);
    a.click();
  }
});
