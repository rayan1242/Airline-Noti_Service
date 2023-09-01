 const express = require ('express');
 const amqplib = require('amqplib')
 const {EmailService} = require('./services');
 const{ ServerConfig, Logger } = require('./config');
const apiRoutes = require('./routes');
const mailsender = require('./config/email-config');
 const app = express();
 
 async function connectQueue(){
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue('noti-queue');
   channel.consume('noti-queue', async(data) =>{ 
                  const object = JSON.parse(`${Buffer.from(data.content)}`);
                  await EmailService.sendEmail(ServerConfig.GMAIL_EMAIL,object.recepientEmail,object.subject,object.text);
                  channel.ack(data);
                  });
  } catch (error) {
    console.log(error);
  }
} 

 
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 


app.use('/api',apiRoutes);

 app.listen(ServerConfig.PORT, () =>{
   console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
   Logger.info("Successfully started the server",{});
    connectQueue();
})
 