const express       = require('express');
const session = require('express-session');
const {body, validationResult} 		= require('express-validator');
const router       = express.Router();
const userModel		= require.main.require('./models/userModel');

router.get('/',(req, res)=>{
    res.render('vuser/registration',{urole: 'customer'});
});
router.get('/admin',(req, res)=>{
    res.render('vuser/registration',{urole: req.session.user.urole});
});
router.post('/', [
    //
    body('uname')
    .notEmpty()
    .withMessage('uname is required'),
    
    //
    body('uphone')
    .notEmpty()
    .withMessage('uphone is required'),
    
    // Email nameField & empty,email validation
    body('uemail')
    .isEmail()
    .withMessage('uemail is required'),

    // 
    body('urole')
    .notEmpty()
    .withMessage('urole is required'),
    
    
    // password nameField & empty validation
    body('upassword')
    .notEmpty()
    .withMessage('upassword is required')

  ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send(errors.array());
    }else{
        user={
            uname: req.body.uname,
            uphone: req.body.uphone,
            uemail: req.body.uemail,
            urole: req.body.urole,
            ustatus: "invalid",
            upassword: req.body.upassword
        };

        userModel.insert(user,(status)=>{
            if(status){
                res.send("Registration Successful!");                               
            }else{
                res.send("Registration Failed!");                
            }
            
        });

    }




  });



  router.post('/admin', [
    //
    body('uname')
    .notEmpty()
    .withMessage('uname is required'),
    
    //
    body('uphone')
    .notEmpty()
    .withMessage('uphone is required'),
    
    // Email nameField & empty,email validation
    body('uemail')
    .isEmail()
    .withMessage('uemail is required'),

    // 
    body('urole')
    .notEmpty()
    .withMessage('urole is required'),
    
    
    // password nameField & empty validation
    body('upassword')
    .notEmpty()
    .withMessage('upassword is required')

  ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send(errors.array());
    }else{
        user={
            uname: req.body.uname,
            uphone: req.body.uphone,
            uemail: req.body.uemail,
            urole: req.body.urole,
            ustatus: "invalid",
            upassword: req.body.upassword
        };

        userModel.insert(user,(status)=>{
            if(status){
                res.send("Registration Successful!");                               
            }else{
                res.send("Registration Failed!");                
            }
            
        });

    }




  });

// res.render('vuser/registration');


module.exports = router;