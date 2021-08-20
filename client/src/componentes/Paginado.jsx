import React from 'react';
// MIN 13:00 3 REPASO
export default function Paginado({videogamesperPag,allVideoGames,paginado}){
    const pageNumbers=[] //cantidad de pagina [1,2,3]
    //redonde para arriba Math.ceil
    for(let i=0;i<Math.ceil(allVideoGames/videogamesperPag);i++){
      pageNumbers.push(i+1)
    }
    
    return(
        <nav>
         <ul>{
           pageNumbers&&pageNumbers.map(number=>(
              <li key={number}>
                  <a onClick={()=>paginado(number)}>{number}</a>
              </li>
           ))
         }</ul>
        </nav>
    )

}