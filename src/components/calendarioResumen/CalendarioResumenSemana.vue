<template>

  <div class="cabeceraCalendarioResumenSemana">

    <div class="zonaSuperiorCabeceraCalendarioResumenSemana">
      <div :style="{'width': 'calc(100% / '+numDiasMostrando+')'}" v-for="numColumnaDiaPintando in numDiasMostrando" :key="numColumnaDiaPintando" class="columnaResumenSemana">
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
    
    <div class="zonaEventosDiariosCabeceraCalendarioResumenSemana">
      <div class="lateralZonaHorariaCabecera">
        <div class="zonaHoraria">{{ zonaHoraria() }}</div>
      </div>
      <div class="zonaEventosDiarios">
        <div :style="{'width': 'calc(100% / '+numDiasMostrando+')'}" v-for="numColumnaDiaPintando in numDiasMostrando" :key="numColumnaDiaPintando" class="eventosDiariosColumnaSemana">
        </div>
      </div>
    </div>
    
  </div>

  <div class="zonaPrincipalCalendarioResumenSemana">
      <div class="lateralZonaHoraria">
        <div :style="{'height': alturaHora+'px'}" v-for="horaPintando in 24" :key="horaPintando" class="filaHora">
          <div v-if="horaPintando > 1" class="semilinea"></div>
          <div v-if="horaPintando < 24" class="hora">{{ horaPintando }}:00</div>
        </div>
      </div>
      <div class="zonaPrincipalEventos">
        <div :style="{'width': 'calc(100% / '+numDiasMostrando+')'}" v-for="numColumnaDiaPintando in numDiasMostrando" :key="numColumnaDiaPintando" class="columnaDiaEventos">
          <div :style="{'height': alturaHora+'px'}" v-for="horaPintando in 24" :key="horaPintando" class="filaHoraEventos"></div>
          <div class="zonaLineaAhora" :style="{'top': ((alturaHora * hoy.getHours()) + ((alturaHora * hoy.getMinutes()) / 60))+'px'}" v-if="mismoDia(diaColumnaMostrando(numColumnaDiaPintando), hoy)">
            <div class="bolaAhora"></div>
            <div class="lineaAhora"></div>
          </div>
        </div>
      </div>
  </div>

</template>

<script>
export default {
  name: 'CalendarioResumenSemana',
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
          alturaHora: 50,
      };
  },
  methods: {
    zonaHoraria() {
      let cambioHorario = this.hoy.getTimezoneOffset() / 60;
      let signo = cambioHorario > 0 ? '-' : '+';
      return 'GMT' + signo + Math.abs(cambioHorario);
    },
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
  },
  mounted() {
    document.querySelector(".zonaPrincipalCalendarioResumenSemana").scrollTop = this.alturaHora * 6;
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
  padding-right: 12px;
}
.cabeceraCalendarioResumenSemana::after {
  -moz-box-shadow: inset 0 1px 1px 0 rgba(0,0,0,.14),inset 0 2px 1px -1px rgba(0,0,0,.12);
  box-shadow: inset 0 1px 1px 0 rgba(0,0,0,.14),inset 0 2px 1px -1px rgba(0,0,0,.12);
  content: "";
  height: 4px;
  position: absolute;
  width: calc(100% - 16px);
  z-index: 505;
  left: 0;
  bottom: -4px;
}
.zonaSuperiorCabeceraCalendarioResumenSemana {
  float: left;
  padding-left: 50px;
  width: 100%;
  height: 80%;
}
.columnaResumenSemana {
  float: left;
  text-align: center;
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

.zonaEventosDiariosCabeceraCalendarioResumenSemana {
  float: left;
  width: 100%;
  height: 20px;
}
.lateralZonaHorariaCabecera {
  float: left;
  width: 50px;
  height: 100%;
  position: relative;
}
.zonaHoraria {
  font-size: 10px;
  position: absolute;
  right: 3px;
  bottom: 1px;
}
.zonaEventosDiarios {
  float: left;
  width: calc(100% - 50px);
  height: 100%;
}
.eventosDiariosColumnaSemana {
  float: left;
  height: 100%;
  border-left: 1px solid #b7b7b7;
}

.zonaPrincipalCalendarioResumenSemana {
  float: left;
  width: 100%;
  height: calc(100% - 100px);
  overflow: auto;
}
.lateralZonaHoraria {
  float: left;
  width: 50px;
}
.filaHora {
  float: left;
  width: 100%;
  position: relative;
}
.filaHora .semilinea {
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;
  border-bottom: 1px solid #b7b7b7;
}
.filaHora .hora {
  position: absolute;
  font-size: 11px;
  text-align: right;
  width: 30px;
  bottom: -7px;
  right: 13px;
}
.zonaPrincipalEventos {
  float: left;
  width: calc(100% - 50px);
}
.columnaDiaEventos {
  float: left;
  position: relative;
}
.zonaLineaAhora {
  position: absolute;
  width: 100%;
}
.bolaAhora {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: red;
  left: -5px;
  top: -3px;
}
.lineaAhora {
  float: left;
  width: 100%;
  border-bottom: 3px solid red;
}
.filaHoraEventos {
  float: left;
  width: 100%;
  border-left: 1px solid #b7b7b7;
  border-top: 1px solid #b7b7b7;
}
.filaHoraEventos:first-child {
  border-top: none;
}
</style>
