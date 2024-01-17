var {RevenueMinistry,PersonnelMinistry,
  RitesMinistry,WarMinistry,
  JusticMinistry,PersonnelMinistry} = require("six_ministrys");

  var central_goverment = {
    spawn_msg:{'-6':"energy is not enough",
        '-4':"spawing creep",
        '0':"spawn success"
    },
    Revenue : RevenueMinistry,
    log_system :{
        info: function(str){
        console.log(str);
        },
        fetch_msg: function(debug_mod){
            this.info
            this.info("Spawn " + this.Revenue.spawn_msg);
        }
    }
    
}
    