//utils.js
const jwtimport = require('jsonwebtoken')
function generateToken(data) {

    return jwt.sign({
        data: data}, process.env.JWT_SECRET, {expiresIn: '1h'})
    }

function requireAuthentication(req,res,next){
    const token = req.headers.authentication
    if(!token){
        res.status(401).json({ error: 'No token provided'})
    return
    }
    try{
        const accessToken = token.split(' ')[1]
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.user = decoded.data
        next()
    } catch (err) {
        res.status(401).json({error: 'Invalid token'})
    }
}

module.exports = {generateToken, requireAuthentication};
