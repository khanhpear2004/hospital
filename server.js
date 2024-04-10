const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://khanhpear:123@cluster0.rzo0p3f.mongodb.net/hospital?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true });

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

// const doctorSchema = {
//     name: String,
//     age: Number,
//     experienceYear: Number,
//     gender: String
// };

// const Doctor = mongoose.model("doctor", new mongoose.Schema(doctorSchema));

// const docs1 = new Doctor({
//     name: "Vinh",
//     age: 34,
//     experienceYear: 5,
//     gender: "male"
// })

// const docs2 = new Doctor({
//     name: "Thao",
//     age: 40,
//     experienceYear: 10,
//     gender: "female"
// })

// const docs3 = new Doctor({
//     name: "Hang",
//     age: 36,
//     experienceYear: 7,
//     gender: "female"
// })

console.log("hello");

const DoctorSchema = {
    name: String,
    experience: String,
    genre: String,
    degree: String,
    comment: String,
    gender: String,
    image: String
}

const Docs = mongoose.model("Doctor", new mongoose.Schema(DoctorSchema));

const doc1 = new Docs({
    name: "Nguyễn Xuân Lộc",
    experience: "10 năm làm việc tại bệnh viện",
    genre: "chuyên khám nội soi trực tràng",
    degree: "Có bằng giỏi trong việc chống lũ",
    comment: "Ủng hộ phong trào LGBT, chắc chắn không phải vì anh ấy Ga...",
    gender: "non-binary",
    image: "doctors-1.jpg"
});

const doc2 = new Docs({
    name: "Dương Thanh Tú",
    experience: "30 năm làm việc tại bệnh viện",
    genre: "chuyên viên khám bệnh ngoài da",
    degree: "Có bằng giỏi trong lĩnh vực phân biệt màu da",
    comment: "Bị mù màu kinh niên khi thế giới trong mắt anh ấy toàn là màu đen",
    gender: "alpha male",
    image: "doctors-2.jpg"
});

const doc3 = new Docs({
    name: "Lô Hoàng Bảo",
    experience: "20 năm làm việc tại bệnh viện",
    genre: "chuyên khám tim mạch, nhắm vào tim em",
    degree: "Có bằng giỏi trong việc hay khen người khác giỏi, trong khi anh ấy nấu xong hết mẹ rồi",
    comment: "Ủng hộ phong trào đua xe, racist",
    gender: "male",
    image: "doctors-3.jpg"
});

const a = [doc1, doc2, doc3];
Docs.insertMany(a);

const paitenceSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    condition: String,
    doctorReview: String
});

const paitence = mongoose.model("paitence", paitenceSchema);

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
app.use(express.static("assets"));
app.use(express.static("benh_nhan"));
app.use(express.static("forms"));
app.use(express.static("login_signup"));

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

app.get("/doctor", function(req, res){
    Docs.find({}, function(err, list){
        res.render("doctor", {list : list})
    });
})

 app.get("/profile/:DocID", function(req, res){
    let ID = (req.params.DocID);
    Docs.findOne({_id: ID}, function(err, doctor){
        res.render("profile", {doctor: doctor})
    })
    // Docs.find({}, function(err, DocsArray){
    //     res.render("profile", {doctor: doctor})
    // });
    //res.render("profile", {Info : });
 });

 app.post("/profile/:DocID", function(req, res){
    let ID = (req.params.DocID);
    Docs.findOne({_id: ID}, function(err, doctor){
        res.render("profile", {doctor: doctor})
    })
 })

 app.get("/index", function(req, res){
    res.render("profile");
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
    
    for(let i = 0; i < checkItem.length; i++){
        Doctor.findByIdAndRemove(checkItem[i], function(err){
            if(!err){
                console.log("successfilly deleted");
            }
        });
    }
});

app.get("/:Info", function(req, res){
    console.log(req.params.Info);
});


app.post("/info", function(req, res){

});

app.listen(5500, function(){
    console.log("server turn on");
});