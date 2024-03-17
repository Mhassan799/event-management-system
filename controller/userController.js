const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('../middleware/jwt')

const userController = {
    async register(req,res){
        try {
            const {name, email,phone,password,confirmPassword} = req.body;
            if(!name){
                return res.status(400).send({
                    success:false,
                    message:`name is required`
                })
            }
            if(!email){
                return res.status(400).send({
                    success:false,
                    message:`email is required`
                })
            }
            if(!password){
                return res.status(400).send({
                    success:false,
                    message:`password is required`
                })
            }
            if(!confirmPassword){
                
                return res.status(400).send({
                    success:false,
                    message:'confirmPassword is required'
                })
            }
            if(!phone){
                return res.status(400).send({
                    success:false,
                    message:`phone is required`
                })
            }

            const checkExistingUser = await userModel.findOne({email})
            console.log('checkExistingUser:',checkExistingUser)
            if(checkExistingUser){
                return res.status(400).send({
                    success:false,
                    message:"this user already exist"
                })
            }
            // checkk password
             if (password !== confirmPassword){
                return res.status(400).send({
                    success:false,
                    message:"password does not match"
                })
             }

             const salt = await bcrypt.genSalt(10)
             const hashPasswd = await bcrypt.hash(password,salt)
            
             const newUser =new userModel({
                name,
                email,phone,
                password:hashPasswd,
                
            })
            await newUser.save()
            return res.status(201).send({
                success:true,
                message:"user registered succesfully "
            })
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success:false,
                message:"something went wrong while registering a user",
                error:error.message
            })
        }
    },


     // login user constroller
    async login(req,res){
        try {
            const {email, password} = req.body;
            const user = await userModel.findOne({email})
            console.log('user:',user)
            if(!user){
                return res.status(400).send({
                    success:false,
                    message:"this user does not exist "
                })
            }


            const isPassword = await bcrypt.compare(password, user.password);
            if(!isPassword){
                console.log(">>>>>.")
                return res.status(400).send({
                    success:false,
                    message:"wrong password"
                })
            }
            
                const token = jwt.sign({ userId: user._id, email: user.email })

        res.status(200).send({
            success:true,
            message:"user loggedin succesfully",
            user,
            token
        })
            
        } catch (error) {
            console.log(error)
            res.status(400).send({
                success:false,
                message:"something went wrong while login",
                error:error.message
            })
        }
    },
    async forgetPassword(req,res){
        try {
            const {email} = req.body;
            const user = await userModel.findOne({email})
            console.log('user;',user)
            if(!user || user.length ===0){
                return res.status(400).send({
                    success:false,
                    message:"this user does not exist"
                })
            }
            else{
                const Otp =  Math.floor(1000 + Math.random() * 9000);
                user.otp = Otp
                console.log(Otp)

                const token = jwt.sign({Otp:user.Otp})
                console.log('token:',token)
                await user.save();
                res.status(200).send({
                    success:true,
                    message:"otp sent succesfully",
                    token
                   })
            }
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success:false,
                message:"something went wrong",
                error:error.message
            })
        }
    },
    async resetPassword(req,res){
        try {
            const {email,Otp,newPassword}=req.body;

            const user = await userModel.findOne({email})
            console.log('user:',user)
            if(!user || user.length===0){
                return res.status(400).send({
                    success:false,
                    message:"no user found"
                })
                
            }

            if (Otp !== user.otp) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid OTP",
                });
                }


                user.password = newPassword;
            await user.save();
            res.status(200).send({
                success: true,
                message: " sucesfully updated",
            });
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success:false,
                message:"something went wrong",
                error:error.message
            }) 
        }
    },

    async getAllUsers(req,res){
        try {
            const users = await userModel.find()
            res.status(200).send({
                success:true,
                message:"user got succesfully",
                users
            })
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success:false,
                message:"something went wrong",
                error:error.message
            })    
        }
    },

    async getSingleUser(req,res){
        try {
            const userId = req.params.userId
            const user = await userModel.findOne({_id:userId})
            res.status(200).send({
                success:true,
                message:"user got succesfully",
                user
            })
            
        } catch (error) {
            console.log(error)
            res.status(401).send({
                success:false,
                message:"something went wrong",
                error:error.message
            }) 
        }
    }
}

module.exports = userController;