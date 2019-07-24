const User= require("../models/user");


exports.userById= (req,res,next,id)=>{
    User.findById(id).exec((err, user)=>{
        if(err ||!user ){
            return res.status(400).json({
                error:"User not found"
            });
        }
   

    req.profile= user;
    next()
})
}


exports.read= (req,res)=>{
    req.profile.password=undefined
    return res.json(req.profile);
}
exports.update= (req,res)=>{
    User.findByIdAndUpdate(
        {_id : req.profile.id},
        {$set:req.body},
        {new: true}, //send to frontend the new updated record
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"You're not authorized to perform this action"
                })
            }
            user.profile.password=undefined
            return res.json(user);
        }
       
    )
}

