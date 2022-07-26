var express = require('express');
const db = require("../database_init.js")
const Db_ = require("../controllers/database_controller.js")
var router = express.Router();
const dbase = new Db_();

/* GET home page. */
router.get('/', async (req, res, next) => {
  var messages = await dbase.read_all_message_table();
  console.log(messages,"==========>>");
  res.status(200).json(messages)
});

router.post('/login', async (req, res, next) => {

  var data = req.body;
  await dbase.read_user_table(data)
  .then(async(user) => {
    // console.log(user,"=========================>>>>")
    if(user){
      message = await dbase.read_all_message_table(user[0].id)

    }
    // console.log(user,"==========>>");
    res.status(200).json({"message":message,"user":user})
  })
  .catch(err => console.log("I CATCH IT!", err))
  
});



router.post('/add/message', function(req, res, next) {

//  console.log(create,"===== ==== ==== ==== === ==>>>>>");
  var message = dbase.insert_message_table({
    senderid: req.body.senderid,
    receiverid: req.body.receiverid,
    subject: req.body.subject,
    content: req.body.content,
  });
  res.render('index', { title: message });
});

router.post('/add/user', function(req, res, next) {
    const name = req.body.name.split(" ").join("").toLowerCase();
    const email = `${name}@mailerapp.com`
//  console.log(create,"===== ==== ==== ==== === ==>>>>>");
    dbase.insert_user_table({
    name: req.body.name,
    avatar: req.body.avatar,
    email
  });
    res.status(200).json({email})
});




router.get('/createall', function(req, res, next) {

  var messages = dbase.create_message_table();
  var user = dbase.create_user_table();

  res.status(201).json("Database Created!");

});



router.post('/update/message', function(req, res, next) {
//  create = dbase.create_table("messages");
//  console.log(create,"===== ==== ==== ==== === ==>>>>>");
  var update = req.body
  dbase.update_message_table(update);
  res.status(200).json("updated")
});

module.exports = router;
