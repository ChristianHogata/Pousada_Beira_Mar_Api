import { Request, Response, NextFunction } from 'express';
import modelUser from '../model/model.Users';
import * as bcrypt from 'bcrypt';
import SendEmail from './ControllerEmail';

const ControllerRegisterUser = (router: any)=>{
    
    router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
        // Verifique se já existe um usuário com este e-mail
        const existingUser = await modelUser.findOne({ email: req.body.email });
        const email = existingUser?.email;
    
        if (existingUser) {
        // Se um usuário existente for encontrado, retorne um erro
            return res.status(400).send('E-mail já está cadastrado');
        }

    
        // Criptografe a senha antes de salvar o usuário
        bcrypt.hash(req.body.senha, 10, async function(err, hash) {
        // Se ocorrer um erro durante a criptografia, retorne um erro
        if (err) {

            return res.status(500).send('Erro ao criptografar a senha');
        }
    
        // Se nenhum usuário existente for encontrado, crie uma nova instância do seu modelo com os dados do req.body
        const newUser = new modelUser({
            ...req.body,
            senha: hash,  // Substitua a senha em texto simples pela senha criptografada
        });
    
        try {
            // Salve a nova instância no banco de dados
            try {
                await newUser.save();
            } 
            catch (error) {
                console.error('Erro ao salvar o usuário:', error);
            }
    
            // Envie o status HTTP 200
            res.sendStatus(200);

            const MailOptions = {
                from: 'PousadaBeiraMar19022024@outlook.com',
                to: email,
                subject: 'Sua conta foi criada com sucesso!',
                text: 'Obrigado por se cadastrar em nosso site, esperamos vê-lo em breve!'    
            }

            SendEmail({ mailOptions: MailOptions });

        } 
        catch (error) {
            // Trate qualquer erro que possa ocorrer
            res.sendStatus(500); // Envie o status HTTP 500 se ocorrer um erro
        }
        });
    });

    return router;
} 

export default ControllerRegisterUser;

