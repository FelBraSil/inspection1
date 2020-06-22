import { AmpDevices } from '/lib/collections/amp/ampcollection.js';
import { Branches } from '/lib/collections/amp/branchescollection.js';
import { SystemVars } from '/lib/collections/systemvars.js';

import download from 'downloadjs';

Template.ampForm.onCreated(function () {
    this.subscribe('ampdevices');
});

Template.ampForm.helpers({
    ampCollection() {
        return AmpDevices;
    },
    ampElements() {
        return AmpDevices.find();
    },
    getAmpAddress() {  //mensajes con formato definitivo
        var ampAddressSetUp = SystemVars.find({systemitem: "ampAddress"});
        return ampAddressSetUp;
    },
});

const ampListHelpers = {
    ampCollection() {
        return AmpDevices;
    },
    ampItems() {
        return AmpDevices.find();
    },
    getAmpAddress() {  //mensajes con formato definitivo
        var ampAddressSetUp = SystemVars.find({systemitem: "ampAddress"});
        return ampAddressSetUp;
    },
};

Template.amplist.helpers(ampListHelpers);
Template.ampitem.helpers(ampListHelpers);

Template.ampForm.events({


});

Template.ampForm.events({
  'click .maxminaddress'(event, template){
    let minnum = template.find('#minnum');
    let maxnum = template.find('#maxnum');
    console.log(minnum.value);
    console.log(maxnum.value);
    systemobject = {
     systemitem: "ampAddress",
     min:  minnum.value,
     max:  maxnum.value,
     apply:  true,
    };
    Meteor.call('updateSystemVarsAmp',systemobject, function(error, result){
      if(result){
       console.log(result)
      }
      if(error){
       console.log(result)
      }
    });
  },

});

/**

**/
