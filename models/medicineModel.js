const db    = require('./db');

module.exports={
    getAllMedicine: (callback)=>{
        var sql="select * from medicine";
        db.getResults(sql, (results)=>{
			callback(results);
        });
    },
    insert: (medicine,callback)=>{
        var sql="INSERT INTO `medicine`(`mname`, `mgenre`, `mprice`, `mstatus`) VALUES ('"+medicine.mname+"','"+medicine.mgenre+"','"+medicine.mprice+"','"+medicine.mstatus+"')";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
    getById: function(mid, callback){
		var sql = "select * from medicine where mid= '"+mid+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
    },
    update: function(medicine,callback){
        var sql="UPDATE `medicine` SET `mname`='"+medicine.mname+"',`mgenre`='"+medicine.mgenre+"',`mprice`='"+medicine.mprice+"',`mstatus`='"+medicine.mstatus+"' WHERE mid='"+medicine.mid+"'";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
    delete: function(mid, callback){
		var sql="DELETE FROM medicine WHERE mid='"+mid+"'";
		db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
        });
	},
	search: function(search, callback){
		var sql="select * from medicine where "+search.mSearchFilter+" like '%"+search.mSearchKey+"%'";
		db.getResults(sql, (results)=>{
			callback(results);
		});

	}

}