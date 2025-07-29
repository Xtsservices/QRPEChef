import { Router } from 'express';
import { createItem ,getAllItems,getAllItemsCount,setItemInactive,updateItem} from '../controllers/itemController';
import authenticateToken from '../middlewares/authMiddleware'; // Import the authentication middleware
import upload from '../middlewares/multerConfig';

const router = Router();

router.post('/createItem',authenticateToken,upload.single('image'), createItem);

router.post('/updateItem',authenticateToken,upload.single('image'), updateItem);



router.get('/getItems', getAllItems);

router.get('/getAllItemsCount', getAllItemsCount);


router.post('/deleteItem', setItemInactive);


export default router;