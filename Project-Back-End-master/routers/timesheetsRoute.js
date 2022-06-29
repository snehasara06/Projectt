const express = require('express')
const {getAllTimesheets,getOneTimesheet,addTimesheet,updateTimesheet,deleteTimesheet} = require('../controllers/timesheetController')
const router = express.Router()
const { isAuthenticatedUser,authorizedRoles }=require('../middlewares/auth')

router.get('/',getAllTimesheets)

router.get('/:id',getOneTimesheet)

router.post('/',isAuthenticatedUser,addTimesheet)

router.put('/update/:id',isAuthenticatedUser,updateTimesheet)

router.delete('/delete/:id',isAuthenticatedUser,deleteTimesheet)

module.exports = router
 