// Validación y envío de formulario
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearFieldError);
    });
  }
});

// Validar campo individual
function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  const fieldName = field.getAttribute('name');
  let isValid = true;
  let errorMessage = '';
  
  // Validaciones según el tipo de campo
  switch(fieldName) {
    case 'name':
      if (value.length < 2) {
        isValid = false;
        errorMessage = 'El nombre debe tener al menos 2 caracteres';
      }
      break;
      
    case 'email':
      if (!isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Por favor ingresa un email válido';
      }
      break;
      
    case 'subject':
      if (value.length < 5) {
        isValid = false;
        errorMessage = 'El asunto debe tener al menos 5 caracteres';
      }
      break;
      
    case 'message':
      if (value.length < 10) {
        isValid = false;
        errorMessage = 'El mensaje debe tener al menos 10 caracteres';
      }
      break;
  }
  
  // Mostrar u ocultar error
  if (!isValid) {
    showFieldError(field, errorMessage);
  } else {
    clearFieldError({ target: field });
  }
  
  return isValid;
}

// Validar email con expresión regular
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Mostrar error en campo
function showFieldError(field, message) {
  clearFieldError({ target: field });
  
  field.classList.add('error');
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  errorDiv.setAttribute('role', 'alert');
  
  field.parentNode.appendChild(errorDiv);
}

// Limpiar error de campo
function clearFieldError(e) {
  const field = e.target;
  const errorDiv = field.parentNode.querySelector('.field-error');
  
  if (errorDiv) {
    errorDiv.remove();
  }
  
  field.classList.remove('error');
}

// Manejar envío del formulario
function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());
  
  // Validar todos los campos
  let isFormValid = true;
  const fields = form.querySelectorAll('input, textarea');
  
  fields.forEach(field => {
    const event = new Event('blur');
    field.dispatchEvent(event);
    
    if (field.classList.contains('error')) {
      isFormValid = false;
    }
  });
  
  // Si el formulario es válido, enviar
  if (isFormValid) {
    sendFormData(formObject);
  } else {
    showToast('Por favor corrige los errores en el formulario', 'error');
  }
}

// Enviar datos del formulario (simulado)
function sendFormData(data) {
  // Simular envío a un endpoint
  showToast('Enviando mensaje...');
  
  // Simular retraso de red
  setTimeout(() => {
    // Este es un endpoint simulado - en producción reemplazar con endpoint real
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error en el servidor');
    })
    .then(result => {
      showToast('Mensaje enviado con éxito. ¡Te contactaré pronto!', 'success');
      document.getElementById('contact-form').reset();
    })
    .catch(error => {
      console.error('Error:', error);
      showToast('Error al enviar el mensaje. Por favor inténtalo de nuevo.', 'error');
    });
  }, 1500);
}

// Mostrar notificación toast
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  
  if (toast) {
    toast.textContent = message;
    toast.className = 'toast show';
    
    if (type === 'error') {
      toast.classList.add('error');
    } else {
      toast.classList.remove('error');
    }
    
    // Ocultar después de 4 segundos
    setTimeout(() => {
      toast.className = 'toast';
    }, 4000);
  }
}