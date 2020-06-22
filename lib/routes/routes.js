Router.configure({
  layoutTemplate: "appbody",
  loadingTemplate: 'loading'
});

Router.route('/', function () {
  this.render('mqttList');
});


Router.map(function(){
  this.route('Places',{
    path:"/places",
    template:"formtest",
  });
});

Router.map(function(){
  this.route('Device Config',{
    path:"/devconfig",
    template:"deviceconfig",
  });
});

Router.map(function(){
  this.route('settings',{
    path:"/settings",
    template:"settings",
  });
});

Router.map(function(){
  this.route('Configuration',{
    path:"/config",
    template:"config",
  });
});

Router.map(function(){
  this.route('Profile',{
    path:"/profile",
    template:"profile",
  });
});

Router.map(function(){
  this.route('About',{
    path:"/about",
    template:"about",
  });
});

Router.map(function(){
  this.route('Supervisores',{
    path:"/supervisores",
    template:"supervisores",
  });
});

Router.map(function(){
  this.route('Mantenciones',{
    path:"/mantenciones",
    template:"mantlistfull",
  });
});

Router.route('/systemmap/', function() {
  this.render('mapmodule',{data: {noRendered:true}});
});

Router.route('/systemmap/:thisMapId', function() {
  this.render('mapmodule',{data: {thisMapId: this.params.thisMapId, noRendered:true}});
});

Router.map(function(){
  this.route('System Alarms',{
    path:"/alarms",
    template:"alarmmodule",
  });
});

Router.map(function(){
  this.route('Map Manager',{
    path:"/mapmanager",
    template:"mapmanager",
  });
});

Router.map(function(){
  this.route('Polling List',{
    path:"/pollinglist",
    template:"pollinglisttemplate",
  });
});

Router.route('/branchlist', function() {
  this.render('branchlist',{data: {edit: false}});
});

Router.route('/equipos', function() {
  this.render('mqttList',{data: {edit: false}});
});

Router.route('/editequipos', function() {
  this.render('mqttList',{data: {edit: true}});
});

Router.route('/editspecial', function() {
  this.render('mqttList',{data: {specialedit: true}});
});

Router.route('/element/:current_id', function() {
  this.render('mqttElement',{data: {current_id: this.params.current_id, edit: false }});
});

Router.route('/element/:current_id/:current_subr_id/:current_subrel_id', function() {
  this.render('mqttsubelementtemplate',{data: {current_id: this.params.current_id, current_subr_id: this.params.current_subr_id, current_subrel_id: this.params.current_subrel_id, edit: false }});
});

Router.route('/elementedit/:current_id', function() {
  this.render('formelement',{data: {current_id: this.params.current_id, edit: true}});
});

Router.route('/supervisor/:current_id', function() {
  this.render('supervisor',{data: {current_id: this.params.current_id}});
});

Router.route('/login', function () {
  this.layout('loginlayout');
  this.render('login');
});

Router.route('/elementg/:current_id/var/:vartopicid', function() {
  this.render('drsGraphics',{data: {current_id: this.params.current_id, topicId: this.params.vartopicid, edit: false }});
});

Router.route('/elementg/:current_id/var/:vartopicid/vid/:varid', function() {
  this.render('drsGraphics',{data: {current_id: this.params.current_id, topicId: this.params.vartopicid, varid: this.params.varid, edit: false }});
});


Router.route('/createInitSigmati0n1qaz2wsx', function () {
  this.layout('admincreatelayout');
  this.render('admincreate');
});

Router.route('/alarmhistory/:currentTopicId/', function() {
  this.render('alarmhistorytemplate',{data: {currentTopicId: this.params.currentTopicId}});
});

Router.route('/config/modbusclass/:current_class/', function() {
  this.render('classconfig',{data: {current_class: this.params.current_class}});
});

Router.route('/config/modbusclass/:current_class/group/:current_group', function() {
  this.render('groupconfig',{data: {current_class: this.params.current_class,current_group: this.params.current_group}});
});

Router.route('/config/modbusclass/:current_class/group/:current_group/var/:current_var', function() {
  this.render('varconfig',{data: {current_class: this.params.current_class,current_group: this.params.current_group,current_var: this.params.current_var}});
});

Router.route('/pollinglist/:current_item', function() {
  this.render('pollingitem',{data: {current_item: this.params.current_item }});
});
