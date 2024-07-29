export const validarRut = (rut) => {
    const regex = /^(\d{1,2}\.?\d{3}\.?\d{3})-?([\dkK])$/;
  
    if (!regex.test(rut)) {
      return false;
    }
  
    rut = rut.replace(/\./g, '').replace(/-/g, '');
  
    const rutDigits = rut.slice(0, -1);
    const verificador = rut.slice(-1).toLowerCase();
  
    let suma = 0;
    let multiplo = 2;
  
    for (let i = rutDigits.length - 1; i >= 0; i--) {
      suma += rutDigits.charAt(i) * multiplo;
      if (multiplo < 7) {
        multiplo += 1;
      } else {
        multiplo = 2;
      }
    }
  
    const dvEsperado = 11 - (suma % 11);
  
    const dv = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'k' : dvEsperado.toString();
    return dv === verificador;
  };
  