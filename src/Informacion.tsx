// 📁 src/Informacion.tsx

function Informacion() {
  const nombre = "Jean Mora";
  const curso = "Desarrollo de Software";
  const paralelo = "A";
  const edad = 15;

  // Condicional simple
  const esMayor = edad >= 18;

  return (
    <div>
      <h2>Información del Estudiante</h2>
      <p>Nombre: {nombre}</p>
      <p>Curso: {curso}</p>
      <p>Paralelo: {paralelo}</p>
      <p>Edad: {edad}</p>

      <p style={{ color: esMayor ? "green" : "red" }}>
        {esMayor ? "Eres mayor de edad " : "Eres menor de edad "}
      </p>
    </div>
  );
}

export default Informacion;
