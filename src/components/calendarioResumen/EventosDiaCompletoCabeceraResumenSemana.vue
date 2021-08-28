<template>

  <div class="zonaEventosDiariosCabeceraCalendarioResumenSemana">

    <div class="lateralZonaHorariaCabecera">
      <div class="zonaHoraria">{{ zonaHoraria() }}</div>
    </div>

    <div class="zonaEventosDiarios">
      <div 
      :style="{'width': 'calc(100% / '+datesColumnasMostrando.length+')'}" 
      v-for="dateColumnaMostrando in datesColumnasMostrando" 
      :key="dateColumnaMostrando.getTime()" 
      :class="{
        'eventosDiariosColumnaSemana' : true, 
        'esFinde' : esFinde(dateColumnaMostrando), 
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
    datesColumnasMostrando: {
      type: Array,
      required: true,
    },
    hoy: {
      type: Date,
      required: true,
    },
  },
  methods: {
    zonaHoraria() {
      let cambioHorario = this.hoy.getTimezoneOffset() / 60;
      let signo = cambioHorario > 0 ? '-' : '+';
      return 'GMT' + signo + Math.abs(cambioHorario);
    },
    esFinde(date) {
      return shared.esFinde(date)
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
