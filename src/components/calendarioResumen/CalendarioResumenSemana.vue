<template>

  <CabeceraResumenSemana 
    :primerDiaSemanaMostrando="primerDiaSemanaMostrando" 
    :numDiasMostrando="numDiasMostrando" 
    :hoy="hoy"/>

  <HorasResumenSemana 
    :primerDiaSemanaMostrando="primerDiaSemanaMostrando" 
    :numDiasMostrando="numDiasMostrando" 
    :hoy="hoy"/>

</template>

<script>
import CabeceraResumenSemana from './CabeceraResumenSemana.vue'
import HorasResumenSemana from './HorasResumenSemana.vue'

export default {
  name: 'CalendarioResumenSemana',
  components: {
    CabeceraResumenSemana,
    HorasResumenSemana,
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
}
</script>