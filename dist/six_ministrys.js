var { sys_log } = require('function');
const { run } = require('./role.harvester');
// spawn creeps and assign attributes
function assign_creep_attributes (
  spawn,screep_role,
  body_function,scree_group){
    var id_number = 0;
    var spawn_result = 0;
    var ploy_index = 0;
    var body = body_function[ploy_index];
    do{
      spawn_result = spawn.spawnCreep(
        body,
        screep_role+id_number,
        {memory:{role:screep_role,group:scree_group}});
      if (spawn_result == ERR_NOT_ENOUGH_ENERGY){
        //using plan B
        ploy_index +=1;
        body = body_function[ploy_index]
      }
      id_number ++;
    }
    while(spawn_result == ERR_NAME_EXISTS||
      spawn_result == ERR_NOT_ENOUGH_ENERGY);
    return spawn_result;
};

//户部 职能：负责财政、税收、人口统计、户口管理等方面的工作。
var RevenueMinistry = {

  init: function(spawn){
    this.room_energy_available = 
      spawn.room.energyAvailable;
    this.room_energy_capacity_available = 
      spawn.room.energyCapacityAvailable;

  },
  /*******create and kill creeps*********/
  // create and maintain woker numbers
  
  spawn_creeps:function (spawn,counter,stage_ploy){
    var spawn_result = undefined;
    if(counter.harvester<stage_ploy.num_harvester){
      spawn_result = 
      assign_creep_attributes (
        spawn,"harvester",
        ploy=stage_ploy);
    }
    else if(counter.upgrader<stage_ploy.num_upgrader){
      spawn_result = 
      assign_creep_attributes(
        spawn,"upgrader",
        tloy=stage_ploy);
    }
    else if(counter.builder<stage_ploy.num_builder){
      spawn_result = 
      assign_creep_attributes(
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

  room_counter: function(spawn) {
    this.num_harvester = 0;
    this.num_upgrader = 0;
    this.num_builder = 0;
    this.num_other = [];
    this.death = 0;
    this.deceased_stom = [],
    spawn.room.find(FIND_TOMBSTONES).forEach(tombstone => {
      if(tombstone.creep.my) {
          this.death+=1;
          this.deceased_stom.push(tombstone.creep.pos)
          console.log(`My creep died with ID=${tombstone.creep.id} ` +
              `and role=${Memory.creeps[tombstone.creep.name].role}`);   
      }    
    });
    spawn.room.find(FIND_TOMBSTONES).forEach(tombstone => {
      if(tombstone.creep instanceof PowerCreep) {
          console.log(`Power creep died here`);   
      }    
    });
    for(var name in Game.creeps){
      if(Game.creeps[name].memory.role=='harvester') {
        this.num_harvester += 1;
      }
      else if(Game.creeps[name].memory.role=='upgrader'){
        this.num_upgrader += 1;
      }
      else if(Game.creeps[name].memory.role=='builder'){
        this.num_builder += 1;
      }
      else{
        this.num_other.push(name) ;
      }
    }     
  },
};

//吏部 管理官员任免、选拔、培训等人事事务。
var PersonnelMinistry = {
// worker creep body and power in each strage
  gorup:{
    stage_ploy:undefined,
    stage_level:undefined,
    group_size:undefined,
    func:[{
      type:undefined,
      num:undefined,
    }]
  
  },
  //construct function must use new
  init: function(spawn){
    this.stage_level = spawn.room.controller.level;
  },

  gen_body_list:function(body_list,func,num){
    for(var i=0;i<num;i++){
      body_list.push(func);
    }
    return body_list;
  },

  assign_group_major:function(group){
    for(func in group.func){
      group.body = this.gen_body_list(
        group.body,func.type,func.num);
    }
    return group;
  }

};
//礼部 职能：管理宗教、礼仪、外交事务，以及皇帝的祭祀仪式。
var RitesMinistry = {
// room claim
};
//兵部 职能：负责军事组织、编制、征兵、军费等军事事务。
var WarMinistry = {
 // war and attack defain 
 detect: function(creep,anotherCreep){
  const exitDir = creep.room.findExitTo(anotherCreep.room);
  const exit = creep.pos.findClosestByRange(exitDir);
  creep.moveTo(exit);

  // 或简写为：
  creep.moveTo(anotherCreep);
  creep.moveTo(new RoomPosition(25,25, anotherCreep.pos.roomName));

 }
};
//刑部 职能：司法和刑事审判，管理法律制度，处理犯罪和刑罚。
var JusticMinistry = {

};
//工部 职能：管理土木工程、水利工程、工程建设等公共工程事务。
var PublicWorksMinistry = {
// build preority and repair preority
  construct_preority:undefined,
  set_preority: function(){
  
  }
}
module.export = {RevenueMinistry,PersonnelMinistry,
  RitesMinistry,WarMinistry,
  JusticMinistry,PublicWorksMinistry}
