import './preguntas.css'
import Pregunta from '../../Components/pregunta/pregunta'
const Preguntas = () => {
    return(
        <div className="container">
        <div className="preguntas-left">
            <h1>Preguntas frecuentes</h1>
            <h2>¿Tienes Preguntas? Nosotros Tenemos Respuestas</h2>
            <Pregunta 
        pregunta="¿Porque es importante registrar a mi mascota?" 
        respuesta="Porque se debe de manter un control." 
        icono={'/flecha.png'}
        />
                  <Pregunta 
        pregunta="¿Porque es importante registrar a mi mascota?" 
        respuesta="Porque se debe de manter un control." 
        />            <Pregunta 
        pregunta="¿Porque es importante registrar a mi mascota?" 
        respuesta="Porque se debe de manter un control." 
        />            <Pregunta 
        pregunta="¿Porque es importante registrar a mi mascota?" 
        respuesta="Porque se debe de manter un control." 
        />            <Pregunta 
        pregunta="¿Porque es importante registrar a mi mascota?" 
        respuesta="Porque se debe de manter un control." 
        />            <Pregunta 
        pregunta="¿Porque es importante registrar a mi mascota?" 
        respuesta="Porque se debe de manter un control." 
        />
        </div>
        <div className="image-right">
            <img src="/preguntas_perro.png" alt="" srcset="" />
        </div>
        </div>
    )
}


export default Preguntas