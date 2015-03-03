Contacts = new Meteor.Collection("contacts");

Ground.Collection(Contacts);

Contacts.allow({
  insert: function (userId, doc) {
    return (userId && doc.owner === userId);
  },
  update: function (userId, doc, fields, modifier) {
    return (userId && doc.owner === userId);
  },
  remove: function (userId, doc) {
    return (userId && doc.owner === userId);
  },
  fetch: ['owner']
});

Contacts.deny({
  update: function (userId, doc, fields, modifier) {
    return _.contains(fields, 'owner');
  },
  fetch: ['owner']
});

var Schemas = {};

Schemas.Contacts = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 4,
    optional: true
  },
  firstname: {
    type: String,
    label: "firstname",
    optional: true
  },
  lastname: {
    type: String,
    label: "lastname",
    optional: true
  },
  md: {
    type: Boolean,
    label: "MD",
    optional: true
  },
  types: {
    type: [String],
    label: "types",
    optional: true
  },
  ages: {
    type: [String],
    label: "ages",
    optional: true
  },
  spinell: {
    type: [String],
    label: "spinell",
    optional: true
  },
  company: {
    type: String,
    label: "company",
    optional: true
  },
  service: {
    type: String,
    label: "service",
    optional: true
  },
  street: {
    type: String,
    label: "Adresse",
    optional: true
  },
  zip: {
    type: String,
    label: "Code Postal",
    max: 10,
    optional: true
  },
  city: {
    type: String,
    label: "Ville",
    optional: true
  },
  country: {
    type: String,
    label: "country",
    optional: true
  },
  mail: {
    type: String,
    label: "mail",
    optional: true
  },
  phone: {
    type: String,
    label: "Téléphone",
    max: 20,
    optional: true
  },
  mobile: {
    type: String,
    label: "Téléphone Mobile",
    max: 20,
    optional: true
  },
  position: {
    type: String,
    label: "position",
    optional: true
  },
  congress: {
    type: String,
    label: "congress",
    optional: true
  },
  contact: {
    type: String,
    label: "contact",
    optional: true
  },
  comments: {
    type: String,
    label: "comments",
    optional: true
  },
  other: {
    type: String,
    label: "other",
    optional: true
  },
  owner: {
    type: String,
    label: "owner"
  },
  ownername: {
    type: String,
    label: "ownername"
  },
  created: {
    type: Number,
    label: "created"
  },
  updated: {
    type: Number,
    label: 'Date',
    optional: true
  }
});

Contacts.attachSchema(Schemas.Contacts);
