const express = require('express')
const {getAllEmployees,getOneEmployee,addEmployee,updateEmployee,deleteEmployee,loginEmployee,logoutEmployee} = require('../controllers/employeeController')
const router = express.Router()
const { isAuthenticatedUser,authorizedRoles }=require('../middlewares/auth')

router.get('/',getAllEmployees)

router.get('/:id',isAuthenticatedUser,getOneEmployee)

router.post('/sign-up',addEmployee)

router.post('/login',loginEmployee)

router.get('/:id/logout',logoutEmployee)

router.put('/update/:id',isAuthenticatedUser,updateEmployee)

router.delete('/delete/:id',isAuthenticatedUser,deleteEmployee)

module.exports = router