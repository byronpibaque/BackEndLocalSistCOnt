
import routerx from 'express-promise-router';

import xmlControl from '../controllers/generarXML';

const router=routerx();

router.post('/xml',xmlControl.xml);

router.post('/xml_retencion',xmlControl.xml_retencion);

export default router;