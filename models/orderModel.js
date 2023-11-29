const db    = require('./db');

module.exports={
    insert: (order,callback)=>{
        var sql="INSERT INTO `orders`(`uid`, `otime`, `opaymentmethod`, `ostatus`, `oamount`, `oaddress`) VALUES ('"+order.uid+"', NOW(), '"+order.opaymentmethod+"', '"+order.ostatus+"', '"+order.oamount+"', '"+order.oaddress+"')";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(uid, callback){
		var sql = "select * from orders where uid= '"+uid+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
    },
	getAllOrder: function(callback){
		var sql = "select * from orders";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	confirmOstatus: (oid,callback)=>{
        var sql="UPDATE `orders` SET `ostatus`= 'confirmed' WHERE oid='"+oid+"'";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	cancleOstatus: (oid,callback)=>{
        var sql="UPDATE `orders` SET `ostatus`= 'cancled' WHERE oid='"+oid+"'";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
   

}