import jwt from 'jsonwebtoken';
import { environment } from '../../environment/env.js';

const secret = environment.SECRET_KEY ;

export default function checkToken (req, res, next) {
  
  const authToken = req.headers['authorization'];
  const token = authToken && authToken.split(" ")[1];

  if(!token) {
    return res.status(401).json({
      stausCode: "401",
      message: "Acesso não autorizado."
    })
  }

  try {
    jwt.verify(token, secret);
    next();

  } catch(err) {
    res.status(400).send({message: 'Token invalid'});
  };
};
