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
  
  function crearPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
  
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
  
    doc.setFont("times", "normal");
    doc.setTextColor(92, 64, 51);
    doc.setFontSize(16);
    doc.text("Datos del Formulario", 70, 30);
    doc.setDrawColor(121, 85, 72);
    doc.rect(15, 20, 180, 90);
  
    doc.setFontSize(12);
    doc.text(`Nombre: ${nombre}`, 20, 50);
    doc.text(`Correo: ${correo}`, 20, 60);
    doc.text(`Celular: ${telefono}`, 20, 70);
    doc.text(`Dirección: ${direccion}`, 20, 80);
    doc.text(`Cédula: ${cedula}`, 20, 90);
  
    doc.save("datos_formulario.pdf");
  }
  
