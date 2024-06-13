const express = require('express');
const companyController = require('../controllers/companyController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', authMiddleware, companyController.createCompany);
router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);
router.put('/:id', authMiddleware, companyController.updateCompany);
router.delete('/:id', authMiddleware, companyController.deleteCompany);
router.get('/search', companyController.searchCompanies);
router.post('/bulk', authMiddleware, upload.single('file'), companyController.bulkAddCompanies);

module.exports = router;
