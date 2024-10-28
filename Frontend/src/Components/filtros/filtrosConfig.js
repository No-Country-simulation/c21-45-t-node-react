const filtros = [
  {
    imagen: "/perro_vector.png",
    titulo: "ESPECIE",
    filtro: "especie",
    atributos: ["Perro", "Gato"],
  },
  { imagen: "/genero.png", titulo: "GÉNERO", filtro: "sexo", atributos: ["Macho", "Hembra"] },
  {
    imagen: "/gato.png",
    titulo: "EDAD",
    filtro: "edad",
    atributos: ["Cachorro", "Adulto", "Senior"],
  },
  {
    imagen: "/tamaño.png",
    titulo: "TAMAÑO",
    filtro: "tamanio",
    atributos: ["Grande", "Mediano", "Pequeño"],
  },
  {
    imagen: "/localizacion.png",
    titulo: "UBICACIÓN",
    filtro: "ubicacion",
    atributos: ["Argentina", "Uruguay", "México"],
  },
];

export default filtros;
