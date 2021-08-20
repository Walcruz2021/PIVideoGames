
//MIN 20:00 4 REPASO
import React from 'react'
import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useHistory} from 'react-router-dom'

import {postVideoGame,getGenero,getPlatforms} from '../actions/index'


function validate(inpt){
    let errors={}
    if(!inpt.name){
        errors.name="se requiere un nombre"
    }else if(!inpt.description)
       errors.description="se requiere una descripcion"
    else if(!inpt.lanzado){
       errors.lanzado="se requiere una fecha de lanzamiento"
    }
    else if(!inpt.rating){
        errors.rating="se requiere un numero de rating"
     }
    return errors;
};

export default function VideoGameCreate(){
const dispatch=useDispatch();
const generos=useSelector((state)=>state.genero)
const Pforms=useSelector((state)=>state.platform)

const history=useHistory()

const [errors,setError]=useState({}); 


const [inpt,setInput]=useState({
    name:"",
    description:"",
    lanzado:"",
    rating:"",
    genero:[],
    platform:[]
})
console.log(inpt)

function handleChange(e){
  setInput({
    ...inpt,
     [e.target.name]:e.target.value
  }) 
  
  setError(validate({
    ...inpt,[e.target.name]:e.target.value
  }))
console.log(inpt)
console.log(errors)
}

//MIN 59:00 4 REPASO
function handleSelect(e){
    setInput({
    ...inpt,
    genero:[...inpt.genero,e.target.value]    
    })
}

function handleSelect2(e){
    setInput({
    ...inpt,
    platform:[...inpt.platform,e.target.value]    
    })
}

function handleSubmit(e){
 e.preventDefault()
 console.log(inpt)
 dispatch(postVideoGame(inpt))
 alert("videogame create")
 setInput({
    name:"",
    description:"",
    lanzado:"",
    rating:"",
    genero:[],
    platform:[]
 })

 //mMIN 1:04:57 4 REPASO
 //metodo del router que diruije a la ruta que yo le diga
 history.push('/home')
}

//min 10:00 5 REPASO
function handleDelete(el){
    setInput({
        ...inpt,
        genero:inpt.genero.filter(gen=>gen!==el)
    })
}
function handleDelete2(el){
    setInput({
        ...inpt,
        platform:inpt.platform.filter(gen=>gen!==el)
    })
}

function habilitar(){
    // 
    var campoN=document.getElementById("campoN").value
    var campoD=document.getElementById("campoD").value
    var campoL=document.getElementById("campoL").value
    var campoR=document.getElementById("campoR").value
    var select1=document.getElementById("campoS").value
    var select2=document.getElementById("campoP").value
 var val=0;
if(campoN==""){
val++; 
}
if(campoD==""){
    val++; 
}
if(campoL==""){
    val++; 
}
if(campoR==""){
    val++; 
}
if(select1==""){
    val++; 
}
if(select2==""){
    val++; 
}
if(val===0){
    document.getElementById('btn').disabled=false
}else{
    document.getElementById('btn').disabled=true
}

}

// var campoN=document.getElementById("campoN").addEventListener("keyup",habilitar);
// var campoD=document.getElementById("campoD").addEventListener("keyup",habilitar);
// var campoL=document.getElementById("campoL").addEventListener("keyup",habilitar);
// var campoR=document.getElementById("campoR").addEventListener("keyup",habilitar);
// var campoS=document.getElementById("campoS").addEventListener("change",habilitar);
// var campoP=document.getElementById("campoP").addEventListener("change",habilitar);
// var campoN=document.getElementById("btn").addEventListener("click",()=>{
//     alert("se lleno")
// });

useEffect(()=>{
    dispatch(getGenero());
},[])

useEffect(()=>{
    dispatch(getPlatforms());
},[])

console.log(generos)
console.log(Pforms)
return (
    <div>
    <Link to='/home'><button>Volver</button></Link>
    <h1>POR FAVOR CREA TU VIDEO GAMES</h1>
     <form onSubmit={(e)=>handleSubmit(e)}>
        <div>
            <label>Name</label>
            <input 
            type="text" id="campoN" 
            value={inpt.name} 
            name="name"
            onChange={(e)=>handleChange(e)}
            />
            {errors.name && (
                <p>{errors.name}</p>
            )}
        </div>
        <div>
            <label>Description</label>
            <input 
            type="text" id="campoD" 
            value={inpt.description} 
            name="description"
            onChange={(e)=>handleChange(e)}
            />
            {errors.description && (
                <p>{errors.description}</p>
            )}
        </div>
        <div>
            <label>Lanzado</label>
            <input 
            type="text" id="campoL"
            value={inpt.lanzado} 
            name="lanzado"
            onChange={(e)=>handleChange(e)}
            />
            {errors.lanzado && (
                <p>{errors.lanzado}</p>
            )}
        </div>
        <div>
            <label>Rating</label>
            <input 
            type="text" id="campoR"
            value={inpt.rating} 
            name="rating"
            onChange={(e)=>handleChange(e)}
            />
            {errors.rating && (
                <p>{errors.rating}</p>
            )}
        </div>
    
    <select onChange={(e)=>handleSelect(e)} id="campoS">
    <option value="">seleccion genero</option>
        {generos.map((gen)=>(
            <option value={gen.name}>{gen.name}</option>
        ))}
    </select>

{/* va agarrar mi estado input .genero y renderizara cada seleccion del select */}
<ul><li>{inpt.genero.map(el=>el+",")}</li></ul>

<div>
  {inpt.genero.map(el=>
        <span>{el}
        <button onClick={()=>handleDelete(el)}>X</button>
        </span>
   )}
</div>

    <select onChange={(e)=>handleSelect2(e)} id="campoP">
        <option value="">seleccion plataforma</option>
        {Pforms.map((plat)=>(
            <option value={plat}>{plat}</option>
        ))}
    </select> 

<ul><li>{inpt.platform.map(el=>el+",")}</li></ul>

<div> 
   {inpt.platform.map(el=>
        <span>{el}
        <button onClick={()=>handleDelete2(el)}>X</button>
        </span>
   )}
</div><br></br>

    <button type="submit" id="btn" >Crear VideoGames</button> 

    </form>
   
    </div>    
)
}
