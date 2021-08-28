<template>
  <div @click="removeSelectedText" class="ccr-calendario">
    <div class="zonaBarraSuperior">
      <Cabecera @semanaAnterior="semanaAnterior" @semanaSiguiente="semanaSiguiente" @irAHoy="irAHoy" :primerDiaSemanaMostrando="primerDiaSemanaMostrando" :numDiasMostrando="numDiasMostrando" :hoy="hoy"/>
    </div>
    <div class="zonaBarraLateral">
      <MiniCalendario @irADia="irADia" :primerDiaSemanaMostrando="primerDiaSemanaMostrando" :numDiasMostrando="numDiasMostrando" :mesMostrando="mesMostrando" :hoy="hoy" :yearMostrando="yearMostrando"/>
    </div>
    <div class="zonaPrincipal">
      <CalendarioResumenSemana :primerDiaSemanaMostrando="primerDiaSemanaMostrando" :numDiasMostrando="numDiasMostrando" :hoy="hoy" :eventos="eventos"/>
    </div>
  </div>
</template>

<script>
import shared from './shared.js'
import MiniCalendario from './components/miniCalendario/MiniCalendario.vue'
import CalendarioResumenSemana from './components/calendarioResumen/CalendarioResumenSemana.vue'
import Cabecera from './components/cabecera/Cabecera.vue'

export default {
  name: 'App',
  components: {
    Cabecera,
    MiniCalendario,
    CalendarioResumenSemana,
  },
  data() {
      return {
          serverBack: "http://localhost/ccr-calendar-back/www",
          numDiasMostrando: 7,
          hoy: new Date(),
          mesMostrando: null,
          yearMostrando: null,
          primerDiaSemanaMostrando: null,
          calendarios: [],
          eventos: [],
      };
  },
  methods: {
    eventoNoEsDiaCompleto(evento) {
        return shared.containsKey(evento.fechaEvento, 'inicio');
    },
    semanaAnterior() {
      this.primerDiaSemanaMostrando = new Date(this.primerDiaSemanaMostrando.getTime() - (1000 * 60 * 60 * 24));
    },
    semanaSiguiente() {
      this.primerDiaSemanaMostrando = new Date(this.primerDiaSemanaMostrando.getTime() + (1000 * 60 * 60 * 24));
    },
    irAHoy() {
      this.primerDiaSemanaMostrando = new Date(this.hoy.getTime());
    },
    irADia(dia) {
      this.primerDiaSemanaMostrando = new Date(dia.getTime());
    },
    removeSelectedText() {
      if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
          window.getSelection().removeAllRanges();
        }
      } else if (document.selection) {  // IE?
        document.selection.empty();
      }
    },
    nombreMesCabecera() {
      let ultimoDiaViendoEnSemana = new Date(this.primerDiaSemanaMostrando.getTime() + (1000 * 60 * 60 * 24 * (this.numDiasMostrando - 1)));
      if (this.primerDiaSemanaMostrando.getMonth() === ultimoDiaViendoEnSemana.getMonth()) {
        return this.nombreMesCompleto(this.primerDiaSemanaMostrando.getMonth());
      }
      return this.nombreMesCompleto(this.primerDiaSemanaMostrando.getMonth()) + ' - ' + this.nombreMesCompleto(ultimoDiaViendoEnSemana.getMonth());
    },
    nombreMesCompleto(mes) {
      switch(mes) {
        case 0: return 'Enero';
        case 1: return 'Febrero';
        case 2: return 'Marzo';
        case 3: return 'Abril';
        case 4: return 'Mayo';
        case 5: return 'Junio';
        case 6: return 'Julio';
        case 7: return 'Agosto';
        case 8: return 'Septiembre';
        case 9: return 'Octubre';
        case 10: return 'Noviembre';
        case 11: return 'Diciembre';
      }
    },
    convertirEventosAHoraLocal(eventos) {

      for (let i = 0; i < eventos.length; i++) {
        let evento = eventos[i];

        if (this.eventoNoEsDiaCompleto(evento)) {

          let dateInicio = this.objectDatosDiaADate(evento.fechaEvento.inicio);
          let dateInicioLocal = new Date(dateInicio.getTime() + (this.difZonaHorariaEnMilisegundos()));
          eventos[i].fechaEvento.inicio = {
            year : dateInicioLocal.getFullYear(),
            mes : dateInicioLocal.getMonth(),
            dia : dateInicioLocal.getDate(),
            minuto : dateInicioLocal.getMinutes(),
            hora : dateInicioLocal.getHours(),
          };
          
          let dateFin = this.objectDatosDiaADate(evento.fechaEvento.fin);
          let dateFinLocal = new Date(dateFin.getTime() + (this.difZonaHorariaEnMilisegundos()));
          eventos[i].fechaEvento.fin = {
            year : dateFinLocal.getFullYear(),
            mes : dateFinLocal.getMonth(),
            dia : dateFinLocal.getDate(),
            minuto : dateFinLocal.getMinutes(),
            hora : dateFinLocal.getHours(),
          };
          
        }

      }

      return eventos;

    },
    procesarEventosRecibidos(eventos) {
      eventos = this.convertirEventosAHoraLocal(eventos);
      return eventos;
    },
    objectDatosDiaADate(objectDatosDia) {
      return new Date(objectDatosDia.year, objectDatosDia.mes, objectDatosDia.dia, objectDatosDia.hora, objectDatosDia.minuto);
    },
    difZonaHorariaEnMilisegundos() {
      return this.hoy.getTimezoneOffset() * 60 * 1000 * -1;
    },
    containsKey(obj, key) {
        return Object.keys(obj).includes(key);
    },
    cadaMinuto() {
      this.hoy = new Date();
      this.cargarEventos()
    },
    cargarEventos() {

      let desde = shared.dosDigitos(this.primerDiaSemanaMostrando.getDate())+''+shared.dosDigitos(this.primerDiaSemanaMostrando.getMonth() + 1)+''+this.primerDiaSemanaMostrando.getFullYear();
      let dateHasta = new Date(this.primerDiaSemanaMostrando.getFullYear(), this.primerDiaSemanaMostrando.getMonth(), this.primerDiaSemanaMostrando.getDate() + this.numDiasMostrando - 1);
      let hasta = shared.dosDigitos(dateHasta.getDate())+''+shared.dosDigitos(dateHasta.getMonth() + 1)+''+dateHasta.getFullYear();

      fetch(this.serverBack+'/rest/eventos?desde='+desde+'&hasta='+hasta)
        .then(response => response.json())
        .then((eventos) => {
          // Comprobar si hay cambios antes de actualizar la variable
          this.eventos = this.procesarEventosRecibidos(eventos)
        });

    },
  },
  created() {

    this.yearMostrando = this.hoy.getFullYear();
    this.mesMostrando = this.hoy.getMonth() + 1;
    this.primerDiaSemanaMostrando = new Date(this.hoy.getTime());

    this.cargarEventos();
    
    setTimeout(() => {
      setInterval(() => {
        this.cadaMinuto();
      }, (1000 * 60));
      this.cadaMinuto();
    }, (60 - new Date().getSeconds()) * 1000);
    
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
*:before, *:after {
    box-sizing: border-box;
}
*:before, *:after {
    box-sizing: border-box;
}
* {
    box-sizing: border-box;
}
*:focus {
    outline: none;
}
html {
    min-height: 100%;
    width: 100%;
}
body {
    font: 18px Montserrat;
    margin: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: #fff;
}
ul, li {
    list-style-type: none;
}
a {
    text-decoration: none;
}
.zonaBarraSuperior {
  float: left;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #d0d0d0;
}
.zonaBarraLateral {
  float: left;
  width: 250px;
  height: calc(100% - 60px);
  padding: 80px 10px 0;
}
.zonaPrincipal {
  float: left;
  width: calc(100% - 250px);
  height: calc(100% - 60px);
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
