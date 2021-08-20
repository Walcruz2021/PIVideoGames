const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  // defino el modelo
  //Videogame sera la tabla que se creara en la BD
  return sequelize.define('BDVideoGame', {
    id:  {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    lanzado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false
    },

    background_image:{
      type:DataTypes.STRING,
      allowNull:true
    },

    description:{
      type:DataTypes.STRING,
      allowNull:true
    },
//distincion entre API Y BD
//con esto es mucho mas facil acceder al videogame que yo cree
//con esta propiedad porque el el videgame creado la va a tener
//y los de la PAI NOO
    createdInBD:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  })
}

//ESTA LISTO 
//consultar por descripcion porque no se onde esta en la api
