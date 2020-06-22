setAlarmVar= false;
setAlarmVarNum= 0;
setOffline=false;
setOfflineNum=0;
alarmObj=[];
systemTimezone= 'America/Santiago'


Meteor.call('serverState', (err, res) => {
  if (err) {
    alert(err);
  } else {
    console.log(res);
  }
});
