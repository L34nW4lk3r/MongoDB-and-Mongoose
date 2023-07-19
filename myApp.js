require('dotenv').config();

const dotenv = require('dotenv');
dotenv.config({path:'sample.env'});

let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let peopleSchema = new mongoose.Schema({
  name : {type: String, require: true},
  age : Number,
  favoriteFoods : [String]
})

let Person = mongoose.model('Person', peopleSchema);

var createAndSavePerson = function(done) {

  let Thomas = new Person({ name : 'Thomas', age : 31, favoriteFoods: ['hamburger']})

  Thomas.save((error, data) => {
    if(error){
      console.log(error)
    }else{
      done(null, data)
    }
  })
};

//const createAndSavePerson = (done) => {
//  done(null /*, data*/);
//};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
  
};

const findPeopleByName = function (personName, done) {
  Person.find({name: personName}, (error, peopleFound) => {
  if (error) return console.log(error);
    done(null, peopleFound);
  });
  
};

const findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function(error, individualFoodLover) {
    if (error) return console.log(error);
    done(null, individualFoodLover);
  })
  
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(error, individual) {
    if (error) return console.log(error);
  done(null, individual);  
  });
  
};

var findEditThenSave = (personId, done) => {
  //var foodToAdd = "hamburger";
  Person.findById(personId, (error, person) => {
    if (error) return console.log(error);
    person.favoriteFoods.push("hamburger");
    person.save((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
    
  });
  
};

const findAndUpdate = (personName, done) => {
let query = {name: personName};
let update = {age: 20};
let option = {new: true};

Person.findOneAndUpdate(query, update, option, (error, individual) => {
	if (error) return console.log(error);
	done(null, individual);
});
};

const removeById = (personId, done) => {
Person.findByIdAndRemove(personId, (error, removedPerson) => {
	if (error) return console.log(error);
	done(null, removedPerson);
});
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
Person.remove({name: nameToRemove}, (error, removalInfo) => {
	if (error) return console.log(error);
	done(null, removalInfo);
});
};

var queryChain = (done) => {
let query = {favoriteFoods: "burrito"};
Person.find(query)
	.sort({name: 'asc'})
	.limit(2)
	.select({age: 0})
	.exec((error, searchResult) => {
	console.log(searchResult);
	done(null, searchResult);
});
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
