import app from './src/app.js';

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('listening on port: http://localhost:' + port);
});

//module.exports = app;
/**
  {
  "confirmPassword": "123",
  "telephone": "31988887777",
  "password": "123",
  "imAnNGO": "false",
  "about": "Gosto de animais e quero um para cuidar",
  "state": "Minas Gerais",
  "photo": "s6fa4d2316vas84d54cc4v56d",
  "email": "mario.card@gmail.com",
  "city": "Belo Horizonte",
  "name": "Mario Card",
  "cep": "32111478"
}



{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjkwMjUzNTR9._PVrUYhikpcEwXrAYNybAFrkyBHwvEgGBcpbPBpX_w8",
  "userId": "670df54fdcf3b7d5aa5dbbd6"
}

 */

/** "routes": [
    {
        "src": "/(.*)",
        "dest": "server.js"
    }
],
"env": {
    "MONGODB_URI": "LINK_MONGODB"
}*/
