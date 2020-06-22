import moment from 'moment';
import 'moment/locale/es';

Template.usersconfig.onCreated(function(){
  if(Roles.userIsInRole(Meteor.userId(),'admin','admin')  || Roles.userIsInRole(Meteor.userId(),'superadmin','admin') ){
    Meteor.subscribe('allusers');
  }
});



var userhelpers = {
   userList: function(){
     if (Roles.userIsInRole(Meteor.userId(),'superadmin','admin') && Roles.userIsInRole(Meteor.userId(),'enabled','enabled')) {
       return [{label:"SuperAdmin",value:"superadmin"},{label:"Admin",value:"admin"},{label:"User",value:"user"},{label:"Observer",value:"observer"}];
     } else if (Roles.userIsInRole(Meteor.userId(),'admin','admin') && Roles.userIsInRole(Meteor.userId(),'enabled','enabled') ) {
       return [{label:"User",value:"user"},{label:"Observer",value:"observer"}];
     } else {
       return [{label:"Not Valid - You should be an Admin to be here",value:"null"}];
     }
   },
   admin: function(){
     return ((Roles.userIsInRole(Meteor.userId(),'admin','admin')  || Roles.userIsInRole(Meteor.userId(),'superadmin','admin') ) && Roles.userIsInRole(Meteor.userId(),'enabled','enabled') );
   },
   superadmin: function(){
     return (Roles.userIsInRole(Meteor.userId(),'superadmin','admin') && Roles.userIsInRole(Meteor.userId(),'enabled','enabled'));
   },
   sysuser: function(){
     return (Roles.userIsInRole(Meteor.userId(),'user','users') && Roles.userIsInRole(Meteor.userId(),'enabled','enabled'));
   },
   sysobserver: function(){
     return (Roles.userIsInRole(Meteor.userId(),'observer','users') && Roles.userIsInRole(Meteor.userId(),'enabled','enabled'));
   },
   dissabledUser: function(){
     if (Roles.userIsInRole(Meteor.userId(),'dissabled','dissabled') || !Roles.userIsInRole(Meteor.userId(),'enabled','enabled') ){
       return true;
     } else return false;
   },
   isDissabledUser: function(id){
     if (!Roles.userIsInRole(id,'enabled','enabled') ){
       return true;
     } else return false;
   },
   getRol: function(id){
     if(!Roles.userIsInRole(id,'enabled','enabled') ){
       return "Dissabled";
     } else if (Roles.userIsInRole(id,'superadmin','admin') && Roles.userIsInRole(id,'enabled','enabled')){
       return "SuperAdmin";
     } else if (Roles.userIsInRole(id,'admin','admin') && Roles.userIsInRole(id,'enabled','enabled')){
       return "Admin";
     } else if (Roles.userIsInRole(id,'user','users') && Roles.userIsInRole(id,'enabled','enabled')){
       return "User";
     } else if (Roles.userIsInRole(id,'observer','users') && Roles.userIsInRole(id,'enabled','enabled')){
       return "Observer";
     } else {
       return "Dissabled";
     }
   },
   editableRol: function(id){
     var currentId=Meteor.userId();
     if(currentId==id){
       return true;
     }
     else if (Roles.userIsInRole(Meteor.userId(),'superadmin','admin') && Roles.userIsInRole(Meteor.userId(),'enabled','enabled')) {
       return true;
     } else if (Roles.userIsInRole(Meteor.userId(),'admin','admin') && Roles.userIsInRole(Meteor.userId(),'enabled','enabled') ) {
        if (Roles.userIsInRole(id,'superadmin','admin') || Roles.userIsInRole(id,'admin','admin') ){
          return false;
        } else{
          return true;
        }
     } else {
       return false;
     }
   },
   getEmail(){
       return this.emails[0].address;
   },
   users: function(){
     return Meteor.users.find();
   },
   uniqueuser: function(){
     console.log("id "+Meteor.userId());
     return Meteor.users.find({_id:Meteor.userId()});
   },
   dateFormat: function(){
      //return moment(this.createdAt).format('D MMMM YYYY - hh:mm');
      var thisMoment = moment(this.createdAt);
      thisMoment.locale('es');
      return thisMoment.format('D MMMM YYYY');
   },
   display(enable){
      if ((Roles.userIsInRole(Meteor.userId(),'admin','admin')  || Roles.userIsInRole(Meteor.userId(),'superadmin','admin') ) && Roles.userIsInRole(Meteor.userId(),'enabled','enabled') ){
         //console.log("showing item, because ADMIN");
         //if (enable) console.log("also ENABLED");
         return true;
      }
      else if (enable) {
        //console.log("showing item, because ENABLED");
        return true;
      }
      else{
         //console.log("Not showing item, because DISABLED");
         return false;
      }
   }
};


Template.maptemplate.helpers(userhelpers);
Template.mapmanager.helpers(userhelpers);
Template.alarmhistory.helpers(userhelpers);
Template.usersconfig.helpers(userhelpers);
Template.profile.helpers(userhelpers);
Template.appbody.helpers(userhelpers);
Template.statselement.helpers(userhelpers);
Template.displayMqttListTemplate.helpers(userhelpers);
Template.minimalMqttObject.helpers(userhelpers);
Template.drspollinglistt.helpers(userhelpers);
Template.dolfpollinglistt.helpers(userhelpers);
Template.amplist.helpers(userhelpers);
