import * as bcrypt from 'bcrypt';
import ModelFactory from '../../model/Factory/ModelFactory';
import crypto from 'crypto';

class EncryptUtils { 

    static encrypt(word: string): Promise<string>{
        return new Promise((resolve, reject)=>{

            bcrypt.hash(word, 10, async function(err, hash){
                if(err){
                    reject('');
                }
                resolve(hash);
            });
        })      
    }

    static compare(password: string, password2: string): Promise<boolean>{
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, password2, (err, isMatch)=> {
                if(err) {
                    reject(err);
                } else {
                    resolve(isMatch);
                }
            });
        });
    }

    static CheckToken(check: boolean, token: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (!check) {
                reject(false);
            }
    
            const user = await ModelFactory.new().getModelUsers().UseModel().findOne({ token: token });
    
            if (!user) {
                reject(false);
            }
    
            resolve(true);
        });
    }
    

    static RandomToken(): Promise<string>{
        return new Promise((resolve, reject) =>{
            try {
                resolve(crypto.randomBytes(20).toString('hex'));    
            } 
            catch (error) {
                reject(error)
            }
        });
    }
    
}

export default EncryptUtils