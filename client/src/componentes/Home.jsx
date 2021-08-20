//33:00 2 REPASO

import React from 'react'
import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getVideoGames,filterCreated,orderByName,orderByRating} from '../actions'

import {getGenero} from '../actions/index'

import {Link} from 'react-router-dom'
import Card from './Card'
import Paginado from './Paginado'
import SearchBar from './SearchBar'
import FilterGen from './FilterGen'

export default function Home(){

    const dispatch=useDispatch()
    
    //es lo mismo que hacer map.statetuProps
    const allVideoGames=useSelector((state)=>state.videogames)
    
    const allGeneros=useSelector((state)=>state.genero)
  
    //PAGINADO MIN 02:00 3 REPASO
    //paginado comienza con 1 cuurentPage=estado local de la pagina actual
    const[currentPage,setCurrentPage]=useState(1)
   
    const[orden,setOrden]=useState("")
    
    //videogamesperPag=estado local cant videogames segund README
    const[videogamesperPag,setvideogamesperPag]=useState(9)
    
    //indexOfLastVG indice del ultimo videogame 
    //inicialmente si estamos en la pag 1 su valor seria 9
    const indexOfLastVG=currentPage*videogamesperPag 


    //indexOfFirtsVG indice del primer videogmes
    const indexOfFirtsVG=indexOfLastVG-videogamesperPag//0


    //currentVideoGames tendria los videosgames del 0 al 8 en total(9)
    // El método slice() devuelve una copia de una parte del array dentro de un nuevo array empezando por 
    // inicio hasta fin (fin no incluido). El array original no se modificará.
    const currentVideoGames=allVideoGames.slice(indexOfFirtsVG,indexOfLastVG)

//inicialmente seteara currentPage en 1 (listia iria de 1 a 9 videogames), luego 
//2 (listia iria de 10 a 19 videogames),etc etc
const paginado=(pageNumber)=>{
setCurrentPage(pageNumber)
}

useEffect(()=>{
    dispatch(getVideoGames())//lo mismo que mapdispatchtoPros

},[dispatch])

console.log(allVideoGames)

useEffect(()=>{
    dispatch(getGenero())//lo mismo que mapdispatchtoPros

},[])

console.log(allGeneros)

function handleClick(e){
  e.preventDefault();
  dispatch(getVideoGames());//resetea 
}

//PARTE DE FILTRADO MIN 39:00 3 REPASO
// function handleFilterStatus(e){

// //tomara los valores dependiendo del click que haga el ususario en la lista de opciones   
// dispatch(filterVideoGamesByStatus(e.target.value))  
// }

///////////////////////FILTRADOS CREADOS Y DE API////////////////////////////

function hanfilterCreated(e){
    dispatch(filterCreated(e.target.value))
}


/////////////////////ORDENADO ASCENDENTE DESCENDENTE////////////////////////////

//parte de ordenado ascedente y decendet MIN 1:16:27 3 REPASO
function handleSort(e){
    e.preventDefault();    
    dispatch(orderByName(e.target.value))
   //luego de hacer el ordenamiento se le solicita que se setee la pagina 1
    setCurrentPage(1)
   //una vez que se setee el estado local se modificara y se renderizara  
   //este estado local arranca vacio y luego se lo setea ordenado
    setOrden(`Ordenado ${e.target.value}`)
}
function handleSort2(e){
    e.preventDefault();    
    dispatch(orderByRating(e.target.value))
   //luego de hacer el ordenamiento se le solicita que se setee la pagina 1
    setCurrentPage(1)
   //una vez que se setee el estado local se modificara y se renderizara  
   //este estado local arranca vacio y luego se lo setea ordenado
    setOrden(`Ordenado ${e.target.value}`)
}

// function onFilterGen(e){
// //console.log("se eligio" + e.target.value)
// const busc=e.target.value
// //console.log(busc)
// const filteredGen=allVideoGames.filter(gen=>gen.genres.filter(e=>e==busc)==busc)

// console.log(filteredGen)
// }

return (
    <div>
      <Link to='/videogames'>crear Video Games</Link>
      <h1>Welcome Gamers</h1>
      <button onclick={e=>{handleClick(e)}}>
          Cargar de nuevo los personajes
      </button> 
      <div>
          <select onChange={e=>handleSort(e)}>
    {/* estos values me permiten identificar dentro de select dependiewndo del valor 
    del valu se ascendera o descendera*/}
              <option value="asc">Ascendente x VG</option>
              <option value="desc">Descendente x VG</option>
          </select>
          <select onChange={e=>handleSort2(e)}>
    {/* estos values me permiten identificar dentro de select dependiewndo del valor 
    del valu se ascendera o descendera*/}
              <option value="asc">Ascendente x Rating</option>
              <option value="desc">Descendente x Rating</option>
          </select>
          <FilterGen/>
          <select onChange={e=>hanfilterCreated(e)}>
              <option value="all">Todos</option>
              <option value="api">API</option>
              <option value="created">Agregado</option>          
         </select>
         
        {/* forma que no funciona  */}
         {/* <select name="genero" id="genero">
            <option>Filtrado x Generos</option>
            {cargar_generos(allGeneros)}
         </select> */}
         {/* <select name="generos" onChange={e=>onFilterGen(e)}>
             <option>Filtrado Genero</option>
             {allGeneros.map(el=>(
             <option key={el.id} value={el.name}>{el.name}</option>
         ))}
         
         </select> */}

         <Paginado 
         videogamesperPag={videogamesperPag} 
         allVideoGames={allVideoGames.length}
         paginado={paginado}
         />
         
         <SearchBar/>
         

         {/* pregunta si existe primero y luego lo mapea */}
         {currentVideoGames?.map((e)=>{
             return(
                 <fragment>
        {/* RENDERIZADO DE CARD MIN 1:02:00 */}
                 <Link to={"/details/"+ e.id}>
                     <Card name={e.name} key={e.id} background_image={e.background_image} rating={e.rating} genres={e.genres}/>    
                     {/* {console.log(e.lanzamiento)} */}
                     {/* <Card nombre={e.nombre} imag ={e.img } generos={e.generos} key={e.id}/>*/}
                 </Link> 
                 </fragment>
             );
         })}
      </div>
    </div>
)

}
