const db    = require('./db');

module.exports={
    validate: (user, callback)=>{
        var sql="select * from user where uemail='"+user.uemail+"' and upassword='"+user.upassword+"'";
        db.getResults(sql, (results)=>{
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
        });
    },
    getUser: (user,callback)=>{
        var sql="select * from user where uemail='"+user.uemail+"' and upassword='"+user.upassword+"'";
        db.getResults(sql, (results)=>{
			callback(results);
        });
    },
    insert: (user,callback)=>{
        var sql="INSERT INTO `user`(`uname`, `uemail`, `urole`, `ustatus`, `upassword`, `uphone`) VALUES ('"+user.uname+"','"+user.uemail+"','"+user.urole+"','"+user.ustatus+"','"+user.upassword+"','"+user.uphone+"')";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
    getAllUser: (callback)=>{
        var sql="select * from user";
        db.getResults(sql, (results)=>{
			callback(results);
        });
    },
	getById: function(uid, callback){
		var sql = "select * from user where uid= '"+uid+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
    },
    update: function(user,callback){
        var sql="UPDATE `user` SET `uname`='"+user.uname+"',`uemail`='"+user.uemail+"',`urole`='"+user.urole+"',`ustatus`='"+user.ustatus+"',`upassword`='"+user.upassword+"',`uphone`='"+user.uphone+"' WHERE uid='"+user.uid+"'";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
    delete: function(uid, callback){
		var sql="DELETE FROM user WHERE uid='"+uid+"'";
		db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

}