const express       = require('express');
const session = require('express-session');
const {body, validationResult} 		= require('express-validator');
const router       = express.Router();
const orderModel		= require.main.require('./models/orderModel');

router.get('*',  (req, res, next)=>{
	if(req.session.user == undefined){
		res.redirect('/login');
	}else{
		next();
	}
});
router.post('/addOrder',  (req, res)=>{
	var order={
		uid: req.session.user.uid.toString(),
		opaymentmethod: req.body.opaymentmethod,
		ostatus: 'pending',
		oamount: req.body.oamount,
		oaddress: req.body.oaddress,
	};
	orderModel.insert(order,(status)=>{
		if(status){
			req.session.cart=undefined;
			res.redirect('/medicine/vuser/customerHome');
		}else{
			res.send('Order Failed.');
		}
	});
});
router.get('/vorder/customerOrder',  (req, res)=>{
	orderModel.getById(req.session.user.uid.toString(), (results)=>{
		res.render('vorder/customerOrder',{ order: results, user:req.session.user, cartData: req.session.cart});
	});	
});
router.get('/vorder/adminOrder',  (req, res)=>{
	orderModel.getAllOrder((results)=>{
		res.render('vorder/adminOrder',{ order: results, user:req.session.user});
	});	
});
router.get('/adminConfirm/:oid',  (req, res)=>{
	orderModel.confirmOstatus(req.params.oid,(status)=>{
		if(status){
			res.redirect('/order/vorder/adminOrder');
		}else{
			res.send('Order status confirm Failed.');
		}
	});	
});
router.get('/adminCancle/:oid',  (req, res)=>{
	orderModel.cancleOstatus(req.params.oid,(status)=>{
		if(status){
			res.redirect('/order/vorder/adminOrder');
		}else{
			res.send('Order status cancle Failed.');
		}
	});	
});



module.exports = router;