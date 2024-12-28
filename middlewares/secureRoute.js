const jwt = require('jsonwebtoken')
const User = require('../modals/user.modal')

const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
           return res.status(401).json({ message: "Not Authorised" })
        }
        // const verified = jwt.verify(token, process.env.MY_SECRET)
        // if(!verified){
        //     return res.status(301).json({ message: "Not valid token " })
        // }
        // const user = await User.findById(verified.userId).select("-password")
        // if(!user){
        //     return res.status(401).json({message: "Not found user"})
        // }
        // req.user = user;
        // next();
    } catch (err) {
        console.log(err)
        res.status(501).json({ message: "Internal Server Error" })
    }
}

module.exports = secureRoute;