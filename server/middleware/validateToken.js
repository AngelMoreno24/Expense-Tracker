import jwt from 'jsonwebtoken'


export const verifyToken = async (request, res, next ) => {

    try
    {

    let token;
    let authHeader = request.headers.Authorization || request.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }

            request.id = decoded.account.id
            //console.log(request.id);
            next();

        });

        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing");
        }
    }
    }catch(error){
        console.log(error);
    }
}