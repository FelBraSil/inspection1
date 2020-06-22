import { MQTTcollection } from '/lib/collections/collections.js';
import { PollingDevices } from '/lib/collections/PollingDevices.js';
import { AmpDevices } from '/lib/collections/amp/ampcollection.js';
import { ModbusDevices } from '/lib/collections/dolf/ModbusDevices.js';
import { ModbusDeviceClass } from '/lib/collections/dolf/ModbusDeviceClass.js';
import { DRSConfs } from '/lib/collections/drs/DRSConfs.js';
import { Config } from '/lib/config/config.js';

if (Meteor.isClient) {
  if(Config.currentsystem=="DOLF") Meteor.subscribe('modbusdeviceclass');
  if(Config.currentsystem=="DOLF") Meteor.subscribe('mbpollingdevices');
  if(Config.currentsystem=="DRS") Meteor.subscribe('pollingdevices');
}
//

var pollingDevicesHelpers = {
  formCollectionD() {
      let thisCollection;
      if(Config.currentsystem=="DOLF") thisCollection=ModbusDevices;
      if(Config.currentsystem=="AMP") thisCollection=AmpDevices;
      if(Config.currentsystem=="DRS") thisCollection=PollingDevices;
      return thisCollection;
  },
  formCollectionM() {
    let thisCollection;
    if(Config.currentsystem=="DOLF") thisCollection=ModbusDevices;
    if(Config.currentsystem=="AMP") thisCollection=AmpDevices;
    if(Config.currentsystem=="DRS") thisCollection=PollingDevices;
    return thisCollection;
  },
  formCollectionMs() {
    console.log("modbusdevices");let thisCollection;
    if(Config.currentsystem=="DOLF") thisCollection=ModbusDevices;
    if(Config.currentsystem=="AMP") thisCollection=AmpDevices;
    if(Config.currentsystem=="DRS") thisCollection=PollingDevices;
      return thisCollection.find({});
  },
  formCollectionsD() {
    if(Config.currentsystem=="DOLF") thisCollection=ModbusDevices;
    if(Config.currentsystem=="AMP") thisCollection=AmpDevices;
    if(Config.currentsystem=="DRS") thisCollection=PollingDevices;
      return thisCollection.find({});
  },
  classOptions: function () {
                    console.log("modbusdeviceclass");
                    return ModbusDeviceClass.find().map(function (c) {
                      return {label: c.name, value: c._id};
      });

    },

  configOptions: function () {
                      console.log("modbusdeviceclass");
                      return DRSConfs.find().map(function (c) {
                        return {label: c.confname, value: c._id};
        });

  },

  ampList: function () {
          let thisOption = AmpDevices.find().map(function (c) {
                         return {label: c.devicename, value: c._id};
          });
          thisOption.unshift({label:"Root Node", value:"0"});
          return thisOption;
    },
  MBClass(idclass){
    var thisClass = ModbusDeviceClass.findOne({_id:idclass});
    return thisClass.name;
  }
};

Template.drspollinglistt.events({
    'click .redeployDevice'(){
      var r = confirm("Re-Deploy?");
      if (r == true) {
        PollingDevices.update({_id:this._id},{$set:{ deploy: true, isSetup: false}});
        console.log(this._id);
        alert("Deploy en curso");
      }
    },
    'click .editPollingDevice'(){
      console.log("edit");
    },
    'click .deletePollingDevice'(){
      var r = confirm("Deshabilitar?");
      if (r == true) {
        PollingDevices.update({_id:this._id},{$set:{dontShowThis:true,deploy:false}});
        console.log(this._id);
        alert("Deshabilitado");
      }
    },
    'click .enablePollingDevice'(){
      var r = confirm("Habiltar?");
      if (r == true) {
        PollingDevices.update({_id:this._id},{$set:{dontShowThis:false}});
        console.log(this._id);
        alert("Habilitado");
      }
    } ,
    'click .mqttcleanup'(){
      var r = confirm("Delete MQTT messages for this device? (this will delete MQTT messages permanently, but at the client side only)");
      if (r == true) {
        //PollingDevices.update({_id:this._id},{$set:{dontShowThis:false}});
        console.log(this._id);
        Meteor.call("removeTopics", this._id);
        alert("Borrando");
      }
    }

});

Template.dolfpollinglistt.events({
    'click .redeployDevice'(){
      var r = confirm("Re-Deploy?");
      if (r == true) {
        ModbusDevices.update({_id:this._id},{$set:{ deploy: true}});
        console.log(this._id);
        alert("Deploy en curso");
      }
    },
    'click .editPollingDevice'(){
      console.log("edit");
    },
    'click .deletePollingDevice'(){
      var r = confirm("Deshabilitar?");
      if (r == true) {
        ModbusDevices.update({_id:this._id},{$set:{dontShowThis:true,deploy:false}});
        console.log(this._id);
        alert("Deshabilitado");
      }
    },
    'click .enablePollingDevice'(){
      var r = confirm("Habiltar?");
      if (r == true) {
        ModbusDevices.update({_id:this._id},{$set:{dontShowThis:false}});
        console.log(this._id);
        alert("Habilitado");
      }
    } ,
    'click .mqttcleanup'(){
      var r = confirm("Delete MQTT messages for this device? (this will delete MQTT messages permanently, but at the client side only)");
      if (r == true) {
        console.log(this._id);
        Meteor.call("removeTopicsMB", this._id);
        alert("Borrando");
      }
    },
    'click .devDelete'(){
      var r = confirm("Delete Device? (this will also delete all the MQTT messages related to this device)");
      if (r == true) {
        console.log(this._id);
        Meteor.call("removeDevice", this._id);
        alert("Borrando");
      }
    }

});

Template.amplist.events({
    'click .redeployDevice'(){
      var r = confirm("Re-Deploy?");
      if (r == true) {
        AmpDevices.update({_id:this._id},{$set:{ deploy: true}});
        console.log(this._id);
        alert("Deploy en curso");
      }
    },
    'click .editPollingDevice'(){
      console.log("edit");
    },
    'click .deletePollingDevice'(){
      var r = confirm("Deshabilitar?");
      if (r == true) {
        AmpDevices.update({_id:this._id},{$set:{dontShowThis:true,deploy:false}});
        console.log(this._id);
        alert("Deshabilitado");
      }
    },
    'click .enablePollingDevice'(){
      var r = confirm("Habiltar?");
      if (r == true) {
        AmpDevices.update({_id:this._id},{$set:{dontShowThis:false}});
        console.log(this._id);
        alert("Habilitado");
      }
    } ,
    'click .mqttcleanup'(){
      var r = confirm("Delete MQTT messages for this device? (this will delete MQTT messages permanently, but at the client side only)");
      if (r == true) {
        console.log(this._id);
        Meteor.call("removeTopicsMB", this._id);
        alert("Borrando");
      }
    },
    'click .devDelete'(){
      var r = confirm("Delete Device? (this will also delete all the MQTT messages related to this device)");
      if (r == true) {
        console.log(this._id);
        Meteor.call("removeDeviceAmp", this._id);
        alert("Borrando");
      }
    }

});

Template.classconfig.events({
    'click .edit'(){
      console.log("edit");
    },
    'click .delete'(){
      var r = confirm("Borrar?");
      if (r == true) {
        Meteor.call("removeMBGroup", this._id);
        console.log(this._id);
        alert("Borrado");
      }
    },
});

Template.groupconfig.events({
    'click .edit'(){
      console.log("edit");
    },
    'click .delete'(){
      var r = confirm("Borrar?");
      if (r == true) {
        Meteor.call("removeMBVar", this._id);
        console.log(this._id);
        alert("Borrado");
      }
    },
});

Template.ampForm.helpers(pollingDevicesHelpers);
Template.ampitem.helpers(pollingDevicesHelpers);
Template.dolfitem.helpers(pollingDevicesHelpers);
Template.pollingitem.helpers(pollingDevicesHelpers);
Template.amplist.helpers(pollingDevicesHelpers);
Template.dolfpollinglistt.helpers(pollingDevicesHelpers);
Template.dolfpollinglist.helpers(pollingDevicesHelpers);
Template.drspollinglistt.helpers(pollingDevicesHelpers);
Template.drspollinglist.helpers(pollingDevicesHelpers);
Template.pollinglist.helpers(pollingDevicesHelpers);
Template.pollinglisttemplate.helpers(pollingDevicesHelpers);
