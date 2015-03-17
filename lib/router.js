Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: "loading",
  notFoundTemplate: "notFound",
  trackPageView: true
});

Router.plugin('ensureSignedIn', {
    except: ['home', 'login', 'atSignIn', 'atSignUp', 'atForgotPassword']
});


Router.route('/', {
  name: 'home',
  subscriptions: function() {
    return Meteor.subscribe('Quizzes');
  }
});

Router.route('/quiz/:quizId', function () {
  this.render('Home', {
    data: function () {
      return Quizzes.findOne({_id: this.params.quizId});
    }
  });
});

Router.route('/play/:quizId', {
    name: 'play',
    subscriptions: function() {
      Meteor.subscribe('Questions', this.params.quizId);
      Meteor.subscribe('Quizzes');
      Meteor.subscribe('Profiles');
      Meteor.subscribe('Citys');
      Meteor.subscribe('Answers', this.params.quizId);
    },
    action: function () {
      if (this.ready()) {
        this.render();
      }
    }
});

Router.route('/result/:quizId', {
    name: 'result',
    subscriptions: function() {
      Meteor.subscribe('Quizzes');
      Meteor.subscribe('Profiles');
      Meteor.subscribe('Questions', this.params.quizId);
      Meteor.subscribe('Answers', this.params.quizId);
    }
});

Router.route('/login', {
    name: 'login'
});

Router.route('/rules', {
  name: 'rules'
});

Router.route('/profile', {
  name: 'profile'
});

Router.route('/bo', {
  name: 'bo',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  }
});

Router.route('/users', {
  name: 'adminUsers',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  }
});

Router.route('/quizzesList', {
  name: 'quizzesList',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  },
  subscriptions: function() {
    return Meteor.subscribe('Quizzes');
  },
  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});

Router.route('/quizInsert', {
  name: 'quizInsert',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  },
  subscriptions: function() {
    return Meteor.subscribe('Quizzes');
  },
  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});

Router.route('/quizAdmin/:quizId', {
  name: 'quizAdmin',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  },
  subscriptions: function() {
    return Meteor.subscribe('Quizzes');
  },
  data: function () {
    return Quizzes.findOne({_id: this.params.quizId});
  },
  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});

Router.route('/quizUpdate/:quizId', {
  name: 'quizUpdate',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  },
  subscriptions: function() {
    return Meteor.subscribe('Quizzes');
  },
  data: function () {
    return Quizzes.findOne({_id: this.params.quizId});
  },
  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});

Router.route('/questionsList/:quizId', {
  name: 'questionsList',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  },
  subscriptions: function() {
    Meteor.subscribe('Quizzes');
    return Meteor.subscribe('Questions', this.params.quizId);
  },
  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});

Router.route('/questionInsert/:quizId', {
  name: 'questionInsert',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  },
  subscriptions: function() {
    Meteor.subscribe('Quizzes');
    return Meteor.subscribe('Questions', this.params.quizId);
  },
  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});

Router.route('/questionUpdate/:_id/quiz/:quizId', {
  name: 'questionUpdate',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  },
  subscriptions: function() {
    Meteor.subscribe('Quizzes');
    return Meteor.subscribe('Questions', this.params.quizId);
  },
  data: function () {
    return Questions.findOne({_id: this.params._id});
  },
  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});

Router.route('/answersList/:quizId', {
  name: 'answersList',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  },
  subscriptions: function() {
    Meteor.subscribe('Quizzes');
    Meteor.subscribe('Answers', this.params.quizId);
    Meteor.subscribe('Questions', this.params.quizId);
    Meteor.subscribe('Profiles');
    // Meteor.subscribe('UsersData');
  },
  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});


// Router.route('/csv', {
//   where: 'server',
//   action: function () {
//
//     var filename = 'eos_leads.csv';
//     var fileData = "who,title,firstname,lastname,md,types,ages,spinell,company,service,street,zip,city,country,mail,phone,mobile,position, congress,contact,comments,other \r\n";
//
//     var headers = {
//       'Content-type': 'text/csv',
//       'Content-Disposition': "attachment; filename=" + filename
//     };
//     var records = Contacts.find({},{sort: {created: -1}});
//     // build a CSV string. Oversimplified. You'd have to escape quotes and commas.
//     records.forEach(function(rec) {
//       if (rec.types) {
//         rec.types = rec.types.join().replace(',','/');
//       }
//       if (rec.ages) {
//         rec.ages = rec.ages.join().replace(',','/');
//       }
//       if (rec.spinell) {
//         rec.spinell = rec.spinell.join().replace(',','/');
//       }
//
//       fileData += rec.ownername + "," + rec.title + "," + rec.firstname + "," + rec.lastname + "," + rec.md + "," + rec.types + "," + rec.ages + "," + rec.spinell + "," + rec.company + "," + rec.service;
//       fileData += "," + rec.street + "," + rec.zip + "," + rec.city + "," + rec.country + "," + rec.mail + "," + rec.phone + "," + rec.mobile + "," + rec.position + "," + rec.congress + "," + rec.contact + "," + rec.comments + "," + rec.other + "\r\n";
//     });
//     this.response.writeHead(200, headers);
//     return this.response.end(fileData);
//
//   }
// });
