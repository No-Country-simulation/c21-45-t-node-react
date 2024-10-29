const filtros = [
  {
    imagen: "/perro_vector.png",
    titulo: "ESPECIE",
    filtro: "especie",
    atributos: [
      { display: "Perro", value: "Perro" },
      { display: "Gato", value: "Gato" },
    ],
  },
  {
    imagen: "/genero.png",
    titulo: "GÉNERO",
    filtro: "sexo",
    atributos: [
      { display: "Macho", value: "Macho" },
      { display: "Hembra", value: "Hembra" },
    ],
  },
  {
    imagen: "/gato.png",
    titulo: "EDAD",
    filtro: "edad",
    atributos: [
      { display: "Cachorro", value: "Cachorro" },
      { display: "Adulto", value: "Adulto" },
      { display: "Senior", value: "Senior" },
    ],
  },
  {
    imagen: "/tamaño.png",
    titulo: "TAMAÑO",
    filtro: "tamanio",
    atributos: [
      { display: "Grande", value: "Grande" },
      { display: "Mediano", value: "Mediano" },
      { display: "Pequeño", value: "Pequeño" },
    ],
  },
  {
    imagen: "/localizacion.png",
    titulo: "UBICACIÓN",
    filtro: "ubicacion",
    atributos: [], // Este se llenará dinámicamente
  },
];

export default filtros;
