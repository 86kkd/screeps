var creep_counter = {
    
  harvester : 0,
  upgrader: 0,
  builder: 0,
  other: 0,
    
  /** @param {Creep} creep **/
  count: function() {
    this.harvester =0;
    this.upgrader =0;
    this.builder =0;
    this.other =0;
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
};

var room_targets_ctl = {

  source_target:null,
  
  /** @param {Creep} creep **/
  search: (creep) =>{
    // sys_log('bug here');
    this.source_target = creep.room.find(FIND_SOURCES);
    // sys_log('bug not here');
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
  sys_log("body:"+body.worker_body+' '+
          screep_role+" "+scree_group);
  do{
    // sys_log("finall spawn"+ screep_role);
    result = spawn.spawnCreep(body.worker_body,screep_role+number,
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
function init_serval_workers (spawn,counter,stage_ploy){
  sys_log("alive screeps:\nharvester:"+counter.harvester+"\n"+
              "upgrader :" + counter.upgrader+'\n'+
              "builder  :" + counter.builder + '\n'
              );
  sys_log("stage_ploy.harvester:"+stage_ploy.num_harvester);
  sys_log("counter.harvester<stage_ploy.num_harvester:"+counter.harvester<stage_ploy.num_harvester);
  var group = 1;
  if(counter.harvester<stage_ploy.num_harvester){
    var result = auto_name_spawn(
      spawn,"harvester", group,
      body=stage_ploy);
    sys_log("spawn Harvester"+(counter.harvester+1)+
    " result: " + result);
  }
  else if(counter.upgrader<stage_ploy.num_upgrader){
    var result = auto_name_spawn(spawn,"upgrader",
    group,
    body=stage_ploy);
    sys_log("spawn Upgrader"+(counter.upgrader+1)+
    " result: " + result);
  }
  else if(counter.builder<stage_ploy.num_builder){
    var result = auto_name_spawn(spawn,"builder",
    group,
    body=stage_ploy);
    sys_log("spawn Builder"+(counter.upgrader+1)+
    " result: " + result);
      // sys_log('spawnCreep signal '+success);
  }

};

// var group = {
//     min:3,
//     mid:5,
//     large:9,
//     group_id :0,
//     getid: function(){
//       sys_log("the "+group+1+'th group for'+ work + " is ready");
//       return this.group_id+=1;
//     }

// };
function sys_log(str){
  console.log(str)
}
module.exports = {creep_counter,room_targets: room_targets_ctl,init_serval_workers,sys_log};