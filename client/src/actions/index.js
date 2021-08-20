
import axios from 'axios';

export function getVideoGames(){
return async function (dispatch){
    //aqui es donde sucede la conexion entre el front y el back
    var json=await axios.get("http://localhost:3001/videogames",{
      
    });
    console.log(json.data)
    return dispatch({
      type:'GET_VIDEOGAMES',
      payload:json.data
    })
}
}

//getNameVideoGames LO USO PARA EL SEARCH
export function getNameVideoGames(name){
   return async function(dispatch){
     try{
       var json =await axios("http://localhost:3001/videogames?name="+name);
       console.log(json.data)  
       return dispatch({
          type:"GET_NAME_VIDEOGAMES",
          payload:json.data
          
        })
     }catch(error){
       console.log(error)
     } 
  }
}

export function getGenero(){
  return async function (dispatch){
    var info=await axios.get('http://localhost:3001/generos',{
    });
    console.log(info.data)
    return dispatch({type:"GET_GENERO",payload:info.data});  
  }; 
}

export function getPlatforms(){
  return async function (dispatch){
    var info2=await axios.get('http://localhost:3001/platformsotro')
    console.log(info2)
    return dispatch({type:"GET_PLATFORMS",payload:info2.data});  
  }; 
}

export function postVideoGame(payload){
  console.log(payload)
  return async function (dispatch){
     var response=await axios.post('http://localhost:3001/videogames',payload)
    console.log(response)
    return response;  
  };
}


// export function filterVideoGamesByStatus(payload){
// console.log(payload)
//   return {
//     type:"FILTER_BY_STATUS",
//     payload       
//   }
// }

//LO USO PARA FILTRADOS DE JUEGOS CREADOS POR MI Y API

export function filterCreated (payload){
 console.log(payload)
  return{
    type:"FILTER_CREATED",
    payload
  }
}

export function filterxGen (payload){
  //console.log(payload)
   return{
     type:"FILTER_X_GEN",
     payload
   }
 }

 //LO USO PARA ORDENAR ASC Y DESC
export function orderByName (payload){
  return{
    type:"ORDER_BY_NAME",
    payload
  }
}

export function orderByRating (payload){
  return{
    type:"ORDER_BY_RATING",
    payload
  }
}

export function getDetails (id) {
  return async function(dispatch){
    try{
      var json=await axios.get('http://localhost:3001/videogames/'+id)
      console.log(json.data)
      return dispatch({
        type:'GET_DETAILS',
        payload:json.data 
      })   
      
    } catch(error){
     console.log(error)
    }
    
  }

}