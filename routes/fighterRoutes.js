var express = require('express');

var routes = function(Fighter) {

	var fighterRouter = express.Router();
	
	fighterRouter.route('/')
	
		// add fighter
		.post(function(req,res) {
			var fighter = new Fighter(req.body);
			fighter.save();
			res.sendStatus(201, fighter);
		})
	
	// get all fighters
		.get(function(req,res){
			Fighter.find(function(err, fighters) {
				if (err)
					return res.sendStatus(500, err);
				else
				return res.json(fighters);
			});

		});
	fighterRouter.use('/:fighterId', function(req,res,next) {
		Fighter.findById(req.params.fighterId, function(err, fighter) {
				if (err)
					return res.sendStatus(500, err);
				else if (fighter) {
					req.fighter = fighter;
					next();
				}
					else {
						res.sendStatus(404,"Fighter not found");
					}
			});
	})	
	fighterRouter.route('/:fighterId')
	
	// get single figher
		.get(function(req,res){
			res.json(req.fighter);
		})
		.put(function(req, res) {
			req.fighter.firstName = req.body.firstName;
			req.fighter.lastName = req.body.lastName;
			req.fighter.weightClass = req.weightClass;
			req.fighter.wins = req.body.wins;
			req.fighter.losses = req.body.losses;
			req.fighter.kos = req.body.kos;
			req.fighter.submissions = req.body.submissions;
			req.fighter.champion = req.body.champion;
			req.fighter.save();
			res.json(req.fighter);
			
		})

		.delete(function(req, res) {
			req.fighter.remove(function(err){
				if (err)
					res.sendStatus(500, err);
				else {
				  res.sendStatus(204, "Fighter has been deleted");
				}
			});
		});

	return fighterRouter;
};

module.exports = routes;