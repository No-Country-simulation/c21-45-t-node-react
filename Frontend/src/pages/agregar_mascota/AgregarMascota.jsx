import React, { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AgregarMascota.css";
import { UserContext } from "../../context/UserContext";

// Enum para el tipo de mascota
const TipoMascota = Object.freeze({
  PERRO: "Perro",
  GATO: "Gato",
});

// Enum para el sexo de la mascota
const SexoMascota = Object.freeze({
  MACHO: "Macho",
  HEMBRA: "Hembra",
});

// Enum para el tamaño de la mascota
const TamañoMascota = Object.freeze({
  PEQUEÑO: "Pequeño",
  MEDIANO: "Mediano",
  GRANDE: "Grande",
});

// Enum positivo/negativo
const PositivoNegativo = Object.freeze({
  SI: "Si",
  NO: "No",
});

const AgregarMascota = ({ addPet }) => {
  const { user } = useContext(UserContext);
  const PK_Usuario = user ? user.payload.PK_Usuario : null;

  // Estados para los campos del formulario
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [race, setRace] = useState("");
  const [sex, setSex] = useState("");
  const [size, setSize] = useState("");
  const [birth, setBirth] = useState("");
  const [cas, setCas] = useState("");
  const [vac, setVac] = useState("");
  const [amn, setAmn] = useState("");
  const [amp, setAmp] = useState("");
  const [amg, setAmg] = useState("");
  const [enf, setEnf] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState([]);
  const [previewImages, setPreviewImages] = useState([]); // URLs temporales para previsualización

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImage(files);

    // Crear las URLs para previsualización
    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewURLs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const convertToBinary = (value) => (value === "Si" ? 1 : 0);

      const formData = new FormData();
      formData.append("nombre", name);
      formData.append("especie", type);
      formData.append("raza", race);
      formData.append("sexo", sex);
      formData.append("tamanio", size);
      formData.append("fecha_nacimiento", birth);
      formData.append("castrado", convertToBinary(cas));
      formData.append("vacunado", convertToBinary(vac));
      formData.append("amigable_ninos", convertToBinary(amn));
      formData.append("amigable_perros", convertToBinary(amp));
      formData.append("amigable_gatos", convertToBinary(amg));
      formData.append("enfermedades", enf);
      formData.append("detalle", details);
      formData.append("FK_Usuario", PK_Usuario);

      // Añadir imágenes al FormData
      image.forEach((image) => {
        formData.append("mascotaImages", image); // Debe coincidir con lo que espera Multer
      });
      console.log("formData antes de enviar:", [...formData.entries()]); // Debugging

      try {
        const response = await axios.post("http://localhost:3000/api/mascota", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Respuesta de la API:", response.data); // Debugging

        if (response.data.success) {
          Swal.fire({
            title: "Éxito",
            text: "Mascota agregada con éxito",
            icon: "success",
          });
          // Limpiar los estados después de agregar la mascota
          setName("");
          setType("");
          setRace("");
          setSex("");
          setSize("");
          setBirth("");
          setCas("");
          setVac("");
          setAmn("");
          setAmp("");
          setAmg("");
          setEnf("");
          setDetails("");
          setImage([]);
          setPreviewImages([]); // Limpiar la previsualización
        }
      } catch (error) {
        console.error("Error al agregar la mascota:", error.response || error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al agregar la mascota",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Advertencia",
        text: "Debe iniciar sesión",
        icon: "warning",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container--agregarMascotas">
      <h2 className="container--agregarMascotas-title">Ingresa los datos de tu mascota</h2>
      <input
        className="info--agregarMascotas"
        type="text"
        placeholder="Nombre de la mascota"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select className="info--agregarMascotas" value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="">Selecciona si tu mascota es perro o gato</option>
        <option value={TipoMascota.PERRO}>{TipoMascota.PERRO}</option>
        <option value={TipoMascota.GATO}>{TipoMascota.GATO}</option>
      </select>
      <input className="info--agregarMascotas" type="text" placeholder="Raza" value={race} onChange={(e) => setRace(e.target.value)} required />
      <select className="info--agregarMascotas" value={sex} onChange={(e) => setSex(e.target.value)} required>
        <option value="">Selecciona si tu mascota es hembra o macho</option>
        <option value={SexoMascota.MACHO}>{SexoMascota.MACHO}</option>
        <option value={SexoMascota.HEMBRA}>{SexoMascota.HEMBRA}</option>
      </select>
      <select className="info--agregarMascotas" value={size} onChange={(e) => setSize(e.target.value)} required>
        <option value="">Selecciona el tamaño de tu mascota</option>
        <option value={TamañoMascota.PEQUEÑO}>{TamañoMascota.PEQUEÑO}</option>
        <option value={TamañoMascota.MEDIANO}>{TamañoMascota.MEDIANO}</option>
        <option value={TamañoMascota.GRANDE}>{TamañoMascota.GRANDE}</option>
      </select>
      <label className="info--agregarMascotas">Fecha de nacimiento:</label>
      <input className="info--agregarMascotas" type="date" value={birth} onChange={(e) => setBirth(e.target.value)} required />
      <select className="info--agregarMascotas" value={cas} onChange={(e) => setCas(e.target.value)} required>
        <option value="">¿Tu mascota está esterilizada/castrada?</option>
        <option value={PositivoNegativo.SI}>{PositivoNegativo.SI}</option>
        <option value={PositivoNegativo.NO}>{PositivoNegativo.NO}</option>
      </select>
      <select className="info--agregarMascotas" value={vac} onChange={(e) => setVac(e.target.value)} required>
        <option value="">¿Tu mascota está vacunada?</option>
        <option value={PositivoNegativo.SI}>{PositivoNegativo.SI}</option>
        <option value={PositivoNegativo.NO}>{PositivoNegativo.NO}</option>
      </select>
      <select className="info--agregarMascotas" value={amn} onChange={(e) => setAmn(e.target.value)} required>
        <option value="">¿Tu mascota es amigable con niños?</option>
        <option value={PositivoNegativo.SI}>{PositivoNegativo.SI}</option>
        <option value={PositivoNegativo.NO}>{PositivoNegativo.NO}</option>
      </select>
      <select className="info--agregarMascotas" value={amp} onChange={(e) => setAmp(e.target.value)} required>
        <option value="">¿Tu mascota es amigable con perros?</option>
        <option value={PositivoNegativo.SI}>{PositivoNegativo.SI}</option>
        <option value={PositivoNegativo.NO}>{PositivoNegativo.NO}</option>
      </select>
      <select className="info--agregarMascotas" value={amg} onChange={(e) => setAmg(e.target.value)} required>
        <option value="">¿Tu mascota es amigable con gatos?</option>
        <option value={PositivoNegativo.SI}>{PositivoNegativo.SI}</option>
        <option value={PositivoNegativo.NO}>{PositivoNegativo.NO}</option>
      </select>
      <input className="info--agregarMascotas" type="text" placeholder="Enfermedades" value={enf} onChange={(e) => setEnf(e.target.value)} required />
      <textarea
        className="info--agregarMascotas, textarea"
        type="text"
        placeholder="Detalles"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        required
      />
      <label htmlFor="file-upload" className="file-label-btn">
        Agregar Imágenes
      </label>
      <input id="file-upload" className="info--agregarMascotas-btn" type="file" accept="image/*" multiple onChange={handleImageChange} required />

      {/* Mostrar previsualización de las imágenes seleccionadas */}
      <div className="image-preview">
        {previewImages.map((img, index) => (
          <img key={index} src={img} alt={`preview ${index}`} />
        ))}
      </div>
      <button className="button-agregarMascotas" type="submit">
        Agregar mascota
      </button>
    </form>
  );
};

export default AgregarMascota;
