AccountsTemplates.addFields([
  {
    _id: 'firstName',
    type: 'text',
    displayName: 'First Name',
    required: true,
    minLength: 2,
    re: /(?=.*[a-z])(?=.*[A-Z])/,
    errStr: 'At least 1 lowercase and 1 uppercase required',
  },{
    _id: 'lastName',
    type: 'text',
    displayName: 'Last Name',
    required: true,
    minLength: 2,
    re: /(?=.*[a-z])(?=.*[A-Z])/,
    errStr: 'At least 1 lowercase and 1 uppercase required',
  }
]);

Template.upperbarcont.helpers({
  firstName: function() {
    return Meteor.user().profile.firstName;
  },
  lastName: function() {
    return Meteor.user().profile.lastName;
  },

});

Template.navlist.helpers({
  firstName: function() {
    return Meteor.user().profile.firstName;
  },
  lastName: function() {
    return Meteor.user().profile.lastName;
  },

});

if (Meteor.isClient) {

    if(Roles.userIsInRole(Meteor.userId(),'admin','admin')  || Roles.userIsInRole(Meteor.userId(),'superadmin','admin') ){
      Meteor.subscribe('allusers');
    } else {
        Meteor.subscribe('users');
    }
}
