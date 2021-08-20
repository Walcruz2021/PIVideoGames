import React from 'react';
import{useState} from 'react';
import {useDispatch} from 'react-redux';
import {getVideoGames} from '../actions';
import {getGenero} from '../actions/index'
import {useSelector} from 'react-redux'
import {filterxGen} from '../actions';

export default function FilterGen(){
    const dispatch=useDispatch()
    const allVideoGames=useSelector((state)=>state.videogames)
    const allGeneros=useSelector((state)=>state.genero)
    console.log(allVideoGames)
    function onFilterGen(e){
        //console.log("se eligio" + e.target.value)
        const busc=e.target.value
        //console.log(busc)
        // const filteredGen=allVideoGames.filter(gen=>gen.genres.filter(e=>e==busc)==busc)
        // console.log(filteredGen)
        // for(const property in filteredGen ){
        //  dispatch(getNameVideoGames(filteredGen[property].name))
        // // console.log(filteredGen[property])
        // }
        dispatch(filterxGen(busc))
    }
        
// no funciona
//  function cargar_generos(allGeneros){
    
//      for(var i in allGeneros){ 
//          document.getElementById("genero").innerHTML += "<option value='"+allGeneros[i].name+"'>"+allGeneros[i].name+"</option>"; 
//      }
//  }

return (
<div>
<select name="generos" onChange={e=>onFilterGen(e)}>
             <option>Filtrado x Genero</option>
             {allGeneros.map(el=>(
             <option key={el.id} value={el.name}>{el.name}</option>
         ))}
         
</select>
</div>
)}