 const express = require('express');

 const router = express.Router();

 const { EmailController,InfoController } = require('../../controllers');
 
 router.get('/info',InfoController.info);

 router.post('/tickets', EmailController.create)

 module.exports = router;



