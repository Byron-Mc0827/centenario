function validarCedulaEcuatoriana(cedula) {
    if (cedula.length !== 10 || isNaN(cedula)) return false;
  
    const digitos = cedula.split('').map(Number);
    const provincia = parseInt(cedula.substring(0, 2), 10);
    const tercerDigito = digitos[2];
  
    if (provincia < 1 || provincia > 24 || tercerDigito >= 6) return false;
  
    let suma = 0;
    for (let i = 0; i < 9; i++) {
      let valor = digitos[i];
      if (i % 2 === 0) {
        valor *= 2;
        if (valor > 9) valor -= 9;
      }
      suma += valor;
    }
  
    const digitoVerificador = (10 - (suma % 10)) % 10;
  
    return digitoVerificador === digitos[9];
  }
  async function crearPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Cargar imagen de fondo
  const backgroundImage = await loadImageToBase64(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Primer_Escudo_de_Barcelona_Sporting_Club_de_1925.jpg/500px-Primer_Escudo_de_Barcelona_Sporting_Club_de_1925.jpg'
  );

  // Obtener datos del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const cedula = document.getElementById("cedula").value.trim();

  // Validaciones
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
    alert("El nombre solo debe contener letras y espacios.");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(correo)) {
    alert("Correo electrónico no válido.");
    return;
  }

  if (!/^\d{10}$/.test(telefono)) {
    alert("El número de celular debe tener exactamente 10 dígitos.");
    return;
  }

  if (!validarCedulaEcuatoriana(cedula)) {
    alert("Cédula no válida. Verifica los 10 números.");
    return;
  }

  // Insertar imagen como fondo (tipo marca de agua)
  doc.addImage(
    backgroundImage,
    'JPEG',
    50, // x
    60, // y
    100, // width
    100, // height
    undefined,
    'FAST'
  );

  // Contenido del PDF
  doc.setFont("times", "normal");
  doc.setTextColor(92, 64, 51);
  doc.setFontSize(16);
  doc.text("Datos Centenario", 70, 30);
  doc.setDrawColor(121, 85, 72);
  doc.rect(15, 20, 180, 90);

  doc.setFontSize(12);
  doc.text(`Nombre: ${nombre}`, 20, 50);
  doc.text(`Correo: ${correo}`, 20, 60);
  doc.text(`Celular: ${telefono}`, 20, 70);
  doc.text(`Dirección: ${direccion}`, 20, 80);
  doc.text(`Cédula: ${cedula}`, 20, 90);

  doc.save("datos_centenarios.pdf");
}

// Cargar imagen y convertirla a base64
async function loadImageToBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
 
  
