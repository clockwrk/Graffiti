'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('drawing', {
    image: {
        type: Sequelize.TEXT
    }
});
