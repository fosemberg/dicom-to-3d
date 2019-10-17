import {DB_FULL_PATH} from "./config";
import {Status} from "./apiTypes";

const Datastore = require('nedb');

const db = new Datastore({
  filename: DB_FULL_PATH,
  autoload: true,
});

// db.insert(doc);

var doc = { hello: 'world'
 , n: 5
 , today: new Date()
 , nedbIsAwesome: true
 , notthere: null
 , notToBeSaved: undefined  // Will not be saved
 , fruits: [ 'apple', 'orange', 'pear' ]
 , infos: { name: 'nedb' }
};

// db.insert([{ a: 5 }, { a: 42 }], function (err, newDocs) {});

const build = {
  hash: 'sdlfj',
  dateStart: new Date(),
  dateEnd: new Date(),
  status: Status.success,
}

db.insert([build], function (err, newDocs) {
  console.log(newDocs[0]._id);
});

db.findOne({ _id: '02BWwftHKyolKrxH' }, (err, doc) => {
  console.log(doc);
})

// db.update({ planet: 'Jupiter' }, { planet: 'Pluton'}, {}, function (err, numReplaced) {});

db.find({}).exec((err, docs) => {
  console.log(JSON.stringify(docs));
})