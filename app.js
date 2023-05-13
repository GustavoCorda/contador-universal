var conteo = 0;
var $mostrar = document.getElementById("mostrar");
$mostrar.innerHTML = conteo.toString();

const hoyContamos = prompt("¿Qué es lo que desearías contar? (por ejemplo: personas, animales, etc)");

function incrementar() {
    conteo = conteo + 1;
    $mostrar.innerHTML = conteo;
  
}
function restar() {
    conteo = conteo - 1;
    $mostrar.innerHTML = conteo;
   
}

  function formatDateTime(datetime) {
    var dateObj = new Date(datetime); // Crea un objeto de fecha a partir de la cadena de fecha y hora
    var day = dateObj.getDate(); // Obtiene el día del mes
    var month = dateObj.getMonth() + 1; // Obtiene el mes (se suma 1 ya que los meses se indexan desde 0)
    var year = dateObj.getFullYear(); // Obtiene el año
    var hours = dateObj.getHours(); // Obtiene las horas
    var minutes = dateObj.getMinutes(); // Obtiene los minutos
    var seconds = dateObj.getSeconds(); // Obtiene los segundos

    // Formatea los componentes de fecha y hora como cadenas de dos dígitos
    var formattedDate = ("0" + day).slice(-2) + "-" + ("0" + month).slice(-2) + "-" + year;
    var formattedTime = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);

    return formattedDate + " " + formattedTime;
  }

  function fetchTime() {
    fetch('http://worldtimeapi.org/api/ip')
      .then(response => response.json())
      .then(data => {
        var datetime = data.datetime;
        var formattedDateTime = formatDateTime(datetime);
  
        document.getElementById("live-time").innerHTML = formattedDateTime;
  
        var currentMinute = new Date(datetime).getMinutes(); // Obtener el minuto actual
  
        // Verificar cada segundo si el minuto ha cambiado
        var checkMinuteInterval = setInterval(function() {
          var newMinute = new Date().getMinutes(); // Obtener el nuevo minuto actual
  
          // Si el minuto ha cambiado, actualizar la hora mostrada en la pantalla
          if (newMinute !== currentMinute) {
            currentMinute = newMinute; // Actualizar el minuto actual
            formattedDateTime = formatDateTime(new Date().getTime()); // Obtener la nueva fecha y hora formateada
            document.getElementById("live-time").innerHTML = formattedDateTime;
          }
        }, 1000); // Verificar cada segundo
  
        // Detener la verificación cuando se cumpla un minuto completo
        var stopCheckMinuteInterval = setTimeout(function() {
          clearInterval(checkMinuteInterval);
        }, (60 - currentMinute) * 1000); // Calcular el tiempo restante hasta el siguiente minuto completo
      })
      .catch(error => {
        console.log('Error al obtener la hora desde WorldTimeAPI:', error);
      });
  }
  
  fetchTime();
  

  var descargado = false;

  function registroTxt() {
    if (!descargado) { // Verificar si el archivo no se ha descargado previamente
      descargado = true; // Establecer la bandera como verdadera antes de la descarga

      
    var registro = conteo;
    var date = new Date();
    var horaTxt = ("0" + date.getHours()).slice(-2);
    var minutosTxt = ("0" + date.getMinutes()).slice(-2);
    var contenido = `Son las ${horaTxt}:${minutosTxt}, la cantidad actual de ${hoyContamos} es ${registro}`;
  
    var blob = new Blob([contenido], { type: "text/plain" });
  
    var enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = URL.createObjectURL(blob);
    enlaceDescarga.download = "archivo.txt";
    enlaceDescarga.click();
    }
  }

  // Función que activa la otra función en intervalos de horas enteras y cada 30 minutos
  function activarFuncionEnIntervalo() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
  
    if ((minutes === 0 || minutes === 30 ) && hours >= 0 && hours <= 30) {
      registroTxt();
      console.log('Ejecutando la función cada 30 minutos...' + hours +":"+ minutes);
    }
  }
  
  // Función que se ejecuta al hacer clic en el botón de inicio
  var estado = true;
  function iniciar() {
    // activa o desactiva la función de activación de intervalos cada minuto
   activarFuncionEnIntervalo();
    estado = !estado;
    
    if (estado === false){ setInterval(activarFuncionEnIntervalo, 60000); // 60000 milisegundos = 1 
      startButton.innerHTML = "Interrumpir";
    } else {
      startButton.innerHTML = "Iniciar";
    }
    
  }
  
  // Agrega un evento de clic al botón para llamar a la función de inicio
  var startButton = document.getElementById('startButton');
  startButton.addEventListener('click', iniciar);
  
  