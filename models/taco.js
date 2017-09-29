'use strict';
module.exports = function(sequelize, DataTypes) {
    var taco = sequelize.define('taco', {
        name: DataTypes.STRING,
        amount: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        },
        hooks: {
            beforeCreate: function(taco, options, cb) {
                taco.name = taco.name.toUpperCase();

                //use callback to pass updated object back
                cb(null, taco);
            }
        }
    });
    return taco;
};