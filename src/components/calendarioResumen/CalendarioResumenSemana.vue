<template>

  <CabeceraResumenSemana 
    :primerDiaSemanaMostrando="primerDiaSemanaMostrando" 
    :numDiasMostrando="numDiasMostrando" 
    :hoy="hoy"
    :paddingCabeceraSiScroll="paddingCabeceraSiScroll"
    @cabeceraResumenSemanaMontada="cabeceraResumenSemanaMontada"/>

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
  data() {
      return {
          paddingCabeceraSiScroll: 0,
      };
  },
  methods: {
    cambioSizeVentana() {
      this.actualizarPaddingCabeceraSiScrollPresente();
    },
    actualizarPaddingCabeceraSiScrollPresente() {

      let selectorExteriorEventos = document.querySelector(".zonaPrincipalCalendarioResumenSemana");
      let selectorLateralZonaHoraria = document.querySelector(".lateralZonaHoraria");
      let selectorEventosPorHoras = document.querySelector(".zonaPrincipalEventos");
      // Si no hay scroll o no se ha cargado todavía
      if (
        selectorExteriorEventos === null 
        || selectorLateralZonaHoraria === null 
        || selectorEventosPorHoras === null
        || selectorExteriorEventos.offsetWidth === (selectorLateralZonaHoraria.offsetWidth + selectorEventosPorHoras.offsetWidth)
      ) {
        this.paddingCabeceraSiScroll = 0;
      }
      // Si hay scroll
      else {
        this.paddingCabeceraSiScroll = selectorExteriorEventos.offsetWidth - (selectorLateralZonaHoraria.offsetWidth + selectorEventosPorHoras.offsetWidth);
      }

    },
    cabeceraResumenSemanaMontada() {
      this.actualizarPaddingCabeceraSiScrollPresente();
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