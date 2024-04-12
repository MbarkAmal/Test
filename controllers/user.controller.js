const { response } = require('express');
const User =require ('../models/user.models');
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')

exports.sigup =(req,res) => {

    const data = {
        user_name :req.body.user_name,
        email : req.body.email,
        phone : req.body.phone ,
        password : bcrypt.hashSync( req.body.password, 10),
    }

    const _user = new User(data) ;

    _user.save().then(
        (createUser) => {
            res.status(200).json({message : "user added successfullr..."})

        }

    ).catch( 
        (err)=> {
            res.status(400).json({message: "probleme while add the user !"})
            
        }
    )


}



exports.signin =  async (req , res ) => {

    const { email , password } = req.body;

    const user = await User.findOne ( { email : email})

    if ( !user ){
        return res.status(400).json({ message : "email not found ... "})
    }

    bcrypt.compare( password , user.password ).then(
        (isMatch) => {
            if ( isMatch == false ){ //pasw false
                return res.status(400).json({ message : "password invalid ... "})

            }else{ //psw true

                // generate token 
                const token = jwt.sign(
                     { data : { id : user._id , user_name : user.user_name  } },
                     process.env.CLE ,
                     { expiresIn : '1h'}
                     )
                     return res.status(200).json(
                        {
                         message : "success ... " ,
                         token : token ,
                         user : user 
                        })


            }
        }
    )
}
