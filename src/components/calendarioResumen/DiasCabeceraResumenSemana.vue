<template>

  <div class="zonaSuperiorCabeceraCalendarioResumenSemana">

    <div 
    :style="{'width': 'calc(100% / '+numDiasMostrando+')'}" 
    v-for="numColumnaDiaPintando in numDiasMostrando" 
    :key="numColumnaDiaPintando" 
    :class="{
      'columnaResumenSemana' : true, 
      'esFinde' : esFinde(diaColumnaMostrando(numColumnaDiaPintando)), 
    }">

      <div :class="{
        'diaDeLaSemana' : true, 
        'esHoy' : mismoDia(diaColumnaMostrando(numColumnaDiaPintando), hoy), 
        }">{{ nombreCortoDiaDeLaSemanaDesdeDia(diaColumnaMostrando(numColumnaDiaPintando)) }}</div>

      <div :class="{
        'numDiaDeLaSemana' : true, 
        'esHoy' : mismoDia(diaColumnaMostrando(numColumnaDiaPintando), hoy), 
        }">{{ diaColumnaMostrando(numColumnaDiaPintando).getDate() }}</div>

    </div>

  </div>

</template>

<script>
export default {
  name: 'DiasCabeceraResumenSemana',
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
    mismoDia(dia1, dia2) {
      return dia1.getDate() === dia2.getDate() && this.mismoMes(dia1, dia2);
    },
    mismoMes(dia1, dia2) {
      return dia1.getMonth() === dia2.getMonth() && dia1.getFullYear() === dia2.getFullYear();
    },
    diaColumnaMostrando(numColumnaDiaPintando) {
      return new Date(this.primerDiaSemanaMostrando.getTime() + (1000 * 60 * 60 * 24 * (numColumnaDiaPintando - 1)));
    },
    nombreCortoDiaDeLaSemanaDesdeDia(dia) {
      switch(dia.getDay()) {
        case 0: return "Dom";
        case 1: return "Lun";
        case 2: return "Mar";
        case 3: return "Mié";
        case 4: return "Jue";
        case 5: return "Vie";
        case 6: return "Sáb";
      }
    },
    esFinde(dia) {
      return dia.getDay() === 0 || dia.getDay() === 6
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.zonaSuperiorCabeceraCalendarioResumenSemana {
  float: left;
  padding-left: 50px;
  width: 100%;
  height: 80%;
}
.columnaResumenSemana {
  float: left;
  text-align: center;
  height: 100%;
}
.columnaResumenSemana.esFinde {
  background-color: #dbdbdb;
}
.diaDeLaSemana {
  font-size: 12px;
  text-transform: uppercase;
  margin-top: 10px;
}
.diaDeLaSemana.esHoy {
  color: #57a4e8;
}
.numDiaDeLaSemana {
  font-size: 26px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  line-height: 56px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.numDiaDeLaSemana.esHoy {
  background-color: #57a4e8;
  color: white;
}
</style>
