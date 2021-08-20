import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {useEffect} from 'react'
import {getDetails} from '../actions/index'

//MIN 20:00 5 REPASO
export default function Details(props){
console.log(props)
// history: {length: 3, action: "PUSH", location: {…}, createHref: ƒ, push: ƒ, …}
// location: {pathname: "/details/326252", search: "", hash: "", state: undefined, key: "eg56fo"}
// match: {path: "/details/:id", url: "/details/326252", isExact: true, params: {…}}
// staticContext: undefined
// [[Prototype]]: Object
const dispatch=useDispatch()
useEffect(()=>{
  //ACCEDO AL VALOR DE ID PASANDOLE PROPS A MI COMPONENTE
    dispatch(getDetails(props.match.params.id))
},[dispatch])

//ME LO TRAIGO DEL REDUCER
const myVideoGame=useSelector((state)=>state.detail)
console.log(myVideoGame)
console.log(myVideoGame.length)

// 0:
// background_image: "https://media.rawg.io/media/games/9f1/9f1891779cb20f44de93cef33b067e50.jpg"
// genres: (4) ["Shooter", "Adventure", "Action", "RPG"]
// id: 58617
// lanzado: "2019-09-13"
// name: "Borderlands 3"
// platforms: (5) ["PC", "PlayStation 5", "Xbox One", "PlayStation 4", "Xbox Series S/X"]
// rating: 3.91
// [[Prototype]]: Object
// length: 1
// [[Prototype]]: Array(0)

return (
   <div>
     {
     myVideoGame.length>0?
       <div>
        <h1>{myVideoGame[0].name}</h1>
        <h2>Lanzamiento: {myVideoGame[0].lanzado}</h2>
        <img src={myVideoGame[0].background_image} alt="img nout found" width="150px" height="150px"/>
        <h2>Rating: {myVideoGame[0].rating}</h2>
        <h4>Generos: {!myVideoGame[0].createdInDb?myVideoGame[0].genres+'':myVideoGame[0].genres.map(el=>el.name+(''))}</h4>
        <h4>Plataforms:{!myVideoGame[0].createdInDb?myVideoGame[0].platforms+'':myVideoGame[0].platforms.map(el=>el.name+(''))}</h4>
       </div>:<p>Loading...</p>
     }
     <Link to='/home'>
     <button>Back</button>
     </Link>
   </div>
)
}