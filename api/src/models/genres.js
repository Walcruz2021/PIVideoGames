const {DataTypes} = require('sequelize')

//AQUI SE DEFINE EL MODELO EN BASE A LOS DATOS QUE TRAE LA API
//(min 33:00 1 repaso)
//utilizando sequelize en este archivo permitira crear la tabla EPISODES en postgres

module.exports = function(sequelize) {
    return sequelize.define('genres', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
}

//la BD general el id de GENERO 