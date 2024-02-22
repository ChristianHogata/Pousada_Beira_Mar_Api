import { Request, Response, NextFunction } from 'express';
import modelUsers from '../model/model.Users';
import SendEmail from './ControllerEmail';
import * as bcrypt from 'bcrypt';

const ControllerResetPassword = (router: any)=>{

    router.post('/reset_password', async (req: Request, res: Response, next: NextFunction) => {
        try {

            const user = await modelUsers.findOne({ resetPasswordToken: req.body.token });
            const email = user?.email;
            const token = user?.resetPasswordToken;
   
            let currentDate = new Date();

            if (!user) {
                return res.status(400).send('Invalid login or password');
            }


            // Verifica se a data de expiração do token já passou
           
            if(currentDate.getTime() > user.resetPasswordExpires.getTime()) {
                
                bcrypt.hash(req.body.password, 10, async function(err, hash) {
                    // Se ocorrer um erro durante a criptografia, retorne um erro
                    if (err) {
            
                        return res.status(500).send('Erro ao criptografar a senha');
                    }
                    
                    try {
                        const updatedUser = await modelUsers.findOneAndUpdate(
                            { resetPasswordToken: token}, 
                            {$set: { 
                                resetPasswordToken: '',
                                resetPasswordExpires: null,
                                senha: hash 
                            }}, 
                            { new: true }
                        );
                    } 
                    catch (error) {
                        console.error('Erro ao redefinir senha:', error);
                    }
                });
            }

            const MailOptions = {
                from: 'PousadaBeiraMar19022024@outlook.com',
                to: email,
                subject: 'Senha alterada com sucesso!',
                text: `Sua senha foi redefinida com sucesso!`   
            }

            SendEmail({ mailOptions: MailOptions });


            res.sendStatus(200);

        } 
        catch (error) {
            res.sendStatus(500); 
        }
    });

    return router;
}

export default ControllerResetPassword;

