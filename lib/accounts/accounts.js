import { Roles } from 'meteor/alanning:roles'


if (Meteor.isClient) {

    Meteor.subscribe('users');
console.log("working");



Template.usersconfig.events({
  'submit .signupform': function(e, template) {
    e.preventDefault();
    var email = template.find('#email').value;
    var name = template.find('#email').value;
    var password = template.find('#password').value;
    var firstName =  template.find('#firstname').value;
    var lastName =  template.find('#lastname').value;
    var rol= template.find('#rol').value;
    console.log(email);
    console.log(password);
    var userObject = {email: email ,name: name, firstName: firstName, lastName: lastName, password: password};
    if(rol=="superadmin"){
      Meteor.call('registerSuperAdmin',userObject, function(error, result){
        if(result){
         console.log(result)
        }
        if(error){
         console.log(result)
        }
      });
    } else if (rol=="admin") {
      Meteor.call('registerAdmin',userObject, function(error, result){
        if(result){
         console.log(result)
        }
        if(error){
         console.log(result)
        }
      });
    } else if (rol=="user") {
      Meteor.call('registerUser',userObject, function(error, result){
        if(result){
         console.log(result)
        }
        if(error){
         console.log(result)
        }
      });
    } else if (rol=="observer") {
      Meteor.call('registerObserver',userObject, function(error, result){
        if(result){
         console.log(result)
        }
        if(error){
         console.log(result)
        }
      });
    } else {
      console.log("something is not right about the user creation options");
    }
  },
  'submit .editUserForm': function() {
    event.preventDefault();
    template = event.target;
    var email = template.email.value;
    var name = template.email.value;
    var password = template.password.value;
    var firstName =  template.firstname.value;
    var lastName =  template.lastname.value;
    var rol= template.rol.value;
    var id= template.id.value;
    console.log("edit "+email);
    console.log(id);
    console.log(password);
    console.log(firstName);
    var userObject = {email: email ,name: name, firstName: firstName, lastName: lastName, password: password, id:id};
    if(rol=="superadmin"){
      Meteor.call('editSuperAdmin',userObject, function(error, result){
        if(result){
         console.log(result)
        }
        if(error){
         console.log("error")
        }
      });
    } else if (rol=="admin") {
      Meteor.call('editAdmin',userObject, function(error, result){
        if(result){
         console.log(result)
        }
        if(error){
         console.log("error")
        }
      });
    } else if (rol=="user") {
      Meteor.call('editUser',userObject, function(error, result){
        if(result){
         console.log(result)
        }
        if(error){
         console.log("error")
        }
      });
    } else if (rol=="observer") {
      Meteor.call('editObserver',userObject, function(error, result){
        if(result){
         console.log(result)
        }
        if(error){
         console.log("error")
        }
      });
    } else {
      console.log("something is not right about the user creation options");
    }
  },
  'click #dissableuser'(){
    var r = confirm("Deshabilitar?");
    console.log("to id "+this._id);
    if (r == true) {
      Meteor.call('disableUser',this._id, function(error, result){
        if(result){
         console.log(result)
        }
        if(error){
         console.log("error")
        }
      });
      alert("Deshabilitado");
    }
  },
  'click #enableuser'(){
    var r = confirm("Habilitar?");
    console.log("to id "+this._id);
    if (r == true) {
      Meteor.call('enableUser',this._id, function(error, result){
        if(result){
         console.log(result)
        }
        if(error){
         console.log("error")
        }
      });
      alert("Habilitado");
    }
  }
});

Template.admincreate.events({
  'submit .signupform': function(e, template) {
    e.preventDefault();
    var email = template.find('#email').value;
    var name = template.find('#name').value;
    var password = template.find('#password').value;
    var firstName =  "Super" ;
    var lastName =  "Admin" ;
    console.log(email);
    console.log(password);
    if(password.length>6 && email.length>3 && name.length>3) Meteor.call('registerSuperAdmin',{email: email ,name: name, firstName: firstName, lastName:lastName, password: password}, function(error, result){
      if(result){
       console.log(result)
      }
      if(error){
       console.log(result)
      }
    });


  }
});
}



if (Meteor.isServer) {
  Meteor.methods({
      registerSuperAdmin: function(data) {
        try {
          console.log("Register User");
          console.log(data);

          user = Accounts.createUser({
            username: data.name,
            email: data.email,
            password: data.password,
            profile: {
              name: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              createdOn: new Date(),
              IsInternal: 0
            }
          });

          Roles.addUsersToRoles(user, ['admin','superadmin'], 'admin');
          Roles.addUsersToRoles(user, ['user','observer'], 'users');
          Roles.addUsersToRoles(user, ['enabled'], 'enabled');

          return {
            "userId": user
          };
        } catch (e) {
          // IF ALREADY EXSIST THROW EXPECTION 403
          throw e;
        }
     },
     registerAdmin: function(data) {
       try {
         console.log("Register User");
         console.log(data);

         user = Accounts.createUser({
           username: data.name,
           email: data.email,
           password: data.password,
           profile: {
             name: data.email,
             firstName: data.firstName,
             lastName: data.lastName,
             createdOn: new Date(),
             IsInternal: 0
           }
         });

         Roles.addUsersToRoles(user, ['admin'], 'admin');
         Roles.addUsersToRoles(user, ['user','observer'], 'users');
         Roles.addUsersToRoles(user, ['enabled'], 'enabled');

         return data;
       } catch (e) {
         // IF ALREADY EXSIST THROW EXPECTION 403
         throw e;
       }
    },
    registerUser: function(data) {
      try {
        console.log("Register User");
        console.log(data);

        user = Accounts.createUser({
          username: data.name,
          email: data.email,
          password: data.password,
          profile: {
            name: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            createdOn: new Date(),
            IsInternal: 0
          }
        });

        Roles.addUsersToRoles(user, ['user','observer'], 'users');
        Roles.addUsersToRoles(user, ['enabled'], 'enabled');

        return {
          "userId": user
        };
      } catch (e) {
        // IF ALREADY EXSIST THROW EXPECTION 403
        throw e;
      }
   },
   registerObserver: function(data) {
     try {
       console.log("Register User");
       console.log(data);

       user = Accounts.createUser({
         username: data.name,
         email: data.email,
         password: data.password,
         profile: {
           name: data.email,
           firstName: data.firstName,
           lastName: data.lastName,
           createdOn: new Date(),
           IsInternal: 0
         }
       });

       Roles.addUsersToRoles(user, ['observer'], 'users');
       Roles.addUsersToRoles(user, ['enabled'], 'enabled');

       return {
         "userId": user
       };
     } catch (e) {
       // IF ALREADY EXSIST THROW EXPECTION 403
       throw e;
     }
  },


  //edit

  editSuperAdmin: function(data) {
    try {
      console.log("edit User");
      console.log(data);

      currentId= Meteor.userId();
      user= data.id;

      if(Roles.userIsInRole(currentId,['superadmin'], 'admin') ){
        console.log(user);
        Meteor.users.update({_id:user}, {$set: {"profile.name": data.name}});
        Meteor.users.update({_id:data.id}, {$set: {"profile.firstName": data.firstName}});
        Meteor.users.update({_id:data.id}, {$set: {"profile.lastName": data.lastName}});

        Roles.addUsersToRoles(user, ['admin','superadmin'], 'admin');
        Roles.addUsersToRoles(user, ['user','observer'], 'users');
        Roles.addUsersToRoles(user, ['enabled'], 'enabled');

        return {
          "userId": data.id,
          "thisId": currentId
        };
      } else return {
        "message":  "not autorized"
      };

    } catch (e) {
      // IF ALREADY EXSIST THROW EXPECTION 403
      throw e;
    }
  },
  editAdmin: function(data) {
   try {
     console.log("edit User");
     console.log(data);

     currentId= Meteor.userId();
     user= data.id;

     if(Roles.userIsInRole(currentId,['superadmin'], 'admin') && !Roles.userIsInRole(user,['superadmin'], 'admin') ){
         Meteor.users.update({_id:data.id}, {$set: {"profile.name": data.name}});
         Meteor.users.update({_id:data.id}, {$set: {"profile.firstName": data.firstName}});
         Meteor.users.update({_id:data.id}, {$set: {"profile.lastName": data.lastName}});

         Roles.addUsersToRoles(user, ['admin'], 'admin');
         Roles.addUsersToRoles(user, ['user','observer'], 'users');
         Roles.addUsersToRoles(user, ['enabled'], 'enabled');

         Roles.removeUsersFromRoles(user, ['superadmin'], 'admin');

         return {
           "userId": data.id,
           "thisId": currentId
         };
     } else return {
       "message":  "not autorized"
     };

   } catch (e) {
     // IF ALREADY EXSIST THROW EXPECTION 403
     throw e;
   }
  },
  editUser: function(data) {
  try {
    console.log("edit User");
    console.log(data);

    currentId= Meteor.userId();
    user= data.id;
    if(Roles.userIsInRole(currentId,['admin'], 'admin') && !Roles.userIsInRole(user,['superadmin'], 'admin') ){
        Meteor.users.update({_id:data.id}, {$set: {"profile.name": data.name}});
        Meteor.users.update({_id:data.id}, {$set: {"profile.firstName": data.firstName}});
        Meteor.users.update({_id:data.id}, {$set: {"profile.lastName": data.lastName}});

        Roles.addUsersToRoles(user, ['user','observer'], 'users');
        Roles.addUsersToRoles(user, ['enabled'], 'enabled');

        Roles.removeUsersFromRoles(user, ['admin','superadmin'], 'admin');

        return {
          "userId": data.id,
          "thisId": currentId
        };
    } else return {
      "message":  "not autorized"
    };
  } catch (e) {
    // IF ALREADY EXSIST THROW EXPECTION 403
    throw e;
  }
  },
  editObserver: function(data) {
  try {
   console.log("edit User");
   console.log(data);

   currentId= Meteor.userId();
   user= data.id;
   if(Roles.userIsInRole(currentId,['admin'], 'admin') && !Roles.userIsInRole(user,['superadmin'], 'admin') ){
       Meteor.users.update({_id:data.id}, {$set: {"username": data.name}});
       Meteor.users.update({_id:data.id}, {$set: {"profile.firstName": data.firstName}});
       Meteor.users.update({_id:data.id}, {$set: {"profile.lastName": data.lastName}});

       Roles.addUsersToRoles(user, ['observer'], 'users');
       Roles.addUsersToRoles(user, ['enabled'], 'enabled');


       Roles.removeUsersFromRoles(user, ['admin','superadmin'], 'admin');
       Roles.removeUsersFromRoles(user, ['user'], 'users');

       return {
         "userId": data.id,
         "thisId": currentId
       };
   }
   else return {
      "message":  "not autorized"
    };
  } catch (e) {
   // IF ALREADY EXSIST THROW EXPECTION 403
   throw e;
  }
  },




  disableUser: function(id) {
    try {
      var editableuser= false;
      var currentId=Meteor.userId();
      if(currentId==id){
        editableuser= true;
      }
      else if (Roles.userIsInRole(Meteor.userId(),'superadmin','admin') && Roles.userIsInRole(Meteor.userId(),'enabled','enabled')) {
        editableuser= true;
      } else if (Roles.userIsInRole(Meteor.userId(),'admin','admin') && Roles.userIsInRole(Meteor.userId(),'enabled','enabled') ) {
         if (Roles.userIsInRole(id,'superadmin','admin') || Roles.userIsInRole(id,'admin','admin') ){
           editableuser= false;
         } else{
           editableuser= true;
         }
      } else {
        editableuser= false;
      }

      if (editableuser){
        console.log("Disable User");
        console.log(id);
        Roles.removeUsersFromRoles(id, ['enabled'], 'enabled');

      } else {
        return {
          "message": "not autorized"
        };
      }

    } catch (e) {
      // IF ALREADY EXSIST THROW EXPECTION 403
      throw e;
    }
 },
 enableUser: function(id) {
   try {
     var editableuser= false;
     var currentId=Meteor.userId();
     if(currentId==id){
       editableuser= true;
     }
     else if (Roles.userIsInRole(Meteor.userId(),'superadmin','admin') && Roles.userIsInRole(Meteor.userId(),'enabled','enabled')) {
       editableuser= true;
     } else if (Roles.userIsInRole(Meteor.userId(),'admin','admin') && Roles.userIsInRole(Meteor.userId(),'enabled','enabled') ) {
        if (Roles.userIsInRole(id,'superadmin','admin') || Roles.userIsInRole(id,'admin','admin') ){
          editableuser= false;
        } else{
          editableuser= true;
        }
     } else {
       editableuser= false;
     }

     if (editableuser){
       console.log("enable User");
       console.log(id);
       Roles.addUsersToRoles(id, ['enabled'], 'enabled');

     } else {
       return {
         "message": "not autorized"
       };
     }

   } catch (e) {
     // IF ALREADY EXSIST THROW EXPECTION 403
     throw e;
   }
},


   });
}
