import "./CardMascota.css"



function CardMascota({mascota}){


    return(
        <>
        <div className="container-card">
                <figure className="container-img">
                 <img src="/descarga.jpg" alt="" />
                </figure>

                <div className="contenido-card">
                    <p>Nombre</p>
                    <p>Cachorro</p>
                    <p>CABA</p>
                    <p>Macho</p>
                    
                </div>
            </div>
        </>
    )
 
}

export default CardMascota;