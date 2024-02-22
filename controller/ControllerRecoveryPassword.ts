import { Request, Response, NextFunction } from 'express';
import modelUsers from '../model/model.Users';
import ControllerToken from './ControllerToken';
import crypto from 'crypto';
import SendEmail from './ControllerEmail';

const ControllerRecoveryPassword = (router: any)=>{

    router.post('/RecoveryPassword', async (req: Request, res: Response, next: NextFunction) => {
        try {

            const user = await modelUsers.findOne({ email: req.body.login });
            const email = user?.email;
            let token: string = '';
            let currentDate = new Date();
            

            if (!user) {
                return res.status(400).send('Invalid login or password');
            }       

            // Verifica se a data de expiração do token já passou
            if(currentDate.getTime() > user.resetPasswordExpires.getTime()) {
                token = crypto.randomBytes(20).toString('hex');
                
                user.resetPasswordToken = token;
                user.resetPasswordExpires = new Date(Date.now() + 3600000); 

                try {
                    await user.save();
                } 
                catch (error) {
                    console.error('Erro ao salvar o usuário:', error);
                }
            } else {
                token = user.resetPasswordToken;
            }       


            const link = `http://localhost:8082/reset_password?token=${token}`;

            const MailOptions = {
                from: 'PousadaBeiraMar19022024@outlook.com',
                to: email,
                subject: 'Solicitação de redefinição de senha',
                text: `Sua solicitação de redefinição de senha foi recebida. Por favor, clique no link a seguir para redefinir sua senha: ${link}`   
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

export default ControllerRecoveryPassword;

