<template>

  <div 
    class="cabeceraCalendarioResumenSemana"
    :style="{
      'padding-right': paddingCabeceraSiScroll+'px'
    }">

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
  emits: ["cabeceraResumenSemanaMontada"],
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
    paddingCabeceraSiScroll: {
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
  },
  mounted() {
      this.$emit("cabeceraResumenSemanaMontada");
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
}
.cabeceraCalendarioResumenSemana::after {
  -moz-box-shadow: inset 0 1px 1px 0 rgba(0,0,0,.14),inset 0 2px 1px -1px rgba(0,0,0,.12);
  box-shadow: inset 0 1px 1px 0 rgba(0,0,0,.14),inset 0 2px 1px -1px rgba(0,0,0,.12);
  content: "";
  height: 4px;
  position: absolute;
  width: 100%;
  z-index: 505;
  left: 0;
  bottom: -4px;
}
.cabeceraCalendarioResumenSemana.scroll {
  padding-right: 12px;
}
</style>
