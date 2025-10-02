import  jwt  from 'jsonwebtoken';

const authMiddleware = async (req, res, next) =>{
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({success:false, message:'Not Authorized, login again'})
    }

    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

export default authMiddleware;