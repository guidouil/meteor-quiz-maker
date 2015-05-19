Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: "loading",
  notFoundTemplate: "notFound",
  trackPageView: true
});

Router.plugin('ensureSignedIn', {
  only: ['bo', 'users', 'quizzesList', 'quizInsert', 'quizAdmin', 'quizUpdate', 'questionsList', 'questionInsert', 'questionUpdate', 'answersList']
    // except: ['home', 'login', 'quiz', 'play', 'atSignIn', 'atSignUp', 'atForgotPassword']
});


Router.route('/', {
  name: 'home',
  waitOn: function() {
    return Meteor.subscribe('Quizzes');
  }
});

Router.route('/quiz/:quizId', {
  name: 'quiz',
  waitOn: function() {
    Meteor.subscribe('Questions', this.params.quizId);
    Meteor.subscribe('Quizzes');
    return Meteor.subscribe('Answers', this.params.quizId);
  },
  action: function () {
    if (this.ready()) {
      this.render('home');
    }
  },
  data: function () {
    return Quizzes.findOne({_id: this.params.quizId});
  }
});

Router.route('/play/:quizId', {
    name: 'play',
    waitOn: function() {
      Meteor.subscribe('Questions', this.params.quizId);
      Meteor.subscribe('Quizzes');
      Meteor.subscribe('Profiles');
      // Meteor.subscribe('Citys');
      return Meteor.subscribe('Answers', this.params.quizId);
    },
    action: function () {
      if (this.ready()) {
        this.render();
      }
    }
});

Router.route('/result/:quizId', {
    name: 'result',
    waitOn: function() {
      Meteor.subscribe('Quizzes');
      Meteor.subscribe('Profiles');
      Meteor.subscribe('Emails', this.params.quizId);
      Meteor.subscribe('Questions', this.params.quizId);
      return Meteor.subscribe('Answers', this.params.quizId);
    }
});

Router.route('/form/:quizId', {
    name: 'form',
    waitOn: function() {
      Meteor.subscribe('Quizzes');
      Meteor.subscribe('Profiles');
      Meteor.subscribe('Emails', this.params.quizId);
      Meteor.subscribe('Questions', this.params.quizId);
      return Meteor.subscribe('Answers', this.params.quizId);
    }
});

Router.route('/rules/:quizId', {
  name: 'rules',
  waitOn: function() {
    return Meteor.subscribe('Quizzes');
  }
});

Router.route('/conditions/:quizId', {
  name: 'conditions',
  waitOn: function() {
    return Meteor.subscribe('Quizzes');
  }
});

Router.route('/login', {
    name: 'login'
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
    Meteor.subscribe('Quizzes');
    Meteor.subscribe('Emails', this.params.quizId);
    Meteor.subscribe('Answers', this.params.quizId);
    Meteor.subscribe('Questions', this.params.quizId);
    Meteor.subscribe('Admin', this.params.quizId);
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

Router.route('/answersList/:quizId/:limit?', {
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
    Meteor.subscribe('Emails', this.params.quizId);
    Meteor.subscribe('Answers', this.params.quizId);
    Meteor.subscribe('Questions', this.params.quizId);
    Meteor.subscribe('Profiles');
    Meteor.subscribe('AllProfiles', this.params.quizId, this.params.limit);
    Meteor.subscribe('Admin', this.params.quizId);
  },
  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});
