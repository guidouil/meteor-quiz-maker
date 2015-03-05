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
  name: 'home'
});

Router.route('/play', {
    name: 'play',
    subscriptions: function() {
      Meteor.subscribe('Questions');
      Meteor.subscribe('Answers');
    },
    action: function () {
      if (this.ready()) {
        this.render();
      }
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

Router.route('/questionsList', {
  name: 'questionsList',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  },
  subscriptions: function() {
    return Meteor.subscribe('Questions');
  },
  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});

Router.route('/questionInsert', {
  name: 'questionInsert',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  },
  subscriptions: function() {
    return Meteor.subscribe('Questions');
  },
  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});

Router.route('/questionUpdate/:_id', {
  name: 'questionUpdate',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  },
  subscriptions: function() {
    return Meteor.subscribe('Questions');
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

Router.route('/answersList', {
  name: 'answersList',
  onBeforeAction: function() {
    if (Roles.userIsInRole(Meteor.userId(), "admin")) {
      this.next();
    } else {
      this.redirect("/");
    }
  },
  subscriptions: function() {
    Meteor.subscribe('Answers');
    Meteor.subscribe('Questions');
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
