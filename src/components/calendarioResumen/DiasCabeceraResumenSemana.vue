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
        'exteriorNumDiaDeLaSemana' : true, 
        'esHoy' : mismoDia(diaColumnaMostrando(numColumnaDiaPintando), hoy), 
      }">
        <div class="numDiaDeLaSemana">{{ diaColumnaMostrando(numColumnaDiaPintando).getDate() }}</div>
      </div>

    </div>

  </div>

</template>

<script>
import shared from './../../shared.js'

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
      return shared.mismoDia(dia1, dia2);
    },
    diaColumnaMostrando(numColumnaDiaPintando) {
      return shared.diaColumnaMostrando(this.primerDiaSemanaMostrando, numColumnaDiaPintando);
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
      return shared.esFinde(dia)
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
.exteriorNumDiaDeLaSemana {
  font-size: 26px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.exteriorNumDiaDeLaSemana.esHoy {
  background-color: #57a4e8;
  color: white;
}
.numDiaDeLaSemana {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
@-moz-document url-prefix() {
  .numDiaDeLaSemana {
    padding-top: 5px;
  }
}
</style>
