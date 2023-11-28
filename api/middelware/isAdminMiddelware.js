exports.isLogin = async(req,res,next)=>{
    try {
        if(req.session.user_id && req.session.is_active == true){
        }else{
            res.redirect('/')
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}

exports.isLogout = async(req,res,next)=>{
    try {
        if(req.session.user_id && req.session.is_active == true){
            res.redirect('/dashboard')
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}