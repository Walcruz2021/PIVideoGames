
const initialState={
    videogames:[],
    //allvideoG copia que siempre va a traer todos los juegos
    allvideoG:[],
    detail:[],
    genero:[],
    platform:[]
  }


function rootReducer(state=initialState,action){
  console.log(state)
  
  switch(action.type){
    case 'GET_VIDEOGAMES':
    console.log(action.payload)      
      return {
         ...state,
         videogames:action.payload,
         allvideoG:action.payload
      }
 

    case "GET_NAME_VIDEOGAMES":
//es en videogame porque se trabaja en el que se esta renderizando
      console.log(action.payload)      
      return{
         ...state,
        videogames:action.payload  
      }
     
    case "GET_GENERO":
      console.log(action.payload)
      return {
        ...state,genero:action.payload
      }

    case "GET_PLATFORMS":
      console.log(action.payload)
      return {
        ...state,platform:action.payload
      }

  //MIN 31:00 3 REPASO FILTRADO      
  //       case "FILTER_BY_STATUS":
  //  //IMPORTANTE LAS LOGICAS SE REALIZAN ANTES DEL RETURN 
  //       const allvideoG=state.allvideoG
  //       const statusFiltered=action.payload==="all" ? allvideoG:allvideoG.filter(e=>e.status===action.payload)  
  //         return {
  //           ...state,videogames:statusFiltered
  //         }
       
       case "POST_VIDEOGAME":
           return {
             ...state,
           }
          
    //FILTRADO X CREADOS O X API MIN 52:17 3 REPASO
        case "FILTER_CREATED":
          //const allvideoGames2=state.allvideoG  
          const createFiltered=action.payload ==="created" ? state.allvideoG.filter(el=>el.createdInBD):state.allvideoG.filter(e=>!e.createdInBD) 
          return{
            ...state,
            videogames:action.payload==='all' ? state.allvideoG:createFiltered

          }
          case "FILTER_X_GEN":
          console.log(action.payload)
          const genFiltered=state.allvideoG.filter(gen=>gen.genres.filter(e=>e==action.payload)==action.payload)
          console.log(genFiltered)
          return {
            ...state,
            videogames:action.payload==="Filtrado x Genero" ? state.allvideoG:genFiltered         
          }
          
        case "GET_DETAILS":
          console.log(action.payload)
          return{
            ...state,
            detail:action.payload
          }
          
        //parte de ordenado ascedente y decendet MIN 1:16:27 3 REPASO
        case "ORDER_BY_NAME":
          let sortedArr=action.payload==="asc" ?
          state.videogames.sort(function (a,b){
            if(a.name>b.name){
              return 1;
            }
            if(b.name>a.name){
              return -1
            }
            return 0;
          }):
          state.videogames.sort(function(a,b){
            if(a.name > b.name){
              return -1
            }
            if(b.name > a.name){
              return 1
            }
            return 0;
          })
          return {
            ...state,videogames:sortedArr
          }

          case "ORDER_BY_RATING":
          let sortedRating=action.payload==="asc" ?
          state.videogames.sort(function (a,b){
            if(a.rating>b.rating){
              return 1;
            }
            if(b.rating>a.rating){
              return -1
            }
            return 0;
          }):
          state.videogames.sort(function(a,b){
            if(a.rating > b.rating){
              return -1
            }
            if(b.rating > a.rating){
              return 1
            }
            return 0;
          })
          return {
            ...state,videogames:sortedRating
          }

      default:
        return state; 
  }
}

export default rootReducer;