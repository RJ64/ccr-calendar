<template>
  <div @click="removeSelectedText" class="ccr-calendario">
    <div class="zonaBarraSuperior">
      Hola mundo!
    </div>
    <div class="zonaBarraLateral">
      <MiniCalendario :primerDiaSemanaMostrando="primerDiaSemanaMostrando" :numDiasMostrando="numDiasMostrando" :mesMostrando="mesMostrando" :hoy="hoy" :yearMostrando="yearMostrando"/>
    </div>
    <div class="zonaPrincipal">
      <CalendarioResumenSemana/>
    </div>
  </div>
</template>

<script>
import MiniCalendario from './components/miniCalendario/MiniCalendario.vue'
import CalendarioResumenSemana from './components/CalendarioResumenSemana.vue'

export default {
  name: 'App',
  components: {
    MiniCalendario,
    CalendarioResumenSemana,
  },
  data() {
      return {
          serverBack: "http://ccr-calendar-back.com",
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
  },
  created() {
    this.yearMostrando = this.hoy.getFullYear();
    this.mesMostrando = this.hoy.getMonth() + 1;
    this.primerDiaSemanaMostrando = new Date(this.hoy.getTime() - (1000 * 60 * 60 * 24));
    /*
      fetch(this.serverBack+'/rest/eventos')
      .then(response => response.json())
      .then(eventos => this.eventos = eventos);*/
  },
}
</script>

<style>
.zonaBarraSuperior {
  float: left;
  width: 100%;
  height: 80px;
}
.zonaBarraLateral {
  float: left;
  width: 250px;
  height: calc(100% - 80px);
  padding-left: 10px;
}
.zonaPrincipal {
  float: left;
  width: calc(100% - 250px);
  height: calc(100% - 80px);
}
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
</style>
