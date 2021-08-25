import jwt from 'jsonwebtoken';
import Login from '../models/usuarios'

async function checkToken(token){
    let __id = null;
    try{
        const {_id}= await jwt.decode(token);
        __id = _id;
    } catch (e){
        return false;
    }
    const user = await Login.findOne({_id:__id,estado:1});
    let codigoDistribuidor=""
    if (user){
        user.login.forEach(x => {
            if(token.codigoDistribuidor==x.codigoDistribuidor){
                codigoDistribuidor=x.codigoDistribuidor
            }
        });
       
        const token = jwt.sign({_id:__id},'clavesecretaparagenerartoken',{expiresIn:'1d'});
        return {token,
            rol:user.codigoRol.descripcion,
            codigoDistribuidor:codigoDistribuidor,
            email:user.correo,
            nombres:user.nombres
        };
    } else {
        return false;
    }
}

export default {
    encode: async (_id,rol,codigoDistribuidor,email,usuario) => {
        const token = jwt.sign(
            { _id:_id,
                codigoDistribuidor:codigoDistribuidor,
                rol:rol,
                email:email,
                usuario:usuario}
                ,'clavesecretaparagenerartoken'
                ,{expiresIn: '1d'});
        return token;
    },
    decode: async (token) => {
        try {
            const {_id} = await jwt.verify(token,'clavesecretaparagenerartoken');
            const user = await Login.findOne({_id,estado:1});
            if (user){
                return user;
            } else{
                return false;
            }
        } catch (e){
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}