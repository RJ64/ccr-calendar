<template>

  <div class="cabeceraCalendarioResumenSemana">

    <DiasCabeceraResumenSemana 
      :primerDiaSemanaMostrando="primerDiaSemanaMostrando" 
      :numDiasMostrando="numDiasMostrando" 
      :hoy="hoy"/>

    <EventosDiaCompletoCabeceraResumenSemana 
      :primerDiaSemanaMostrando="primerDiaSemanaMostrando" 
      :numDiasMostrando="numDiasMostrando"
      :hoy="hoy"/>

  </div>

</template>

<script>
import DiasCabeceraResumenSemana from './DiasCabeceraResumenSemana.vue'
import EventosDiaCompletoCabeceraResumenSemana from './EventosDiaCompletoCabeceraResumenSemana.vue'

export default {
  name: 'CabeceraResumenSemana',
  components: {
    DiasCabeceraResumenSemana,
    EventosDiaCompletoCabeceraResumenSemana,
  },
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
  methods: {
    zonaHoraria() {
      let cambioHorario = this.hoy.getTimezoneOffset() / 60;
      let signo = cambioHorario > 0 ? '-' : '+';
      return 'GMT' + signo + Math.abs(cambioHorario);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cabeceraCalendarioResumenSemana {
  float: left;
  width: 100%;
  height: 100px;
  position: relative;
  padding-right: 12px;
}
.cabeceraCalendarioResumenSemana::after {
  -moz-box-shadow: inset 0 1px 1px 0 rgba(0,0,0,.14),inset 0 2px 1px -1px rgba(0,0,0,.12);
  box-shadow: inset 0 1px 1px 0 rgba(0,0,0,.14),inset 0 2px 1px -1px rgba(0,0,0,.12);
  content: "";
  height: 4px;
  position: absolute;
  width: calc(100% - 16px);
  z-index: 505;
  left: 0;
  bottom: -4px;
}

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
  right: 3px;
  bottom: 1px;
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
</style>
