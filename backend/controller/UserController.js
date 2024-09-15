const { User, Admin, Organisation_Details } = require("../models/schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {v4: uuidv4} = require("uuid");

class UserController {
    static secretKey = "secret_key";
    static admin_reg= async(req,res)=>{
      const {username, password}=req.body;
      let admin_user= await Admin.findOne({username});
      if (admin_user) return res.status(400).send("Username already found");
      try{
        let hashedPassword= await bcrypt.hash(password,10);
        let data= new Admin({
          username: username,
          password:hashedPassword
        })
        await data.save();
        res.json({success:true});
      }catch(exception){
        res.status(500).send("Internal Server Error")
      }
    }
    static admin_login= async(req, res)=>{
      const {username, password}= req.body;
      let user= await Admin.findOne({username});
      if(!user) return res.status(400).json({message:"Incorrect Username"});

      let pass= await bcrypt.compare(password, user.password);
      if (!pass) return res.status(400).json({message:"Incorrect Password"})

      try{
        const data ={username:Admin.username};
        const token= jwt.sign(data, UserController.secretKey,{expiresIn:'1h'})
        res.json({success:true, token})
      }catch(exception){
        res.status(500).json({message:"Internal Server Error"})
      }
    }
    static serial_Key = async (req, res) => {
        try {
          let serial = await Organisation_Details.findOne({ serial_Key: req.body.serial_Key });
          if (!serial) {
            let data = new Organisation_Details({
              serial_Key: req.body.serial_Key,
              Index: uuidv4(),
            });
            let datasave = await data.save();
            if (datasave) {
              res.json({ success: true, message: "New Serial Key Saved!" });
            } else {
              res.json({ success: false, message: "Serial key Not Saved!" });
            }
          } else {
            res.status(404).json("Serial Key already exist");
          }
        } catch (error) {
          res.status(500).json({ message: "Internal Server Error" });
        }
      };
    static create_org= async(req,res)=>{
      const {organisation_name, email, phone, allowed_user, allowed_schools,roles,organisation_address,org_reg_address,country,state,city,pin_code,board,affiliation_no}=req.body;     
      const digit= Math.floor(100000+Math.random()*900000).toString();
      const letter= Array(3).fill(0).map(()=>{return String.fromCharCode(65+Math.floor(Math.random()*26));
      }).join('');
      const serial_key= digit+letter;
      let data= new Organisation_Details ({
        Index:uuidv4(),
        Organisation_Name:organisation_name,
        Email:email,
        Phone:phone,
        Allowed_User:allowed_user,
        Allowed_Schools:allowed_schools,
        Serial_Key:serial_key,
        Roles:roles.map(permission =>({
          module:permission.module,
          view:permission.view,
          edit:permission.edit,
          deletes:permission.delete
        })),
        Organisation_Address:organisation_address,
        Org_reg_address:org_reg_address,
        Country:country,
        State:state,
        City:city,
        Pin_Code:pin_code,
        Board:board,
        Affiliation_no:affiliation_no
      })
      await data.save();
      res.json({success: true, message:"Organisation saved successfully! Your serial_key is :", serial_key})
    // }catch(exception){
    //   res.status(500).json({message:"Internal Server Error"});
    // }
    }
    static org_detail= async(req, res)=>{
      const data=await Organisation_Details.find({})
      res.status(200).json(data);
    }
    static login = async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send("Invalid Username");
        console.log(password)
        console.group(user.password)
        const pass = await bcrypt.compare(password, user.password)
        if (!pass) return res.status(400).send("Invalid Password");
    
        const data = { id: user.id, username: user.username, role: user.role };
        const token = jwt.sign(data, UserController.secretKey, { expiresIn: '1h' }); 
    
        res.json({ success: true, token });
    };
    
    
    static register = async (req, res) => {
  
          let reg = await Organisation_Details.findOne({ serial_Key: req.body.serial_Key });
          if (!reg) {
            res.status(404).json("Serial Key Not Found");
          } else {
            let usernames = await User.findOne({ username: req.body.username });
            if (!usernames) {
              let serial = await User.find({ serial_Key: req.body.serial_Key });
              let final_uid = 1;
              if (serial.length > 0) {
                let last_uid = Math.max(...serial.map((r) => r.u_id));
                final_uid = last_uid + 1;
              }
              let hashedPassword = await bcrypt.hash(req.body.password, 10);
              let data = new User({
                Index: uuidv4(),
                serial_Key: req.body.serial_Key,
                u_id: final_uid,
                username: req.body.username,
                email: req.body.email,
                fullname: req.body.fullname,
                gender: req.body.gender,
                role: req.body.role,
                password: hashedPassword,
                
              });
              console.log(data);
              await data.save();
              res.json({ success: true });
            } else {
              res.status(500).json({ message: "username already found" });
            }
          }

      };
    
    static prevention = (req, res, next) => {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send("Access Denied. No token provided.");
        }

        const token = authHeader.replace('Bearer ', '').trim();
        if (!token) {
            return res.status(401).send("Access Denied. Invalid token.");
        }

        try {
            const decoded = jwt.verify(token, UserController.secretKey); 
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).send("Invalid Token");
        }
    };

    static authMiddleware = (req, res, next) => {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send("Access Denied. No token provided.");
        }

        const token = authHeader.replace('Bearer ', '').trim();
        if (!token) {
            return res.status(401).send("Access Denied. Invalid token.");
        }

        try {
            const decoded = jwt.verify(token, UserController.secretKey); // Use the class-level secretKey
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).send("Invalid Token");
        }
    };

    static home = async (req, res) => {
        console.log(req.user);
        res.json({ message: "Token found" });
    };

    static dashboard= async(req, res)=>{
      console.log(req.user);
      res.json({message:"Token found"});
    }
}

module.exports = UserController;
