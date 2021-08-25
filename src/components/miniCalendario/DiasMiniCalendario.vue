<template>
  <div v-for="numDiaEnMiniMes in 42" :key="numDiaEnMiniMes" class="cuadradoDia">
    <div class="semanaViendo">
      <DiaMiniCalendario 
        :dia="diaPintar(numDiaEnMiniMes)" 
        :hoy="hoy" 
        :mesMostrando="mesMostrando" 
        :primerDiaSemanaMostrando="primerDiaSemanaMostrando"
        :numDiasMostrando="numDiasMostrando"/>
    </div>
  </div>
</template>

<script>
import DiaMiniCalendario from './DiaMiniCalendario.vue'

export default {
  name: 'DiasMiniCalendario',
  components: {
    DiaMiniCalendario,
  },
  props: {
    hoy: {
      type: Date,
      required: true,
    },
    primerDiaSemanaMostrando: {
      type: Date,
      required: true,
    },
    yearMostrando: {
      type: Number,
      required: true,
    },
    mesMostrando: {
      type: Number,
      required: true,
    },
    numDiasMostrando: {
      type: Number,
      required: true,
    },
  },
  data() {
      return {
      };
  },
  computed: {
    primerLunesMiniMes() {
      let primerDiaDelMes = new Date(this.yearMostrando, this.mesMostrando - 1, 1);
      let diaDeLaSemanaPrimerDiaDelMes = (primerDiaDelMes.getDay() + 6) % 7;
      return new Date(primerDiaDelMes.getTime() - (1000 * 60 * 60 * 24 * diaDeLaSemanaPrimerDiaDelMes));
    }
  },
  methods: {
    diaPintar(numDiaMesEnMiniCalendario) {
      return new Date(this.primerLunesMiniMes.getTime() + (1000 * 60 * 60 * 24 * (numDiaMesEnMiniCalendario - 1)));
    },
  },
  created() {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.miniCalendario * {
  font-size: 12px;
}
.miniCalendario * {
  line-height: 33px;
  height: 31px;
}
.cuadradoDia {
  float: left;
  width: calc(100% / 7);
  position: relative;
}
</style>
