const {Schema}=require("mongoose");
const Moongoose=require("mongoose");
Moongoose.Promise=global.Promise;
Moongoose.set('useCreateIndex',true);
const url="mongodb://localhost:27017/EmployeeSignup";
const collection={};

const employeeSchema=Schema({
staffId:{type:Number,required:true,unique:true},
firstName:{type:String,required:true},
lastName:{type:String,required:true},
password:{type:String,required:true,minLength:[7,"password should have atleast 7 characters"],maxLength:[15,"password should not exceed 15 characters"]},
},{collection:"EmployeeSignup"});

collection.getEmployeeCollection=()=>{
    return Moongoose.connect(url,{useNewUrlParser:true}).then((database)=>
    {return database.model('EmployeeSignup',employeeSchema)
}).catch(()=>{
    let err=new Error("Could not connect to employee Collection Database");
    err.status=500;
    throw err;

})
}

module.exports=collection;