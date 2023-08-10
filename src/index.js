 const express = require ('express');

 const{ ServerConfig, Logger } = require('./config');
const apiRoutes = require('./routes');
const mailsender = require('./config/email.config');
 const app = express();
 
 
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 


app.use('/api',apiRoutes);

 app.listen(ServerConfig.PORT,async () =>{
   console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
   try{const response = await mailsender.sendMail({
      from: ServerConfig.GMAIL_EMAIL,
      to: 'maindargirayyan@gmail.com',
      subject:'Is the service working?,',
      text: 'Yes,it is.'
   });
   console.log(response);} catch(error){
    console.log(error);
  }
   Logger.info("Successfully started the server",{});
})
 