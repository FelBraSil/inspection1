import { DataGroups } from '/lib/collections/dolf/DataGroups.js';
import { ModbusDeviceClass } from '/lib/collections/dolf/ModbusDeviceClass.js';
import { ModbusDevices } from '/lib/collections/dolf/ModbusDevices.js';
import { ModbusVar } from '/lib/collections/dolf/ModbusVar.js';


Template.modbusconfig.helpers({
    modbusDeviceClass() {
        return ModbusDeviceClass;
    },
    modbusDeviceClassElements() {
        return ModbusDeviceClass.find();
    },
});

Template.classconfig.helpers({
    DataGroups() {
        return DataGroups;
    },
    modbusDeviceGroups() {
        return DataGroups.find({classd:Router.current().params.current_class});
    },
    classId() {
        return Router.current().params.current_class;
    },
});

Template.groupconfig.helpers({
    modbusVar() {
        return ModbusVar;
    },
    modbusVars() {
        return ModbusVar.find({groupid:Router.current().params.current_group});
    },
    groupId() {
        return Router.current().params.current_group;
    },
    classId() {
        return Router.current().params.current_class;
    },
}); //groupconfig

Template.varconfig.helpers({
    modbusVars(){
      return ModbusVar;
    },
    modbusVar() {
        return ModbusVar.findOne({groupid:Router.current().params.current_group,_id:Router.current().params.current_var});
    },
    groupId() {
        return Router.current().params.current_group;
    },
    classId() {
        return Router.current().params.current_class;
    },
    varId() {
        return Router.current().params.current_var;
    },
});

Template.mbclass.events({
    'click #delete'(){
      var r = confirm("Delete?");
      if (r == true) {
        //Images.remove(this.picture);
        //Team.remove(this._id);
        Meteor.call("toggleMBClassItem",this.element._id, this.element.dontShowThis);
        alert("Deleted");
      }
    },
    'click #edit'(){
        console.log("insert edit action here, programmer!");
    }
});

var hooksObjectGroup = {
  before: {
    insert: function(doc){
      var postId = Router.current().params.current_group;
      console.log("current group "+postId);
      doc.groupid = postId;
      return doc;
    }
  },
}

var hooksObjectClass = {
  before: {
    insert: function(doc){
      var postId = Router.current().params.current_class;
      console.log("current class "+postId);
      doc.classd = postId;
      return doc;
    }
  },
}

if (Meteor.isClient) {
  Template.modbusconfig.onCreated(function () {
      Meteor.subscribe('modbusdeviceclass');
  });

  Template.classconfig.onCreated(function () {
      Meteor.subscribe('datagroups');
  });

  Template.groupconfig.onCreated(function () {
      Meteor.subscribe('modbusvar');
  });

    AutoForm.addHooks(['insertGroup'], hooksObjectClass);
    AutoForm.addHooks(['insertVar'], hooksObjectClass);
    AutoForm.addHooks(['insertVar'], hooksObjectGroup);
}
