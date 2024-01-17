var { sys_log } = require('function');
const { run } = require('./role.harvester');
//户部 职能：负责财政、税收、人口统计、户口管理等方面的工作。
var RevenueMinistry = {
  msg:{
    spawn_success:undefined,

  },
  /*******create and kill creeps*********/
  // create and maintain woker numbers
  assign_creep_attributes: function(spawn,role,ploy){
    var id_number = 0;
    var spawn_result = 0;
    var ploy_index = 0;
    var in_use_ploy = ploy[ploy_index];
    do{
      spawn_result = spawn.spawnCreep(
        in_use_ploy.body[role],
        screep_role+id_number,
        {memory:{role:screep_role,group:scree_group}});
      if (spawn_result == ERR_NOT_ENOUGH_ENERGY){
        //using plan B
        ploy_index +=1;
        in_use_ploy = ploy[ploy_index]
      }
      id_number ++;
    }
    while(spawn_result == ERR_NAME_EXISTS||
      spawn_result == ERR_NOT_ENOUGH_ENERGY);
    return spawn_result;
  },
  spawn_creep:function (spawn,counter,stage_ploy){
    var spawn_result = undefined;
    if(counter.harvester<stage_ploy.num_harvester){
      spawn_result = 
      this.assign_creep_attributes (
        spawn,"harvester",
        ploy=stage_ploy);
    }
    else if(counter.upgrader<stage_ploy.num_upgrader){
      spawn_result = 
      this.assign_creep_attributes(
        spawn,"upgrader",
        ploy=stage_ploy);
    }
    else if(counter.builder<stage_ploy.num_builder){
      spawn_result = 
      this.assign_creep_attributes(
        spawn,"builder",
        ploy=stage_ploy);
    }
    else{
      // need not spawn creeps
      spawn_result = 1;
    }
    this.msg.spawn_success = spawn_result;
    return spawn_result;
  },
  // count creeps in the room
  creep_counter :{
    harvester : 0,
    upgrader: 0,
    builder: 0,
    /** @param {Creep} creep **/
    count: function() {
      this.harvester = 0;
      this.upgrader = 0;
      this.builder = 0;
      this.other = 0;
      for(var name in Game.creeps){
        if(Game.creeps[name].memory.role=='harvester') {
          this.harvester += 1;
        }
        else if(Game.creeps[name].memory.role=='upgrader'){
          this.upgrader += 1;
        }
        else if(Game.creeps[name].memory.role=='builder'){
          this.builder += 1;
        }
        else{
          this.other +=1;
        }
      }     
      return this;
    }
  },
  // source to harvest
  source_deleop_mgr:{
    group:undefined,
    room:undefined,
  }
// source to trans
// creeps count

};
//吏部 管理官员任免、选拔、培训等人事事务。
var PersonnelMinistry = {
// worker creep body and power in each strage
  stage_ploy:undefined,
  stage:undefined,
  init: function(spawn){
    this.stage = spawn.room.controller.level;
  }
};
//礼部 职能：管理宗教、礼仪、外交事务，以及皇帝的祭祀仪式。
var RitesMinistry = {
// room claim
};
//兵部 职能：负责军事组织、编制、征兵、军费等军事事务。
var WarMinistry = {
 // war and attack defain 
};
//刑部 职能：司法和刑事审判，管理法律制度，处理犯罪和刑罚。
var JusticMinistry = {

};
//工部 职能：管理土木工程、水利工程、工程建设等公共工程事务。
var PublicWorksMinistry = {
// build preority and repair preority
}
module.export = {RevenueMinistry,PersonnelMinistry,
  RitesMinistry,WarMinistry,
  JusticMinistry,PublicWorksMinistry}
