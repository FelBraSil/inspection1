import {Supervisores} from '/lib/collections/supervisores.js';
import { Images } from '/lib/collections/images.js';

Template.displayEjercicios.onCreated(function () {
    Meteor.subscribe('supervisores');
});

Template.supervisoresform.onCreated(function () {
    Meteor.subscribe('supervisores');
});

Template.supervisor.onCreated(function () {
    Meteor.subscribe('supervisor');
});

Template.displayEjercicios.helpers({
    supervisoresList(){
        return Supervisores.find({});
    },
    imageFile(pictureId){
        const fileRef = Images.collection.findOne(pictureId);
        return Images.link(fileRef, 'thumbnail','/');
    },
    fullImageFile(pictureId){
        var fileRef = Images.collection.findOne(pictureId);
        return Images.link(fileRef, 'original','/');
    },
});

Template.supervisoresform.helpers({
    supervisoresCollection() {
        return Supervisores;
    },
    supervisorList(){
        return Supervisores.find({});
    },
    imageFile(pictureId){
        console.log("imagefile has been called from elementform helpers");
        var fileRef = Images.collection.findOne(pictureId);
        return Images.link(fileRef, 'thumbnail','/');
    },
});

Template.displayEjercicios.events({
    'click #deleteSupervisor'(){
      var r = confirm("Delete?");
      if (r == true) {
        //Images.remove(this.picture);
        //Team.remove(this._id);
        Supervisores.update({_id:this._id},{$set:{dontShowThis:true}});
        alert("Deleted");
      }
    },
    'click #editSupervisor'(){
        console.log("insert edit action here, programmer!");
    }
});

Template.supervisor.helpers({
  displayEjercicio() {
    var myelement = Supervisores.findOne({_id:this.current_id});
    return myelement;
  },
  supervisorList(){
      return Supervisores.find({});
  },
  imageFile(pictureId){
      const fileRef = Images.collection.findOne(pictureId);
      return Images.link(fileRef, 'thumbnail','/');
  },
  fullImageFile(pictureId){
      var fileRef = Images.collection.findOne(pictureId);
      return Images.link(fileRef, 'original','/');
  },
});

//displayEjercicio
