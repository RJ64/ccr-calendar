<template>
  <div class="miniCalendario">
    <div class="filaMiniCalendario cabeceraMes">
      <div class="datosMes">{{ mesAHumano(mesMostrandoLocalmente) }} de {{ yearMostrandoLocalmente }}</div>
      <div class="flechasCambiarMiniMes">
        <div class="flechaCambiarMes anterior" @click="mesAnterior()"></div>
        <div class="flechaCambiarMes siguiente" @click="mesSiguiente()"></div>
      </div>
    </div>
    <div class="filaMiniCalendario filaDiasDeLaSemana">
      <div class="cuadradoDia diaDeLaSemana">L</div>
      <div class="cuadradoDia diaDeLaSemana">M</div>
      <div class="cuadradoDia diaDeLaSemana">X</div>
      <div class="cuadradoDia diaDeLaSemana">J</div>
      <div class="cuadradoDia diaDeLaSemana">V</div>
      <div class="cuadradoDia diaDeLaSemana">S</div>
      <div class="cuadradoDia diaDeLaSemana">D</div>
    </div>
    <DiasMiniCalendario 
      @irADia="irADia"
      :mesMostrando="mesMostrandoLocalmente" 
      :yearMostrando="yearMostrandoLocalmente" 
      :hoy="hoy" 
      :primerDiaSemanaMostrando="primerDiaSemanaMostrando"
      :numDiasMostrando="numDiasMostrando"/>
  </div>
</template>

<script>
import DiasMiniCalendario from './DiasMiniCalendario.vue'
import { format } from 'date-fns';
const inputDateFormat = 'DD-MM-YYYY';

export default {
  name: 'MiniCalendario',
  emits: ["irADia"],
  components: {
    DiasMiniCalendario,
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
        mesMostrandoLocalmente : this.mesMostrando,
        yearMostrandoLocalmente : this.yearMostrando
      };
  },
  computed: {
  },
  methods: {
    mesAHumano(numMes) {
      switch(numMes) {
        case 1: return 'Enero';
        case 2: return 'Febrero';
        case 3: return 'Marzo';
        case 4: return 'Abril';
        case 5: return 'Mayo';
        case 6: return 'Junio';
        case 7: return 'Julio';
        case 8: return 'Agosto';
        case 9: return 'Septiembre';
        case 10: return 'Octubre';
        case 11: return 'Noviembre';
        case 12: return 'Diciembre';
      }
    },
    diasEnMes(month, year) {
      return new Date(year, month, 0).getDate();
    },
    numDiasAPartirDeDia(dia, diasDespues) {
      return new Date(dia.getTime() + (1000 * 60 * 60 * 24 * diasDespues))
    },
    diaFormateado(dia) {
      return format(dia, inputDateFormat);
    },
    mesAnterior() {
      if (this.mesMostrandoLocalmente === 1) {
        this.mesMostrandoLocalmente = 12;
        this.yearMostrandoLocalmente--;
      }
      this.mesMostrandoLocalmente--;
    },
    mesSiguiente() {
      if (this.mesMostrandoLocalmente === 12) {
        this.mesMostrandoLocalmente = 1;
        this.yearMostrandoLocalmente++;
      }
      this.mesMostrandoLocalmente++;
    },
    irADia(dia) {
      this.$emit("irADia", dia);
    },
  },
  created() {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.miniCalendario {
  font-size: 15px;
}
.miniCalendario * {
  font-size: 12px;
}
.filaMiniCalendario {
  float: left;
  width: 100%;
}
.miniCalendario * {
  line-height: 33px;
  height: 31px;
}
.datosMes {
  float: left;
  width: calc(100% - 62px);
  text-align: left;
  font-size: 15px;
  padding-left: 10px;
}
.flechasCambiarMiniMes {
  float: left;
  width: 62px;
}
.flechaCambiarMes {
  float: left;
  width: 31px;
  background-image: url(/imagenes/flecha.png);
  background-size: 40%;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  border-radius: 100%;
}
.flechaCambiarMes:hover {
  background-color: #f2f2f2;
}
.flechaCambiarMes.anterior {
  transform: rotate(180deg);
}
.cuadradoDia {
  float: left;
  width: calc(100% / 7);
  position: relative;
}
.diaDeLaSemana::selection {
  background-color: transparent;
}
</style>
