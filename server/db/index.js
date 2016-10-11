'use strict';
const db = require('./_db');
const User = require('./models/user');
const Location = require('./models/location');
const Drawing = require('./models/drawing');
const Text = require('./models/text');
const Image = require('./models/image');
const Project = db.define('project');

module.exports = {
	db,
	User,
	Location,
	Drawing,
	Text,
	Image,
	Project
};

Project.hasOne(Drawing); //just one based on what you were saying right?
Project.hasMany(Text);
Project.hasMany(Image); 

Drawing.belongsTo(Project);
Text.belongsTo(Project);
Image.belongsTo(Project); //this might end up being belongsToMany based on what you were saying about just having a collection of Images, because then an image would be ably

Project.belongsTo(Location);
Location.hasMany(Project);

Project.belongsTo(User);
User.hasMany(Project)
