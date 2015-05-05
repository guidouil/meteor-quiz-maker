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
  answersCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Answers.find({quizId: quizId}).count();
  },
  profilesCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    return Profiles.find({quizId: quizId}).count();
  },
  sharesCount: function () {
    var quizId = Iron.controller().getParams().quizId;
    var fbSharedCount = Profiles.find({quizId: quizId, fbShared: true}).count();
    var emailSharedCount = Emails.find({quizId: quizId, sent: true}).count();
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
    var answers = Answers.find({quizId: quizId}, {sort: {owner: 1, createdAt: -1}}).fetch();
    var answersCount = answers.length;
    var usersAnswers = [];
    var chances = 0;
    var source = [];
    var profile = null;
    var sharedEmailCount = 0;
    $.each(answers, function(index, answer) {
      var winner = false;
      if (index === 0) {
        previousUserId = answer.owner;
      }
      if (previousUserId !== answer.owner) {
        // lets save previous chances
        if (chances === questionsCount) {
          winner = true;
        }
        profile = Profiles.findOne({quizId: quizId, owner: previousUserId});
        if (profile && profile.fbShared) {
          chances += 5;
        }
        sharedEmailCount = Emails.find({owner: previousUserId, sent: true, quizId: quizId}).count();
        if (sharedEmailCount > 0) {
          chances += sharedEmailCount;
        }
        if (!winner) {
          chances = 0;
        }
        usersAnswers.push({user: previousUserId, winChances: chances+1, winner: winner, sharedEmailCount: sharedEmailCount, source: source, createdAt: source[0].createdAt});
        chances = 0;
        winner = false;
        source = [];
        profile = null;
        sharedEmailCount = 0;
      }
      source.push(answer);
      // console.log(source[0].createdAt);
      // if (answer.correct === true) {
      //   chances += 1;
      // }
      previousUserId = answer.owner;
      // for last answer
      if (index+1 === answersCount) {
        // lets save previous chances
        if (chances === questionsCount) {
          winner = true;
        }
        profile = Profiles.findOne({quizId: quizId, owner: previousUserId});
        if (profile && profile.fbShared) {
          chances += 5;
        }
        sharedEmailCount = Emails.find({owner: previousUserId, sent: true, quizId: quizId}).count();
        if (sharedEmailCount > 0) {
          chances += sharedEmailCount;
        }
        if (!winner) {
          chances = 0;
        }
        usersAnswers.push({user: previousUserId, winChances: chances+1, winner: winner, sharedEmailCount: sharedEmailCount, source: source, createdAt: source[0].createdAt});
      }
    });
    // console.log(usersAnswers);
    return usersAnswers;
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
      return  profile.firstname + ' - ' + profile.lastname + ' - ' + profile.zip + ' - ' + profile.city + ' - ' + profile.country;
    }
  },
  fbShared: function (userId) {
    var quizId = Iron.controller().getParams().quizId;
    var profile = Profiles.findOne({owner: userId, quizId: quizId});
    if (profile && profile.fbShared) {
      return true;
    }
    return false;
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
