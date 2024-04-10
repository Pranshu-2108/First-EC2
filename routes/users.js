var express = require('express');
var router = express.Router();

const users = [
  {
    "_id": "523eb678-5050-414d-867d-e979381fbd58",
    "age": 37,
    "name": "Benton Gregory",
    "gender": "male",
    "company": "ZOID",
    "email": "bentongregory@zoid.com",
    "phone": "+1 (835) 557-3184"
  },
  {
    "_id": "0cc401f6-e824-426c-8cef-e034738890d4",
    "age": 32,
    "name": "Mclaughlin Hawkins",
    "gender": "male",
    "company": "EXODOC",
    "email": "mclaughlinhawkins@exodoc.com",
    "phone": "+1 (945) 548-2042"
  },
  {
    "_id": "7dceeb93-bf15-4937-bb9f-f531ec2c5694",
    "age": 37,
    "name": "Wooten Ware",
    "gender": "male",
    "company": "HANDSHAKE",
    "email": "wootenware@handshake.com",
    "phone": "+1 (878) 434-3271"
  },
  {
    "_id": "d8df0204-5210-45e0-b96b-5966bed444ef",
    "age": 23,
    "name": "Romero Herman",
    "gender": "male",
    "company": "APPLIDECK",
    "email": "romeroherman@applideck.com",
    "phone": "+1 (866) 477-3784"
  },
  {
    "_id": "6ec5ec34-dc7f-4a24-ad12-b9f64b717607",
    "age": 20,
    "name": "Tamra Wade",
    "gender": "female",
    "company": "ZOMBOID",
    "email": "tamrawade@zomboid.com",
    "phone": "+1 (844) 594-3395"
  },
  {
    "_id": "33171f68-fad9-40d4-a1ed-7ab5f685c937",
    "age": 26,
    "name": "Benson Welch",
    "gender": "male",
    "company": "EXTRO",
    "email": "bensonwelch@extro.com",
    "phone": "+1 (822) 571-2755"
  },
  {
    "_id": "0ce57f63-86f6-4f85-a0fd-01fcde2a2ef3",
    "age": 36,
    "name": "Valarie Stevens",
    "gender": "female",
    "company": "OVERFORK",
    "email": "valariestevens@overfork.com",
    "phone": "+1 (972) 485-2907"
  },
];

/* GET users listing. */
router.get('/', function(req, res, next) {

  const page = parseInt(req.query.page);
  const perPage = parseInt(req.query.perPage);

  const start = (page*perPage) - perPage;
  const end = page*perPage;
  res.send(users.slice(start, end));
});

router.get('/:page/:perPage', function(req, res, next) {

  const page = parseInt(req.params.page);
  const perPage = parseInt(req.params.perPage);

  const start = (page*perPage) - perPage;
  const end = page*perPage;
  res.send(users.slice(start, end));
});

router.post('/add', async function(req, res, next) {

    users.push(req.body);
    res.status(200).send(users);

});


module.exports = router;
