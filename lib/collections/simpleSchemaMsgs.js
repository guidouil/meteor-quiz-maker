SimpleSchema.messages({
  required: "Vous devez remplir le champ : [label]",
  notAllowed: "Vous devez accepter le règlement",
  regEx: [
    {exp: SimpleSchema.RegEx.Email, msg: "Vous devez saisir une adresse email valide"}
  ]
});
