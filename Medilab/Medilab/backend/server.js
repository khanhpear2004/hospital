const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/hospital", { useNewUrlParser: true });

// const doctorSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     experienceYear: Number,
//     gender: String
// }); //create a new database like this format to the data from database 27017 from this server

// const doctor = mongoose.model("doctor", doctorSchema); //create a new collection name "doctors"

// const Docs = new doctor({
//     name: "Viet",
//     age: 29,
//     experienceYear: 5,
//     gender: "male"
// });



//Docs.save();

const doctorSchema = {
    name: String,
    age: Number,
    experienceYear: Number,
    gender: String
};

const Doctor = mongoose.model("doctor", new mongoose.Schema(doctorSchema));

const docs1 = new Doctor({
    name: "Vinh",
    age: 34,
    experienceYear: 5,
    gender: "male"
})

const docs2 = new Doctor({
    name: "Thao",
    age: 40,
    experienceYear: 10,
    gender: "female"
})

const docs3 = new Doctor({
    name: "Hang",
    age: 36,
    experienceYear: 7,
    gender: "female"
})

//const DocDefault = [docs1, docs2, docs3];

//Doctor.insertMany(DocDefault);

const paitenceSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    condition: String,
    doctorReview: String
});

const paitence = mongoose.model("paitence", paitenceSchema);

const fruitSchema = new mongoose.Schema({
    name: String
})

const Fruit = mongoose.model("fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple"
})

//fruit.save();

const guest = new paitence({
    name: "Loc",
    age: 20,
    gender: "Non-Binary",
    condition: "Fever and Gay",
    doctorReview: "he has some issues with his ex"
})

//guest.save(); //save the object guest to the collection implied in model schema (use it has a new paitence)

// doctor.find(function(err, doctor){ //find function need a parameter as a name of the collection to read all the objects inside it
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(doctor);
//     }
// });

// paitence.find(function(err, paitence){
//     if(err) console.log(err);
//     else console.log(paitence);
// })


// paitence.deleteOne({name: "Loc"}, function(err){
//     if(err) console.log(err);
//     else console.log("success\n");
// });

const app = express();

let items = [];
let paitences = [];
let doctors = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("css"));

function DayOfWeek(){
    var today = new Date();
    //var currentday = today.getDate();

    if(today.getDay() === 1){
        day = "Monday";
    }
    else if(today.getDay() === 2){
        day = "Tuesday";
    }
    else if(today.getDay() === 3){
        day = "Wednesday";
    }
    else if(today.getDay() === 4){
        day = "Thursday";
    }
    else if(today.getDay() === 5){
        day = "Friday";
    }
    else if(today.getDay() === 6){
        day = "Saturday";
    }
    else if(today.getDay() === 0){
        day = "Sunday";
    }
}

app.get("/", function(req, res){

    day = "";
    DayOfWeek();

    res.render("list", {day: day});

    //res.send("hello");
});

app.get("/data", function(req, res){

    Doctor.find({}, function(err, foundDoctor){
        res.render("data", {DOC : foundDoctor});
        console.log();
    });
});

app.post("/", function(req, res){

    let name = req.body.newName;
    let age = req.body.newAge;
    let exp = req.body.newExp;
    let gender = req.body.newGen;

    const newDoc = new Doctor({
        name: name,
        age: age,
        experienceYear: exp,
        gender: gender
    })

    Doctor.insertMany(newDoc);

    //newDoc.save();
    //items.push(item);
    res.redirect("/");
});

app.post("/data", function(req, res){
    const checkItem = req.body.checkbox;
    console.log(req.body.checkbox);
    
    Doctor.findByIdAndRemove(checkItem, function(err){
        if(!err){
            console.log("successfilly deleted");
        }
    });
});

app.listen(5500, function(){
    console.log("server turn on");
});