
Template.alarmhistory.events({
    'click #cleanAlarmHistory' : function () {
      var r = confirm("Delete Alarm logs? Alarm logs will be deleted permanently");
      if (r == true) {
        Meteor.call('deleteAlarmHistory', function(error, result){
          if(result){
           console.log(result)
          }
          if(error){
           console.log(result)
          }
        });
        alert("Deleted");
      }

      }
});
