const router = require('express').Router() // eslint-disable-line new-cap
module.exports = router;
const Project = require('../../../db').Project;
const Location = require('../../../db').Location;
const Drawing = require('../../../db').Drawing;
const Image = require('../../../db').Image;
const Text = require('../../../db').Text;

router.get('/:id', (req, res, next) => {
	Project.findById(req.params.id)
		.then(project => res.send(project))
		.catch(next);
})

router.post('/', (req, res, next) => {
	Promise.all([
	    Project.create(),
	    Promise.all(req.body.texts.map(el => Text.create(el))),
	    Drawing.create(req.body.drawing)),
	    Promise.all(req.body.images.map(el => Image.create(el))),
	    Location.create(req.body.location)
	])
    	.then(creationArray => {
    		let project = creationArray[0],
    			texts = creationArray[1],
    			drawing = creationArray[2],
    			images = creationArray[3],
    			location = creationArray[4];
    		return Promise.all([
    			project.setTexts(texts),
	    		project.setDrawing(drawing),
	    		project.setImages(images),
	    		project.setLocation(location),
	    		project.setUser(req.user)
    		])
    	})
    	.then(completedAssociations => res.end()) //figure out what comes back and what we want to send in this moment
    	.catch(next)
});


router.delete('/:id', (req, res, next) => {
    Project.destroy({
        where: { id: req.params.id }
    })
    .then(linesDestroyed => res.sendStatus(204))
    .catch(next)
})


