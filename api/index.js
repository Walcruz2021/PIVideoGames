// const app=require('./app')
// const {conn,Genero} = require('./models/index');
// const axios=require('axios')

// //  CONEXION CON BASE DE DATOS
// conn.sync({
// force:true
// }).then(async()=>{
//   //AQUI VOY A PRECARGAR LOS GENEROS EN LA BD (INICIO DE PAGINA)
//   const apiGenerosResponse = await axios.get('https://api.rawg.io/api/genres?key=fe362e212e8a4883a06b6dd7ca690e77&dates=2019-09-01,2019-09-30&platforms=18,1,7')
//   //console.log(apiGenerosResponse.data)
//   let apiGeneros = apiGenerosResponse.data.results
//   apiGeneros = apiGeneros.map((genero) => {
//     return {
//         name: genero.name
//     }
// }) 
//   //console.log(apiGeneros)
//   await Genero.bulkCreate(apiGeneros)
//   console.log("base de datos conectada")
//   app.listen(3001,()=>{
//     console.log('escuchando el serviodor puerto 3001')
//   })
// })

// /////////////////////****HENRY********///////////////////// */
const server=require('./src/app.js')
const {conn}=require('./src/db.js') 

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
