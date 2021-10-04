const express = require('express');
// client jab server ko data bhejta hai - POST REQ
// client jab data mngva rha server se to - GET REQ
const app = express();
app.use(express.json());  //middleware function
app.use(express.static('public'));

app.listen('5000', function(){
    console.log('server listening on port 5000');
});

let user = [];

// USER
const authRouter = express.Router();
app.use('/auth', authRouter);
authRouter.route('/signup')
.post(signupUser);
authRouter.route('/forgetPassword')
.get(getforgetPassword)
.post(forgetUser)


const userRouter = express.Router();
app.use('/user', userRouter);
userRouter.route('/')
    .get(getUser)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser);
// userRouter.route('/:id')
// .get(getUserById);

// GET
app.get('/', (req, res) => {
    res.send("Home Page");
});

// REDIRECTS
app.get('/user-all', (req, res) => {
    res.redirect('/user');
})

app.use((req,res) => {
    res.sendFile('public/404.html', {root:__dirname})
}) //hamesha last me lagana chaye!

//===================================FUNCTIONS==================================
function signupUser(req,res){
    let{email,name,password} = req.body;  //destructuring
    user.push({ email,name,password });
    console.log('user',req.body);
    res.json({
        message:'user signedUp',
        user: req.body
    });
}
function getforgetPassword(req, res){
    res.sendFile('./public/forgetPassword.html', {root:__dirname});
}
function forgetUser(req, res){
    let email = req.body;
    console.log("email", email);
    res.json(email);
}
//GET
// app.get('/user', getUser);
function getUser(req, res) {
    res.json(user);
}

// POST
// app.post('/user', createUser)
function createUser (req, res){
    user = req.body;
    console.log(user);
    res.send('data has been added successfully!!!')
}

// UPDATE
// app.patch('/user', updateUser);
function updateUser (req, res){
    let obj = req.body;
    for(let key in obj){
        user[key] = obj[key];
    }
    res.json(user);
}

// DELETE
// app.delete('/user', deleteUser);
function deleteUser(req, res){
    user={};
    res.json(user);
}

// PARAM ROUTE
// app.get('/user/:id', getUserById);
function getUserById(req, res){
    console.log(req.params);
    res.json(req.params);
}