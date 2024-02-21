import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const ControllerToken = (req: Request, res: Response, next: NextFunction)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({msg: 'ACCESS DENIED'});
    }

    try{
        const secret = process.env.SECRET || 'sadasflp-ogvoi09ia-0kv-lvo32m,=02i90k2f0-=fl0vk0-';
       
        Jwt.verify(token, secret);

        next();
    }
    catch{
        return res.status(400).json({msg: 'INVALID TOKEN'});
    }
}

export default ControllerToken;