<template>

  <div class="zonaSuperiorCabeceraCalendarioResumenSemana">

    <div 
    :style="{'width': 'calc(100% / '+datesColumnasMostrando.length+')'}" 
    v-for="dateColumnaMostrando in datesColumnasMostrando" 
    :key="dateColumnaMostrando.getTime()" 
    :class="{
      'columnaResumenSemana' : true, 
      'esFinde' : esFinde(dateColumnaMostrando), 
    }">

      <div :class="{
        'diaDeLaSemana' : true, 
        'esHoy' : mismoDia(dateColumnaMostrando, hoy), 
        }">{{ nombreCortoDiaDeLaSemanaDesdeDia(dateColumnaMostrando) }}</div>

      <div :class="{
        'exteriorNumDiaDeLaSemana' : true, 
        'esHoy' : mismoDia(dateColumnaMostrando, hoy), 
      }">
        <div class="numDiaDeLaSemana">{{ dateColumnaMostrando.getDate() }}</div>
      </div>

    </div>

  </div>

</template>

<script>
import shared from './../../shared.js'

export default {
  name: 'DiasCabeceraResumenSemana',
  props: {
    datesColumnasMostrando: {
      type: Array,
      required: true,
    },
    hoy: {
      type: Date,
      required: true,
    },
  },
  methods: {
    mismoDia(date1, date2) {
      return shared.mismoDia(date1, date2);
    },
    nombreCortoDiaDeLaSemanaDesdeDia(date) {
      switch(date.getDay()) {
        case 0: return "Dom";
        case 1: return "Lun";
        case 2: return "Mar";
        case 3: return "Mié";
        case 4: return "Jue";
        case 5: return "Vie";
        case 6: return "Sáb";
      }
    },
    esFinde(date) {
      return shared.esFinde(date)
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
