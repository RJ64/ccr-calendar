<template>

  <div 
  :style="{
    'width': 'calc(100% / '+numDiasMostrando+')'
  }" 
  v-for="numDiaEnMiniMes in 42" 
  :key="numDiaEnMiniMes" 
  :class="{
    'cuadradoDia' : true, 
    'esFinde' : esFinde(new Date(primerLunesMiniMes.getTime() + (1000 * 60 * 60 * 24 * (numDiaEnMiniMes - 1)))), 
  }">

    <div class="semanaViendo">
      <DiaMiniCalendario 
        @irADia="irADia"
        :dia="new Date(primerLunesMiniMes.getTime() + (1000 * 60 * 60 * 24 * (numDiaEnMiniMes - 1)))" 
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
  emits: ["irADia"],
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
    irADia(dia) {
      this.$emit("irADia", dia);
    },
    esFinde(dia) {
      return dia.getDay() === 0 || dia.getDay() === 6
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
  position: relative;
}
.cuadradoDia.esFinde {
  background-color: #dbdbdb;
}
</style>
