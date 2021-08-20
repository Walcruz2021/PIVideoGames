const {Router}=require('express')
const axios=require('axios')
const{BDVideoGame,Genres,Platforms}=require('../db');    
const e = require('express');
const router=Router();

/////////////////////////////////////DESCRIPCION///////////////////////////////

router.get('/gamesDesc/:id',async(req,res)=>{
   
    const generosApi=await axios.get('https://api.rawg.io/api/games?key=fe362e212e8a4883a06b6dd7ca690e77&dates=2019-09-01,2019-09-30&platforms=18,1,7/{id}')

    const apiInfogen=await generosApi.data.results

res.status(200).json(apiInfogen)
})



/////////////////////////////////////CONSULTA GLOBAL/////////////////////////////////////////////////
router.get('/generosGlobal',async(req,res)=>{
   
    const generosApi=await axios.get('https://api.rawg.io/api/genres?key=fe362e212e8a4883a06b6dd7ca690e77&dates=2019-09-01,2019-09-30&platforms=18,1,7')

    const apiInfogen=await generosApi.data.results.map(el=>{
        return{
            name:el.name
        };
    });

res.status(200).json(apiInfogen)
})


/////////////////////////////////////GET GLOBAL VIDEOGAMES/////////////////////////////////////////////////
router.get('/gamesGlobal',async(req,res)=>{
   
    const gamesapi=await axios.get('https://api.rawg.io/api/games?key=fe362e212e8a4883a06b6dd7ca690e77&dates=2019-09-01,2019-09-30&platforms=18,1,7')

    const apiInfogam=await gamesapi.data.results

res.status(200).json(apiInfogam)
})
/////////////////////////////////////GET VIDEOGAMES/////////////////////////////////////////////////

//http://localhost:3001/videogames?name=The Surge 2 este get me trae por nombre
//http://localhost:3001/videogames y todos
router.get('/videogames',async(req,res)=>{
    //aqui guardo en name el valor ingresado en la URL a buscar(nombre del juego)
    const name=req.query.name
    let videogamesTotal=await getAllVideoGames();
    if(name){
        let videogamesName=await videogamesTotal.filter(el =>el.name.toLowerCase().includes(name.toLowerCase())) //NO ES el =>el.name.toLowerCase()===(name.toLowerCase()) PORQUE SI BUSCO JOSE ME VA A TRAER MARIA JOSE ETC ETC
        videogamesName.length?
        res.status(200).send(videogamesName):
        res.status(404).send("no hay nada");
    }else{
        res.status(200).send(videogamesTotal);
        console.log(videogamesTotal)
    }
})


const getApiInfo=async ()=>{
    const apiUrl=await axios.get('https://api.rawg.io/api/games?key=fe362e212e8a4883a06b6dd7ca690e77&dates=2019-09-01,2019-09-30&platforms=18,1,7')
   
    //AQUI DECIDO COMO ES QUE QUIERO QUE ME TRAIGA LOS DATOS DE LA API
    //ES DECIR ARMO EL FORMATO
    const apiInfo=await apiUrl.data.results.map(el=>{
        return{
            id:el.id,
            name:el.name,
            lanzado:el.released,
            background_image:el.background_image,
            description:el.description,
            rating:el.rating,
            genres:el.genres.map(e=>{
              return e.name
            }),
            platforms:el.platforms.map(e=>{
                return e.platform.name
            })
        };
    });
    //const apiInfo=await apiUrl.data.results
    return apiInfo; 
}

// //informacion de la BD

const getdbInfo=async()=>{
    //tabla de la BD
    return await BDVideoGame.findAll({
        include:{
            model:Genres,Platforms,//aqui se inserto la tabla de la BD
            attributes:['name'],//aqui los valores que quiero que me traiga
            through:{
                attributes:[],
            }
        }
    })
    //return await BDVideoGame.findAll
}


const getAllVideoGames=async()=>{
    const apiInfo=await getApiInfo();
    const dbInfo=await getdbInfo();
    const infoTotal=apiInfo.concat(dbInfo)
    
    return infoTotal
}  

/////////////////////////////////////GET GENEROS/////////////////////////////////////////////////

router.get('/generos',async(req,res)=>{
    
    const generosApi=await axios.get('https://api.rawg.io/api/genres?key=fe362e212e8a4883a06b6dd7ca690e77&dates=2019-09-01,2019-09-30&platforms=18,1,7')

    const apiInfogen=await generosApi.data.results.map(el=>{
        return{
            name:el.name
        };
    });

    // [{name:action},
    // {name:children},
    // {name:terror}]

    const arraynuevo=[]

    for(const property in apiInfogen){
        arraynuevo.push(apiInfogen[property].name)
    }
    
    //[action,children,terror]

    arraynuevo.forEach(el=>{
        Genres.findOrCreate({
         where:{name:el}    
        })
    })

//     const [user, created] = await User.findOrCreate({
//     where: { username: 'sdepold' },
//     defaults: {
//       job: 'Technical Lead JavaScript'
//     }
//     });
const allGeneros=await Genres.findAll();

res.status(200).json(allGeneros)
})

/////////////////////////////////////GET PLATFORMS/////////////////////////////////////////////////

router.get('/platforms',async(req,res)=>{
    
    const platformsApi=await axios.get('https://api.rawg.io/api/games?key=fe362e212e8a4883a06b6dd7ca690e77&dates=2019-09-01,2019-09-30&platforms=18,1,7')

    const apiInfoPlat=await platformsApi.data.results.map(el=>{
        return{
            platforms:el.platforms.map(e=>{
                return e.platform.name
            })
        };
       
    });
    // [
    //     {
    //       "platforms": [
    //         "PC",
    //         "Xbox One",
    //         "Xbox Series S/X"
    //       ]
    //     },
    //     {
    //       "platforms": [
    //         "PC",
    //         "PlayStation 5",
    //         "Xbox One",
    //         "PlayStation 4",
    //         "Xbox Series S/X"
    //       ]
    //     },
    
    const arraynuevo=[]

    for(const property in apiInfoPlat){
        apiInfoPlat[property].platforms.map(e=>arraynuevo.push(e))
    }
    
    //ELIMINO REPETIDOS
    
    const listanew = arraynuevo.filter((valor, indice) => {
        return arraynuevo.indexOf(valor) === indice;
      }
    );
    
    listanew.forEach(el=>{
        Platforms.findOrCreate({
         where:{name:el}    
        })
    })

    const allPlat=await Platforms.findAll()
res.status(200).json(allPlat)
})

///////////////////////////////////////////////////////////
router.get('/platformsotro',async(req,res)=>{
    
    const platformsApi=await axios.get('https://api.rawg.io/api/games?key=fe362e212e8a4883a06b6dd7ca690e77&dates=2019-09-01,2019-09-30&platforms=18,1,7')

    const apiInfoPlat=await platformsApi.data.results.map(el=>{
        return{
            platforms:el.platforms.map(e=>{
                return e.platform.name
            })
        };
       
    });
        const arraynuevo=[]

    for(const property in apiInfoPlat){
        apiInfoPlat[property].platforms.map(e=>arraynuevo.push(e))
    }
    
    const listanew = arraynuevo.filter((valor, indice) => {
        return arraynuevo.indexOf(valor) === indice;
      }
    );
    
res.status(200).json(listanew)
})


/////////////////////////////////////POST VIDEOGAMES/GENEROS/////////////////////////////////////////////////

router.post('/videogames', async (req, res) => {
    let{ 
      name,
      lanzado,
      rating,
      background_image,
      platforms,
      description,
      genres,
      createdInDb
    }=req.body
    
    let videogamesCreated=await BDVideoGame.create({
      name,
      lanzado,
      rating,
      background_image,
      description,
      createdInDb
    //no se le pasa aqui genero porque eso va aparte
    })

    let generoDB=await Genres.findAll({
        //tiene que coincidir con el genero pasado por body
        where:{name:genres}
    })
    let platDB=await Platforms.findAll({
        //tiene que coincidir con el genero pasado por body
        where:{name:platforms}
    })
    videogamesCreated.addGenres(generoDB)
    videogamesCreated.addPlatforms(platDB)
    res.send("videogames created")
   })
    

/////////////////////////*************GET X ID************************/////////////////

//http://localhost:3001/videogames/59637
//http://localhost:3001/videogames/58617 
//http://localhost:3001/videogames/53b4b69d-4db7-4e81-819b-1ae747b21596
router.get('/videogames/:id',async (req,res)=>{
const id=req.params.id;
const gamesTotal=await getAllVideoGames()
if(id){
    let gamesId=await gamesTotal.filter(el=>el.id==id)
    gamesId.length?
    res.status(200).json(gamesId):
    res.status(404).send("no encontre ese personaje")
} 
}) 

module.exports = router