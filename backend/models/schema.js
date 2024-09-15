const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const {v4: uuidv4} = require("uuid");

const Admin_Schema= new mongoose.Schema({
    Index:{
        type:String,
        unique:true,
        required:true,
        default:uuidv4
    },
    username:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        unique:false
    }
})
const Admin=mongoose.model('Admin',Admin_Schema);
const Permission_Schema=new mongoose.Schema({
    module:String,
    view:Boolean,
    edit:Boolean,
    delete:Boolean
})
const Roles_Schema=new mongoose.Schema({
    roleName: String,
    permission:[Permission_Schema]
})
const Organisation_Details_Schema= new mongoose.Schema({
    Index:{
        type:String,
        unique:true,
        required:true,
        default:uuidv4
    },
    Organisation_Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        require:true
    },
    Allowed_User:{
        type:Number,
        required:true
    },
    Allowed_Schools:{
        type:Number,
        required:true
    },
    Roles:[Roles_Schema],
    Serial_Key:{
        type:String,
        unique:true,
    },
    Organisation_Logo:{
        type:String,
        required:false
    },
    Organisation_Address:{
        type:String,
        require:true
    },
    Org_reg_address:{
        type:String,
        required:true
    },
    Country:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    Pin_Code:{
        type:String,
        required:true
    },
    Board:{
        type:String,
        required:true
    },
    Affiliation_no:{
        type:String,
        require:true
    }
})
const Organisation_Details=mongoose.model('Organisation_Details',Organisation_Details_Schema);

const User_Schema = new mongoose.Schema({
    Index:{
        type:String,
        unique:true,
        required:true,
        default:uuidv4
    },
    u_id:{
        type:Number,
        unique:true
    },
    serial_Key:{
        type:String,
        unique:false
    },
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:false
    },
    fullname:{
        type:String,
        unique:false
    },
    gender:{
        type:String,
        unique:false
    },
    role:{
        type:String,
        unique:false
    },
    password:{
        type:String,
        unique:false
    }
})
User_Schema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt);
    next();
});
const User=mongoose.model('User',User_Schema)
module.exports={ User, Admin, Organisation_Details};