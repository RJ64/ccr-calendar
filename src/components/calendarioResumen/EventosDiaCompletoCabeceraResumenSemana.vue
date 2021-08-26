<template>

  <div class="zonaEventosDiariosCabeceraCalendarioResumenSemana">

    <div class="lateralZonaHorariaCabecera">
      <div class="zonaHoraria">{{ zonaHoraria() }}</div>
    </div>

    <div class="zonaEventosDiarios">
      <div 
      :style="{'width': 'calc(100% / '+numDiasMostrando+')'}" 
      v-for="numColumnaDiaPintando in numDiasMostrando" 
      :key="numColumnaDiaPintando" 
      :class="{
        'eventosDiariosColumnaSemana' : true, 
        'esFinde' : esFinde(diaColumnaMostrando(numColumnaDiaPintando)), 
      }">
      </div>
    </div>

  </div>

</template>

<script>
import shared from './../../shared.js'

export default {
  name: 'EventosDiaCompletoCabeceraResumenSemana',
  props: {
    primerDiaSemanaMostrando: {
      type: Date,
      required: true,
    },
    hoy: {
      type: Date,
      required: true,
    },
    numDiasMostrando: {
      type: Number,
      required: true,
    },
  },
  methods: {
    zonaHoraria() {
      let cambioHorario = this.hoy.getTimezoneOffset() / 60;
      let signo = cambioHorario > 0 ? '-' : '+';
      return 'GMT' + signo + Math.abs(cambioHorario);
    },
    diaColumnaMostrando(numColumnaDiaPintando) {
      return shared.diaColumnaMostrando(this.primerDiaSemanaMostrando, numColumnaDiaPintando);
    },
    esFinde(dia) {
      return dia.getDay() === 0 || dia.getDay() === 6
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.zonaEventosDiariosCabeceraCalendarioResumenSemana {
  float: left;
  width: 100%;
  height: 20px;
}
.lateralZonaHorariaCabecera {
  float: left;
  width: 50px;
  height: 100%;
  position: relative;
}
.zonaHoraria {
  font-size: 10px;
  position: absolute;
  right: 7px;
  top: 0;
}
.zonaEventosDiarios {
  float: left;
  width: calc(100% - 50px);
  height: 100%;
}
.eventosDiariosColumnaSemana {
  float: left;
  height: 100%;
  border-left: 1px solid #b7b7b7;
}
.eventosDiariosColumnaSemana.esFinde {
  background-color: #dbdbdb;
}
</style>
