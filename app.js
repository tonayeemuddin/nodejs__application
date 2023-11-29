//declaration
const express 						= require('express');	
const bodyParser 					= require('body-parser');
const exSession 					= require('express-session');
const cookieParser 					= require('cookie-parser');
const {body, validationResult} 		= require('express-validator');

const login							= require('./controllers/login');
const logout						= require('./controllers/logout');
const user							= require('./controllers/user');
const medicine						= require('./controllers/medicine');
const order							= require('./controllers/order');
const registration					= require('./controllers/registration');

const app							= express();
const port							= 3000;

//configuration
app.set('view engine', 'ejs');


//middleware
app.use('/assets', express.static('assets'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));


app.use('/', login);
app.use('/login', login);
app.use('/logout', logout);
app.use('/user', user);
app.use('/medicine', medicine);
app.use('/order', order);
app.use('/registration', registration);


//router
// app.get('/', (req, res)=>{
// 	res.render('a');
// });

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});