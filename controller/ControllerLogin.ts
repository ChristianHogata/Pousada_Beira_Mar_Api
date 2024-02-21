import { Request, Response, NextFunction } from 'express';
import modelUser from '../model/model.Users';
import * as bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import ControllerToken from './ControllerToken';

declare module 'express-session' {
    export interface SessionData {
      user: { [key: string]: any };
    }
}

const ControllerLogin = (router: any)=>{
    //const router = express.Router();

    router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        // Procure um usuário com o login fornecido
        const user = await modelUser.findOne({ email: req.body.login });

        if (!user) {
        // Se nenhum usuário for encontrado, retorne um erro
        return res.status(400).send('Invalid login or password');
        }
    
        // Se um usuário for encontrado, compare a senha fornecida com a senha hash armazenada
        
        if (user && user.senha) {
            bcrypt.compare(req.body.password, user.senha, (err, isMatch)=> {
                if (err) {
                    return res.status(500).send('An error occurred');
                }
                
                if (!isMatch) {
                    // Se as senhas não corresponderem, retorne um erro
                    return res.status(400).send('Invalid login or password');
                }
                                    
                try{
                    const secret = process.env.SECRET || 'sadasflp-ogvoi09ia-0kv-lvo32m,=02i90k2f0-=fl0vk0-';

                    const token = Jwt.sign({
                            id: req.body.login,
                        },secret 
                    );
                        
                    return res.status(200).json({msg: 'success', token, user: user._id});
                }
                catch{
                    return res.status(500).send('An error occurred');
                }
 
            });
        } 
        else {
 
        return res.status(400).send('Invalid login or password');
        }  
    });
    
    return router;
}

export default ControllerLogin;