const {DataTypes} = require('sequelize')



module.exports = function(sequelize) {
    return sequelize.define('Platforms', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
}
