import './preguntas.css'
import Pregunta from '../../Components/pregunta/pregunta'
const Preguntas = () => {
    return(
        <div className="container">
        <div className="preguntas-left">
            <h1>Preguntas frecuentes</h1>
            <h2>¿Tienes Preguntas? Nosotros Tenemos Respuestas</h2>
            <Pregunta 
        pregunta="¿Cómo puedo registrar una mascota en la plataforma?" 
        respuesta="Solo necesitas llenar el formulario de registro con la información de la mascota y subir una foto. ¡Es rápido y sencillo!" 
        icono={'/flecha.png'}
        />
                  <Pregunta 
        pregunta="¿Qué beneficios tiene adoptar a través de la plataforma?" 
        respuesta="Ofrecemos una base de datos amplia de mascotas que necesitan un hogar, además de proporcionar información detallada sobre su comportamiento, salud y necesidades especiales." 
        />            <Pregunta 
        pregunta="¿Cómo puedo filtrar mascotas según mis preferencias?" 
        respuesta="Puedes utilizar los filtros por especie, tamaño, edad, y más, para encontrar la mascota ideal para ti y tu familia." 
        />            <Pregunta 
        pregunta="¿Qué debo tener en cuenta antes de adoptar una mascota?" 
        respuesta="Debes considerar el espacio, tiempo, y recursos necesarios para cuidar a la mascota. También, asegúrate de elegir una mascota que se adapte a tu estilo de vida." 
        />            <Pregunta 
        pregunta="¿Cómo me comunico con un refugio o adoptante?" 
        respuesta="Debes llenar el formulario de solicitud de adopción disponible en la plataforma. Una vez enviado, el refugio se pondrá en contacto contigo para continuar con el proceso." 
        />            <Pregunta 
        pregunta="¿Es necesario castrar o vacunar a mi mascota antes de registrarla?" 
        respuesta="Aunque no es obligatorio, recomendamos que todas las mascotas estén castradas y vacunadas para asegurar su bienestar y el de los demás." 
        />
        </div>
        <div className="image-right">
            <img src="/preguntas_perro.png" alt="" srcset="" />
        </div>
        </div>
    )
}


export default Preguntas