import {DB_FULL_PATH} from "./config";
import {Status} from "./apiTypes";

const Datastore = require('nedb');

const db = new Datastore({
  filename: DB_FULL_PATH,
  autoload: true,
});

// db.insert(doc);

// db.insert([{ a: 5 }, { a: 42 }], function (err, newDocs) {});

db.update({planet: 'Jupiter'}, {planet: 'Pluton'}, {}, function (err, numReplaced) {
})

const build = {
  hash: 'sdlfj',
  dateStart: new Date(),
  dateEnd: new Date(),
  status: Status.success,
};

const datas = [
  {planet: 'Mars', system: 'solar', inhabited: false},
  {planet: 'Earth', system: 'solar', inhabited: true},
  {planet: 'Jupiter', system: 'solar', inhabited: false},
  {planet: 'Omicron Persia 8', system: 'futurama', inhabited: true}
];
const datasWithId = [
  {_id: 'id1', planet: 'Mars', system: 'solar', inhabited: false},
  {_id: 'id2', planet: 'Earth', system: 'solar', inhabited: true},
  {_id: 'id3', planet: 'Jupiter', system: 'solar', inhabited: false},
  {_id: 'id4', planet: 'Omicron Persia 8', system: 'futurama', inhabited: true},
];

const datas2 = [
  {
    _id: 1,
    commitHash: '1111',
    // dateStart: new Date(),
    // dateEnd: new Date(),
    status: Status.building,
  },
  {
    _id: 2,
    commitHash: '2222',
    // dateStart: new Date(),
    // dateEnd: new Date(),
    status: Status.success,
  },
  {
    _id: 3,
    commitHash: '3333',
    // dateStart: new Date(),
    // dateEnd: new Date(),
    status: Status.fail,
  },
];

// db.insert([{_id: 'id6', fruits: ['apple']}]);



// db.insert(datas2);
db.update({_id: 1}, {$set: {commitHash: '7', status: Status.success}});

// db.update({ _id: 'id2' }, { planet: "fobos2274000" }, {upsert: true}, function () {
//   Now the fruits array is ['apple', 'orange', 'pear', 'banana']
// });

// db.update(
//   {planet: 'Jupiter'},
//   {planet: 'Pluton'}, {}
// );

// db.update({ system: 'solar' }, { $set: { system: 'solar system' } }, { multi: true }
// });

// {"planet":"Mars","system":"solar","inhabited":false,"_id":"IXz4BJS36SWwRbU1"}
// {"planet":"Earth","system":"solar","inhabited":true,"_id":"O7yhyyjyd6nY7vug"}
// {"planet":"Jupiter","system":"solar","inhabited":false,"_id":"NREqk9pJt8QEfHK6"}
// {"planet":"Omicron Persia 8","system":"futurama","inhabited":true,"_id":"A4u9qRt8B2vTAP4I"}


// db.insert([build], function (err, newDocs) {
//   console.log(newDocs[0]._id);
// });

db.findOne({ _id: 1 }, (err, doc) => {
  console.log(doc);
});

// db.update({ planet: 'Jupiter' }, { planet: 'Pluton'}, {}, function (err, numReplaced) {});

db.find({}).exec((err, docs) => {
  console.log(JSON.stringify(docs));
});