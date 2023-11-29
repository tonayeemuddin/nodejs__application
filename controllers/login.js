const express       = require('express');
const {body, validationResult} 		= require('express-validator');
const router       = express.Router();
const userModel		= require.main.require('./models/userModel');

router.get('/',(req, res)=>{
    res.render('login/index');
});


router.post('/', [
    // Email nameField & empty,email validation
    body('uemail')
    .isEmail()
    .withMessage('Email is required'),
    
    // password nameField & empty validation
    body('upassword')
    .notEmpty()
    .withMessage('Password is required')

  ], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('login/index', {err:errors.array()});
    }else{
      var user={
        uemail: req.body.uemail, 
        upassword: req.body.upassword
      };
      userModel.validate(user,(status)=>{
        if(status){
          userModel.getUser(user, (results)=>{
            if(results[0].urole=='admin' && results[0].ustatus=='valid'){
              req.session.user=results[0];
              res.redirect('/user/vuser/adminHome');
            }
            else if(results[0].urole=='customer' && results[0].ustatus=='valid'){
              req.session.user=results[0];
              res.redirect('/medicine/vuser/customerHome');
            }
            else{
              res.send("You don't have permission to login");
            }
          });
          
        }else{
          res.redirect('/login');
        }
      });

    }
  });



module.exports = router;