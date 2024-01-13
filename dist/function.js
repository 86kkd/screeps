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

module.exports = creep_counter;


  
