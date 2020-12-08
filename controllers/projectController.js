const Project = require('../models/Project');

const { validationResult } = require('express-validator');

exports.createProyect = async (request, response) => {
    //Initial Validation
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({errors : errors.array()})
    try {
        console.log('Project controller');
        //Create new project
        const project = new Project(request.body);

        project.creator = request.user.id;

        //save
        project.save();

        response.json(project);
        
    } catch (e) {
        console.log(e);
        response.status(500).send('General error');
    }

}

//Get projects from actual user. The user is in the token during auth process
exports.getProjects = async (request, response) => {
    try {
        //get project
        const projects = await Project.find({ creator: request.user.id }).sort({ createdDtm : -1 });
        //set in response
        response.json(projects);
    } catch (error) {
        console.log(error);
        response.status(500).send('General error');
    }
}

//update project
exports.updateProject = async (request, response) => {
    //Initial Validation
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() })
    
    //get proyect
    const { name } = request.body;
    const newProject = {};

    if (name) {
        newProject.name = name;
    }
    
    try {
        //verify the ID
        let project = await Project.findById(request.params.id)
        //
        if (!project)
            return response.status(404).json({msg:'Project not found'});
        
        if (project.creator.toString() !== request.user.id)
            return response.status(401).json({msg:'Not Authorized'})
        
        project = await Project.findByIdAndUpdate(
            { _id: request.params.id }
            ,{ $set: newProject }
            , { new: true }
        )
       response.json({ project });
        
    } catch (error) {
        console.log(error);
        response.status(500).send('Server error');
    }

}

//delete project
exports.deleteProject = async (request, response) => {
    try {
        let project = await Project.findById(request.params.id);

        if (!project)
            return response.status(400).json({ msg: 'Project not found' });

        if (project.creator.toString() !== request.user.id) {
            return response.status(400).json({ msg: "Not Authorized" });
        }

        //delete
        await Project.findOneAndRemove({ _id: request.params.id })
        response.json({ msg: 'Project deleted' });

    } catch (error) {
        console.log(error);
        response.status(500).send('Server error');
   }
}