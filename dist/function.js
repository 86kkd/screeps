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
      if(name.includes('Harvester')) {
        this.harvester += 1;
    //    console.log(this.harvester+'this.harvester');
      }
      else if(name.includes('Upgrader')) this.upgrader = 1+this.upgrader;
      else if(name.includes('Builder')) this.builder = 1+this.upgrader;
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

/**
 * @param {spawn} spawn 
 * @param {*} counter 
 */
function init_serval_workers (spawn,counter){
  if(counter.harvester<3){
          spawn.spawnCreep( [WORK,WORK,CARRY,MOVE],'Harvester'
          +(counter.harvester+1), { memory: { role: 'harvester' } } );
      }
      else if(counter.upgrader<3){
          spawn.spawnCreep( [WORK,WORK,CARRY,MOVE],'Upgrader'
          +(counter.upgrader+1),{memory:{role:'upgrader'}});
      }
      else if(counter.builder<5||spawn.store.getFreeCapacity()){
          spawn.spawnCreep( [WORK,WORK,CARRY,MOVE],'Builder'
          +(counter.builder+1),{memory:{role:'builder'}});
          // console.log('spawnCreep signal '+success);
      }

};

module.exports = {creep_counter,room_targets,init_serval_workers};