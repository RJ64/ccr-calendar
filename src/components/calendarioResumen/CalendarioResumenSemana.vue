<template>

  <CabeceraResumenSemana 
    :datesColumnasMostrando="datesColumnasMostrando" 
    :hoy="hoy"
    :paddingCabeceraSiScroll="paddingCabeceraSiScroll"/>

  <HorasResumenSemana 
    :datesColumnasMostrando="datesColumnasMostrando" 
    :hoy="hoy"
    :eventos="eventos"
    @horasResumenSemanaMontada="horasResumenSemanaMontada"/>

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
    eventos: {
      type: Array,
      required: true,
    },
  },
  data() {
      return {
          paddingCabeceraSiScroll: 0,
      };
  },
  computed: {
    datesColumnasMostrando() {
      let timePrimerDiaSemanaMostrando = this.primerDiaSemanaMostrando.getTime();
      let arrayDatesColumnasMostrando = [];
      for (let i = 0; i < this.numDiasMostrando; i++) {
        let dateColumna = new Date(timePrimerDiaSemanaMostrando + this.diasAMilisegundos(i));
        arrayDatesColumnasMostrando.push(dateColumna);
      }
      return arrayDatesColumnasMostrando;
    },
  },
  methods: {
    diasAMilisegundos(numDias) {
      return 1000 * 60 * 60 * 24 * numDias;
    },
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
    horasResumenSemanaMontada() {
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