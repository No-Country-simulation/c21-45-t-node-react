import './preguntas.css'
import Pregunta from '../../Components/pregunta/pregunta'
const Preguntas = () => {
    return(
        <div className="principal">
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
    )
}


export default Preguntas