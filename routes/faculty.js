const express = require('express')
const facultyController = require('../controllers/faculty')
const signInController = require('../controllers/signin')

const router = express.Router()

router.get('/:facultyId', facultyController.getFaculty)
router.get('/search/:query', facultyController.searchFaculty)

if (process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'test') {
  router.use(signInController.isAuthenticated)
}
router.post('/add', facultyController.addFaculty)
router.put('/update', facultyController.updateFaculty)
router.delete('/:facultyId', facultyController.deleteFaculty)

module.exports = router
