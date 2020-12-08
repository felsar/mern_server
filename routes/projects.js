const express = require('express');
const { request } = require('express');
const router = express.Router();
const { check } = require('express-validator');

const projectController = require('../controllers/projectController')
const authentication = require('./../middleware/authentication');

//api/projects
router.post('/',
    authentication,
    [
        check('name', 'Name is required').not().isEmpty()
    ],
    projectController.createProyect
);

router.get('/',
    authentication,
    projectController.getProjects
);

router.put('/:id',
    authentication,
    [
        check('name', 'Name is required').not().isEmpty()

    ],
    projectController.updateProject
);
//delete
router.delete('/:id',
    authentication,
    projectController.deleteProject
);

module.exports = router;