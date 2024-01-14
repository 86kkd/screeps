const { run } = require("./role.harvester");

var creep_counter = {
    
  harvester : 0,
  upgrader: 0,
  builder: 0,
    
  /** @param {Creep} creep **/
  count: () => {
    this.harvester =0;
    this.upgrader =0;
    this.builder =0;
    for(var name in Game.creeps){
      if(name.includes('harvester')) {
        this.harvester += 1;
    //    console.log(this.harvester+'this.harvester');
      }
      else if(name.includes('upgrader')) this.upgrader = 1+this.upgrader;
      else if(name.includes('builder')) this.builder = 1+this.upgrader;
    }
    return this;
  }
};

var room_targets = {

  source_target:null,
  
  /** @param {Creep} creep **/
  search: (creep) =>{
    // console.log('bug here');
    this.source_target = creep.room.find(FIND_SOURCES);
    // console.log('bug not here');
    return this;   
  }
};

function auto_name_spawn(spawn,
  screep_role,
  scree_group,
  body)
{
  var number = 0;
  var result = 0;
  do{
    // console.log("finall spawn"+ screep_role);
    result = spawn.spawnCreep(body,screep_role+number,
    {memory:{role:screep_role,group:scree_group}});
    number ++;
  }
  while(result == ERR_NAME_EXISTS);
  return result;
}
/**
 * @param {spawn} spawn 
 * @param {*} counter 
 */
function init_serval_workers (spawn,counter){
  console.log("alive screeps:\nharvester"+counter.harvester+"\n"+
              "upgrader" + counter.upgrader+'\n'+
              "builder" + counter.builder + '\n'
              );
  if(counter.harvester<3){
    var result = auto_name_spawn(spawn,"harvester",group,
    [WORK,WORK,CARRY,MOVE]);
    counter.harvester+=1;
    console.log("spawn Harvester"+(counter.harvester+1)+
    " result: " + result);
  }
  else if(counter.upgrader<6){
    var result = auto_name_spawn(spawn,"upgrader",group,
    [WORK,WORK,CARRY,MOVE]);
    counter.upgrader+=1;
    console.log("spawn Upgrader"+(counter.upgrader+1)+
    " result: " + result);
  }
  else if(counter.builder<5||spawn.store.getFreeCapacity()){
    var result = auto_name_spawn(spawn,"builder",group,
    [WORK,WORK,CARRY,MOVE]);
    counter.builder+=1;
    console.log("spawn Builder"+(counter.upgrader+1)+
    " result: " + result);
      // console.log('spawnCreep signal '+success);
  }

};

var group = {
    min:3,
    mid:5,
    large:9,
    group_id :0,
    getid: () =>{
      console.log("the "+group+1+'th group for'+ work + " is ready");
      return this.group_id+=1;
    }

};
module.exports = {creep_counter,room_targets,init_serval_workers,group};