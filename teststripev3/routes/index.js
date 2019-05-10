var express = require('express');
var router = express.Router();
const stripe = require("stripe")("sk_test_3bVVHfFdWtl9QC4z1IBoA0FS0090DYHz3C");


const Users = require("../model/user");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/getuser', async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error, "err in api");
    return res.json(500).json(error);
  }
});


router.post('/adduser', async (req, res) => {
  try {
    const body = req.body ? req.body : '';
let checkUser = await Users.findOne({email : body.email});
if(checkUser){
  return res.status(200).json(checkUser);
} else {
    let id = await stripe.customers.create({
      email: body.email,
      name: body.name,
    });
      body.stripeCusId = id.id;
    let user = await Users.create(body);
    console.log(user,"user");
   return res.status(200).json(user);  
  }
  } catch (error) {
    console.log(error, "err in api");
    return res.json(500).json(error);
  }
});
module.exports = router;