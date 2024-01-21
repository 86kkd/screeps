var {RevenueMinistry,PersonnelMinistry,
  RitesMinistry,WarMinistry,
  JusticMinistry,PersonnelMinistry} = require("six_ministrys");
function info(str){
        console.log(str);
};
spawn_msg={'-6':"energy is not enough",
    '-4':"spawing creep",
    '0':"spawn success"
};
group_work_assignment={
    how_nany_groups:[
        {
            room_name:'Spawn1',
            how_many_workers:3,
            what_task:'harvester',
            tast_detail:{
                source_id:undefined,
            },
            body:undefined,
            group_id:1,
        },
        {
            room_name:'Spawn1',
            how_many_workers:3,
            what_task:'upgrader',
            group_id:2,
        },
        {
            room_name:'Spawn1',
            how_many_workers:3,
            what_task:'builder',
            group_id:3,
        }
    ],
    main_room:undefined,
}
module.export = {
    
    
    
    fetch_msg: function(debug_mod){
        info();
    },
    update_group_list: function(){

    },
    run:function(spawn){
        var counter = new RevenueMinistry.room_counter(spawn);
        this.update_group_list();
        for (this.group in group_work_assignment){
            RevenueMinistry.spawn_creeps(spawn,counter,stage_ploy);
        }
        this.update_creep_memory();
        return work_list;
    }
}
    