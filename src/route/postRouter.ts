const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')
const passuseridmiddleware = require('../middleware/passuseridmiddleware')
const usercheckmiddleware = require('../middleware/usercheckmiddleware')
const passloginmiddleware = require('../middleware/passloginmiddleware')


router.post('/post',authMiddleware,passuseridmiddleware,passloginmiddleware,postController.create)
router.patch('/update/:id', authMiddleware,passuseridmiddleware,usercheckmiddleware,postController.update)
router.delete('/delete/:id', authMiddleware,passuseridmiddleware,usercheckmiddleware, postController.delete)
router.get('/get/:offset',postController.getpost)


module.exports = router;