<template>

  <div class="zonaPrincipalCalendarioResumenSemana">

      <div class="lateralZonaHoraria">
        <div v-for="horaPintando in 24" :key="horaPintando" class="filaHora">
          <div v-if="horaPintando > 1" class="semilinea"></div>
          <div v-if="horaPintando < 24" class="hora">{{ horaPintando }}:00</div>
        </div>
      </div>

      <div class="zonaPrincipalEventos">
        <div 
          :style="{
            'width': 'calc(100% / '+numDiasMostrando+')'
          }" 
          v-for="numColumnaDiaPintando in numDiasMostrando" 
          :key="numColumnaDiaPintando" 
          :class="{
            'columnaDiaEventos' : true, 
            'esFinde' : esFinde(diaColumnaMostrando(numColumnaDiaPintando)), 
          }">

          <div v-for="horaPintando in 24" :key="horaPintando" class="filaHoraEventos"></div>
          
          <div class="zonaLineaAhora" :style="{'top': topZonaLineaAhora+'px'}" v-if="mismoDia(diaColumnaMostrando(numColumnaDiaPintando), hoy)">
            <div class="bolaAhora"></div>
            <div class="lineaAhora"></div>
          </div>

        </div>
      </div>

  </div>

</template>

<script>
import shared from './../../shared.js'

export default {
  name: 'HorasResumenSemana',
  props: {
    primerDiaSemanaMostrando: {
      type: Date,
      required: true,
    },
    numDiasMostrando: {
      type: Number,
      required: true,
    },
    hoy: {
      type: Date,
      required: true,
    },
  },
  data() {
      return {
          alturaHora: 0,
      };
  },
  computed: {
    topZonaLineaAhora() {
      return ((this.alturaHora * this.hoy.getHours()) + ((this.alturaHora * this.hoy.getMinutes()) / 60));
    },
  },
  methods: {
    mismoDia(dia1, dia2) {
      return dia1.getDate() === dia2.getDate() && this.mismoMes(dia1, dia2);
    },
    mismoMes(dia1, dia2) {
      return dia1.getMonth() === dia2.getMonth() && dia1.getFullYear() === dia2.getFullYear();
    },
    diaColumnaMostrando(numColumnaDiaPintando) {
      return shared.diaColumnaMostrando(this.primerDiaSemanaMostrando, numColumnaDiaPintando);
    },
    esFinde(dia) {
      return shared.esFinde(dia);
    },
    cambioSizeVentana() {
      this.actualizarAlturaHora();
    },
    actualizarAlturaHora() {
      this.alturaHora = document.querySelector('.filaHoraEventos').offsetHeight;
    },
  },
  mounted() {
    this.cambioSizeVentana();
  },
  created() {
    window.addEventListener("resize", this.cambioSizeVentana);
  },
  unmounted() {
    window.removeEventListener("resize", this.cambioSizeVentana);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.zonaPrincipalCalendarioResumenSemana {
  float: left;
  width: 100%;
  height: calc(100% - 100px);
  overflow: auto;
}
.lateralZonaHoraria {
  float: left;
  width: 50px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.filaHora {
  float: left;
  width: 100%;
  position: relative;
  flex: 1;
  min-height: 30px;
}
.filaHora .semilinea {
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;
  border-bottom: 1px solid #b7b7b7;
}
.filaHora .hora {
  position: absolute;
  font-size: 11px;
  text-align: right;
  width: 30px;
  bottom: -7px;
  right: 13px;
}
.zonaPrincipalEventos {
  float: left;
  width: calc(100% - 50px);
  height: 100%;
}
.columnaDiaEventos {
  float: left;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.columnaDiaEventos.esFinde {
  background-color: #dbdbdb;
}
.zonaLineaAhora {
  position: absolute;
  width: 100%;
}
.bolaAhora {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: red;
  left: -5px;
  top: -3px;
}
.lineaAhora {
  float: left;
  width: 100%;
  border-bottom: 3px solid red;
}
.filaHoraEventos {
  float: left;
  width: 100%;
  border-left: 1px solid #b7b7b7;
  border-top: 1px solid #b7b7b7;
  flex: 1;
  min-height: 30px;
}
.filaHoraEventos:first-child {
  border-top: none;
  padding-top: 1px;
}
</style>
