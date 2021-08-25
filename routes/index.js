import routerx from 'express-promise-router';

import PDF from './pdf';
import XML from './generaxXML';



 


const router=routerx();

router.use('/xml',XML)

router.use('/pdf',PDF)



export default router;