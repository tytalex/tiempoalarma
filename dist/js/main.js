const ALARMFORM = document.querySelector("#alarm-form");
ALARMFORM.addEventListener("submit", (e) => {
  e.preventDefault();
  let min = document.querySelector("#tiempo");
  let btn = document.querySelector('#alarm-btn')
  min.setAttribute('readonly', true);
  min.style.borderColor = "gray";
  btn.setAttribute('disabled', true);
  let segds = parseInt(min.value) * 60;
  let title = "ALARMA";
  let options = {
    body: `Ya han pasado ${min.value} minutos.`,
    icon: "img/favicon.png",
  };
  let bar = document.querySelector('.progress-bar');
  let counter = document.querySelector('#counter');
  let i = 0;
  function notificar(){
    setTimeout(() => {
      // si no soporta notificaciones pongo alerta al respecto
      if (!("Notification" in window)) {
        alert("Este navegador no soporta las notificaciones del sistema");
      }

      // Comprobamos si ya nos habían dado permiso
      else if (Notification.permission === "granted") {
        // Si esta correcto lanzamos la notificación

        var n = new Notification(title, options);
        setTimeout(n.close.bind(n), 50000);
      }

      // Si no, tendremos que pedir permiso al usuario
      else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
          // Si el usuario acepta, lanzamos la notificación
          if (permission === "granted") {
            var n = new Notification(title, options);
            setTimeout(n.close.bind(n), 50000);
          }
        });
      }
    min.removeAttribute('readonly');
    min.style.borderColor = "";
    btn.removeAttribute('disabled');
    counter.innerHTML = 0;
    ALARMFORM.reset();
    min.setAttribute('autofocus', true);
    bar.style.width = "0%";
    }, segds);
  }

  function progress(){

    if (i == segds-1) {
      notificar();
    } else {
      setTimeout(()=>{
        bar.style.width = `${ (i+1)*100/segds }%`;
        i++;
        counter.innerHTML = `${ parseFloat(i) }<small>'s</small>`;
        console.log(i);
        progress();
      }, 1000);
    }
  };

  console.log(`El tiempo elegido son ${segds} milisegundos.`);
  progress();
});
