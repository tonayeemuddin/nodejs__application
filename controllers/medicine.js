const express       = require('express');
const session = require('express-session');
const {body, validationResult} 		= require('express-validator');
const router       = express.Router();
const medicineModel		= require.main.require('./models/medicineModel');
const customerCart		= require.main.require('./models/customerCart');

router.get('*',  (req, res, next)=>{
	if(req.session.user == undefined){
		res.redirect('/login');
	}else{
		next();
	}
});
router.get('/vmedicine/adminMedicine',  (req, res)=>{
	medicineModel.getAllMedicine((results)=>{
		res.render('vmedicine/adminMedicine',{medicine:results, user:req.session.user});
	});	
});
router.get('/addMedicine',(req, res)=>{
    res.render('vMedicine/adminAddMedicine');
});
router.post('/addMedicine',(req, res)=>{
    var medicine= {
		mname:req.body.mname,
		mgenre:req.body.mgenre,
		mprice:req.body.mprice,
		mstatus:req.body.mstatus
	};
	medicineModel.insert(medicine,(status)=>{
		if(status){
			res.send("Added Successfully!");                               
		}else{
			res.send("Adding Failed!");                
		}
	});

});
router.get('/adminEditMedicine/:mid',(req, res)=>{
	medicineModel.getById(req.params.mid,(results)=>{		
		res.render('vmedicine/adminEditMedicine',{editMedicine: results[0]});
	});
});
router.post('/editMedicine/:mid',(req, res)=>{
	var medicine= {
		mid:req.params.mid,
		mname:req.body.mname,
		mgenre:req.body.mgenre,
		mprice:req.body.mprice,
		mstatus:req.body.mstatus
	};
	medicineModel.update(medicine,(status)=>{
		if(status){
			res.send("Updated Successfully!");                               
		}else{
			res.send("Update Failed!");                
		}
	});
});
router.get('/adminDeletemedicine/:mid',(req, res)=>{
	medicineModel.delete(req.params.mid,(status)=>{		
		if(status){
			res.send("Deleted Successfully!");                               
		}else{
			res.send("Deletation Failed!");                
		}
	});
});
router.get('/vuser/customerHome',  (req, res)=>{
	medicineModel.getAllMedicine((results)=>{
		res.render('vuser/customerHome',{medicine:results, user:req.session.user, cartData: req.session.cart});
	});	
});
router.get('/add-to-cart/:mid',  (req, res)=>{
	// 
	var medicineId= req.params.mid;
    medicineModel.getById(medicineId,(results)=>{
        if(typeof req.session.cart=='undefined'){req.session.cart=[];}
        
        var oldCart= req.session.cart;
        customerCart.add(results[0], oldCart, (results)=>{
			req.session.cart=results;
			res.redirect('/medicine/vuser/customerHome');
			
        });        
    });
	// 
});
router.get('/addByOne/:mid', (req, res)=>{
    var medicineId= req.params.mid;
    medicineModel.getById(medicineId,(results)=>{
        
        var oldCart= req.session.cart;
        customerCart.addByOne(results[0], oldCart, (results)=>{
            req.session.cart=results;
            res.redirect('/medicine/vuser/customerHome');
        });
        
        
    });
});
router.get('/reduceByOne/:mid', (req, res)=>{
    var medicineId= req.params.mid;
    medicineModel.getById(medicineId,(results)=>{
        
        var oldCart= req.session.cart;
        customerCart.reduceByOne(results[0], oldCart, (results)=>{
            req.session.cart=results;
            res.redirect('/medicine/vuser/customerHome');
        });
        
        
    });
});
router.get('/customer/search', (req, res)=>{
	var search={	
		mSearchKey:req.query.mSearchKey,
		mSearchFilter:req.query.mSearchFilter,
	};
	medicineModel.search(search,(results)=>{
		res.json({medicine: results});
		// console.log(results);
	});
});


module.exports = router;