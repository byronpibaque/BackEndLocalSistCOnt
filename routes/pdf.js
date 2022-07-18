
import routerx from 'express-promise-router';

import xmlControl from '../controllers/crearPDF';


const router=routerx();




router.post('/pdf',xmlControl.crear);
router.post('/pdfR',xmlControl.crearR);
router.post('/pdfE',xmlControl.crearEgreso);

router.get('/email',xmlControl.email);


export default router;