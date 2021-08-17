require('dotenv').config();

const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const { Schema } = mongoose;

const personSchema=new Schema({
name:{ type : String, required:true},
age:{type:Number},
favoriteFoods:{type:[String]},
});


let Person = mongoose.model('Person', personSchema);


var createAndSavePerson = ()=> {
 var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  janeFonda.save()
  .then(result=>{console.log(result);}) 
  .catch(err=>{console.log(err);});
};


const arrayOfPer = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken","paobhaji"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];



var createManyPeople = (arrayOfPer)=> {
  Person.create(arrayOfPer)
  .then(people=>{
    console.log(people);
    })
  .catch(
    err=>{
      console.log(err);
    }
  );
};



var findPeopleByName = (personName) =>{
  Person.find({"name":personName})
  .then(people=>{
    console.log(people);
    })
  .catch(
    err=>{
      console.log(err);
    }
  );

};

const findOneByFood = (food) => {
   Person.findOne({favoriteFoods: food })
   .then(person=>{
    console.log(person);
    })
  .catch(
    err=>{
      console.log(err);
    }
  );
};

const findPersonById = (personId) => {
 Person.findById({_id: personId })
  .then(personFound=>{
    console.log(personFound);
    })
  .catch(
    err=>{
      console.log(err);
    });
};


const findEditThenSave = (personId) => {
  const foodToAdd = 'hamburger';

  Person.findById(personId)
  .then(person=>{
    person.favoriteFoods.push(foodToAdd);
    return person;
  }) 
  .then(person=>person.save())
  .then(updatedPerson=>console.log(updatedPerson))
  .catch(
    err=>{
      console.log(err);
    });
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true})
  .then(updatedDoc=> console.log(updatedDoc))
  .catch(err=>console.log(err)
  );
};

const removeById = (personId) => {
 Person.findByIdAndRemove(personId)
    .then(removedPerson=>console.log(removedPerson))
     .catch(err=>console.log(err)
     );

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove})
  .then(response=>{console.log("Delete document");console.log(response);})
  .catch(err=>console.log(err)
  );
};


const queryChain = () => {
  
   const foodToSearch = "burrito";

  Person.find({ "favoriteFoods":foodToSearch})
      .sort({ name: 1 })
      .limit(2)
      .select({ age : 0 })
      .exec()
      .then(result=>{console.log("my result is");console.log(result);})
      .catch(err=>console.log(err));
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


