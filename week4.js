let dbUsers = [
    {
        username: "shafa" ,
        password: "12345" ,
        name: "shafa" ,
        email: "shafawatih7012@gmail.com"
    },
  
    {
        username: "jojo" ,
        password: "password" ,
        name: "Jojo" ,
        email: "jojo@gmail.com"
    },
  
    {
        username: "utem" ,
        password: "0000" ,
        name: "fkekk" ,
        email: "utem@gmail.com"
    }
  ]
  
  function login(reqUsername, reqPassword){

      let matchUser = dbUsers.find(
  
        x => x.username == reqUsername
      )
  
  
   if (!matchUser) return "User not Found !"
  
   if(matchUser.password == reqPassword){
            return matchUser
    } else{
        return "Invalid Password"
    }
  }
    function register(reqUsername, reqPassword, reqName, reqEmail){
        dbUsers.push({
            username: reqUsername,
            password: reqPassword,
            name: reqName,
            email: reqEmail
        })
    }
  
    //to generate token jwt
    function generateToken(userData){
        const token = jwt.sign(
            userData,
            'password',
            { expiresIn: 60 }
        );
        return token
    }

    //To verify token
    function verifyToken(req, res, next){
        let header = req.headers.authorization
        console.log(header)

        let token = header.split(' ')[1]

        jwt.verify(token, 'password', function(err, decoded){
            if(err){
                res.send("Invalid Token")
            }

            req.user = decoded
            next()
        });
    }
  
  //try to login
  //console.log(login("shafa", "password"))
  
  //register("utem","0000", "fkekk", "utem@gmail.com")
  //console.log( login("utem","0000"))
  
  const express = require('express')
  const app = express()
  const port = 3001
  const jwt = require('jsonwebtoken')
  
  app.use(express.json())
  
  app.post('/login', (req, res) => {
      console.log(req.body)
      
      let result = login(
        req.body.username,
        req.body.password
      )

      let token = generateToken(result)
      res.send(token)
    })
  
  
  app.get('/', (req, res) => {
    res.send('Hello EVERYBODY!')
  })
  
  
  app.get('/bye', verifyToken, (req, res, next) => {
      res.send('BYE EVERYBODY!')
    })
  
  
    app.post('/register', (req, res) => {
      let result = register(
        req.body.username,
        req.body.password,
        req.body.name,
        req.body.email
      )
  
      res.send(result)
      //res.send('Account Created!')
    })
  
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })