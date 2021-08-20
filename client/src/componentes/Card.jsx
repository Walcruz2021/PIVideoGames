
import React from 'react'


//SE REALIZA EL FORMATO DE LOS DATOS QUE SE RENDERIZARAN DESDE EL BACK
//EL MISMO LUEGO SE RENDERIZARA EN EL HOME

export default  function Card({name,rating,background_image,genres}){
    return( 
        <div>
            <h3>{name}</h3>
            <h3>{rating}</h3>
            <img src={background_image} alt="img nout found" width="150px" height="150px"/>
            <h3>Generos: {genres.map(e=>e+("/"))}</h3>
            {/* {console.log(name)}
            {console.log(genres)} */}
        </div>
    )
}

//copia de respaldo
// export default  function Card({name,image,generos}){
//     return( 
//         <div>
//             <h3>{name}</h3>
//             <h5>{generos}</h5>
//             <img src={image} alt="img not found" width="200px" height="250px" /> 
    
//         </div>
//     )
// }