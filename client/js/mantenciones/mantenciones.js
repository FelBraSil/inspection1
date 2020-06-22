import {MantencionesDMT} from '/lib/collections/mantenciones.js';
import {Team} from '/lib/collections/team.js';
import { Images } from '/lib/collections/images.js';

Template.displaymant.onCreated(function () {
    Meteor.subscribe('mantenciones_dmt');
});


Template.mantencion.onCreated(function () {
    Meteor.subscribe('mantenciones_dmt_id',this.current_id);
});

Template.displaymant.helpers({
    itemList(){
        return MantencionesDMT.find({});
    },
    imageFile(pictureId){
        const fileRef = Images.collection.findOne(pictureId);
        return Images.link(fileRef, 'thumbnail','/');
    },
    fullImageFile(pictureId){
        var fileRef = Images.collection.findOne(pictureId);
        return Images.link(fileRef, 'original','/');
    },
    humanTime: function (dateTime) {
      var d = new Date();
      return d.getDay()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes();
    },
    duration: function (dateTime1, dateTime2) {
      const date1 = new Date(dateTime1);
      const date2 = new Date(dateTime2);
      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      const diffMinutes = Math.ceil(diffTime / (1000 * 60 ));
      return diffMinutes;
    },
    equipoNombre: function (anId) {
      var myfind = Team.findOne({_id:anId});
      console.log(myfind.cabecera.name);
      return myfind.cabecera.name;
    },
});

Template.displaymant.events({
    'click #deleteSupervisor'(){
      var r = confirm("Delete?");
      if (r == true) {
        //Images.remove(this.picture);
        //Team.remove(this._id);
        MantencionesDMT.update({_id:this._id},{$set:{dontShowThis:true}});
        alert("Deleted");
      }
    },
    'click #editSupervisor'(){
        console.log("insert edit action here, programmer!");
    }
});

Template.mantencion.helpers({
  displayItem() {
    var myelement = MantencionesDMT.findOne({_id:this.current_id});
    return myelement;
  },
  itemList(){
      return MantencionesDMT.find({});
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
