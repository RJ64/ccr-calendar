<template>

  <div class="zonaPrincipalCalendarioResumenSemana">

      <div class="lateralZonaHoraria">
        <div v-for="horaPintando in 24" :key="horaPintando" class="filaHora">
          <div v-if="horaPintando > 1" class="semilinea"></div>
          <div v-if="horaPintando < 24" class="hora">{{ horaPintando }}:00</div>
        </div>
      </div>

      <div class="zonaPrincipalEventos">
        <div 
          :style="{
            'width': 'calc(100% / '+numDiasMostrando+')'
          }" 
          v-for="numColumnaDiaPintando in numDiasMostrando" 
          :key="numColumnaDiaPintando" 
          :class="{
            'columnaDiaEventos' : true, 
            'esFinde' : esFinde(diaColumnaMostrando(numColumnaDiaPintando)), 
          }">

          <div v-for="horaPintando in 24" :key="horaPintando" class="filaHoraEventos"></div>
          
          <div class="eventos">
            <div 
              :style="calcularEstiloEvento(diaColumnaMostrando(numColumnaDiaPintando), filtrarEventosDia(diaColumnaMostrando(numColumnaDiaPintando), eventos), evento)" 
              v-for="evento in filtrarEventosDia(diaColumnaMostrando(numColumnaDiaPintando), eventos)" 
              :key="evento.id" 
              class="evento"
            >
              <div class="nombre">{{ evento.titulo }}</div>
            </div>
          </div>
          
          <!-- // TODO: a las 23:59 produce overflow -->
          <div class="zonaLineaAhora" :style="{'top': topZonaLineaAhora+'px'}" v-if="mismoDia(diaColumnaMostrando(numColumnaDiaPintando), hoy)">
            <div class="bolaAhora"></div>
            <div class="lineaAhora"></div>
          </div>

        </div>
      </div>

  </div>

</template>

<script>
import shared from './../../shared.js'

export default {
  name: 'HorasResumenSemana',
  emits: ["horasResumenSemanaMontada"],
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
          alturaHora: 0,
          paddingDerechaEventos: 15,
      };
  },
  computed: {
    topZonaLineaAhora() {
      return ((this.alturaHora * this.hoy.getHours()) + ((this.alturaHora * this.hoy.getMinutes()) / 60));
    },
    eventosNoDiaCompletoOrdenadosPorFechaInicio() {
      let eventosNoDiaCompleto = this.eventos.filter(this.eventoNoEsDiaCompleto);
      eventosNoDiaCompleto.sort(this.ordenarEventosNoDiaCompletoPorFechaInicio);
      return eventosNoDiaCompleto;
    },
    posicionEventoPorDiaPorIdEvento() {

let timeInicio = new Date().getTime();

      let eventosPorDiaYMinuto = {};
      let numMaximoEventosALaVezPorDiaPorIdEvento = {};
      let posicionEventoPorDiaPorIdEvento = {};

      // Por cada día
      for (let i = 0; i < this.numDiasMostrando; i++) {
        
        let dateRecorriendo = new Date(this.primerDiaSemanaMostrando.getTime() + (i * 1000 * 60 * 60 * 24));
        let keyDiaRecorriendo = dateRecorriendo.getFullYear()+shared.dosDigitos(dateRecorriendo.getMonth() + 1)+shared.dosDigitos(dateRecorriendo.getDate());
        eventosPorDiaYMinuto[keyDiaRecorriendo] = {};
        numMaximoEventosALaVezPorDiaPorIdEvento[keyDiaRecorriendo] = {};
        posicionEventoPorDiaPorIdEvento[keyDiaRecorriendo] = {};
 
        this.eventosNoDiaCompletoOrdenadosPorFechaInicio.forEach(evento => {

          let dateInicioEvento = this.objectDatosDiaADate(evento.fechaEvento.inicio);
          let dateFinEvento = this.objectDatosDiaADate(evento.fechaEvento.fin);
          let dateInicioEventoComparadoConDateRecorriendo = this.compararDateConDateMirandoDiaMesYear(dateInicioEvento, dateRecorriendo);
          let dateFinEventoComparadoConDateRecorriendo = this.compararDateConDateMirandoDiaMesYear(dateFinEvento, dateRecorriendo);

          // Si el evento recurre el día, lo procesamos
          if (
            dateInicioEventoComparadoConDateRecorriendo <= 0
            && dateFinEventoComparadoConDateRecorriendo >= 0
          ) {
          

            let dateInicioEventoEnElDia = dateInicioEventoComparadoConDateRecorriendo === 0
              ? evento.fechaEvento.inicio
              : {
                dia: dateRecorriendo.getDate(),
                mes: dateRecorriendo.getMonth() + 1,
                year: dateRecorriendo.getFullYear(),
                hora: 0,
                minuto: 0,
              };
            dateInicioEventoEnElDia = this.objectDatosDiaADate(dateInicioEventoEnElDia);

            let dateFinEventoEnElDia = dateFinEventoComparadoConDateRecorriendo === 0
              ? evento.fechaEvento.fin
              : {
                dia: dateRecorriendo.getDate(),
                mes: dateRecorriendo.getMonth() + 1,
                year: dateRecorriendo.getFullYear(),
                hora: 23,
                minuto: 59,
              };
            dateFinEventoEnElDia = this.objectDatosDiaADate(dateFinEventoEnElDia);

            for (let minutoEventoRecorriendo = dateInicioEventoEnElDia.getTime(); minutoEventoRecorriendo <= dateFinEventoEnElDia.getTime(); minutoEventoRecorriendo += (1000 * 60)) {

              if (!shared.containsKey(eventosPorDiaYMinuto[keyDiaRecorriendo], minutoEventoRecorriendo.toString())) {
                eventosPorDiaYMinuto[keyDiaRecorriendo][minutoEventoRecorriendo] = [];
              }

              eventosPorDiaYMinuto[keyDiaRecorriendo][minutoEventoRecorriendo].push(evento.idEvento);
              
            }
            
          }

        });

        this.eventosNoDiaCompletoOrdenadosPorFechaInicio.forEach(evento => {

          let dateInicioEvento = this.objectDatosDiaADate(evento.fechaEvento.inicio);
          let dateFinEvento = this.objectDatosDiaADate(evento.fechaEvento.fin);
          let dateInicioEventoComparadoConDateRecorriendo = this.compararDateConDateMirandoDiaMesYear(dateInicioEvento, dateRecorriendo);
          let dateFinEventoComparadoConDateRecorriendo = this.compararDateConDateMirandoDiaMesYear(dateFinEvento, dateRecorriendo);

          // Si el evento recurre el día, lo procesamos
          if (
            dateInicioEventoComparadoConDateRecorriendo <= 0
            && dateFinEventoComparadoConDateRecorriendo >= 0
          ) {
          

            let dateInicioEventoEnElDia = dateInicioEventoComparadoConDateRecorriendo === 0
              ? evento.fechaEvento.inicio
              : {
                dia: dateRecorriendo.getDate(),
                mes: dateRecorriendo.getMonth() + 1,
                year: dateRecorriendo.getFullYear(),
                hora: 0,
                minuto: 0,
              };
            dateInicioEventoEnElDia = this.objectDatosDiaADate(dateInicioEventoEnElDia);

            let dateFinEventoEnElDia = dateFinEventoComparadoConDateRecorriendo === 0
              ? evento.fechaEvento.fin
              : {
                dia: dateRecorriendo.getDate(),
                mes: dateRecorriendo.getMonth() + 1,
                year: dateRecorriendo.getFullYear(),
                hora: 23,
                minuto: 59,
              };
            dateFinEventoEnElDia = this.objectDatosDiaADate(dateFinEventoEnElDia);

            for (let minutoEventoRecorriendo = dateInicioEventoEnElDia.getTime(); minutoEventoRecorriendo <= dateFinEventoEnElDia.getTime(); minutoEventoRecorriendo += (1000 * 60)) {

              if (!shared.containsKey(numMaximoEventosALaVezPorDiaPorIdEvento[keyDiaRecorriendo], evento.idEvento.toString())) {
                numMaximoEventosALaVezPorDiaPorIdEvento[keyDiaRecorriendo][evento.idEvento] = 0;
              }

              if (eventosPorDiaYMinuto[keyDiaRecorriendo][minutoEventoRecorriendo].length > numMaximoEventosALaVezPorDiaPorIdEvento[keyDiaRecorriendo][evento.idEvento]) {
                numMaximoEventosALaVezPorDiaPorIdEvento[keyDiaRecorriendo][evento.idEvento] = eventosPorDiaYMinuto[keyDiaRecorriendo][minutoEventoRecorriendo].length;
              }
              
            }
            
          }

        });
        
        posicionEventoPorDiaPorIdEvento[keyDiaRecorriendo] = {};
 
        this.eventosNoDiaCompletoOrdenadosPorFechaInicio.forEach(evento => {

          let dateInicioEvento = this.objectDatosDiaADate(evento.fechaEvento.inicio);
          let dateFinEvento = this.objectDatosDiaADate(evento.fechaEvento.fin);
          let dateInicioEventoComparadoConDateRecorriendo = this.compararDateConDateMirandoDiaMesYear(dateInicioEvento, dateRecorriendo);
          let dateFinEventoComparadoConDateRecorriendo = this.compararDateConDateMirandoDiaMesYear(dateFinEvento, dateRecorriendo);

          // Si el evento recurre el día, lo procesamos
          if (
            dateInicioEventoComparadoConDateRecorriendo <= 0
            && dateFinEventoComparadoConDateRecorriendo >= 0
          ) {
          
            let dateInicioEvento = this.objectDatosDiaADate(evento.fechaEvento.inicio);
            let dateInicioEventoComparadoConDateRecorriendo = this.compararDateConDateMirandoDiaMesYear(dateInicioEvento, dateRecorriendo);
            let dateInicioEventoEnElDia = dateInicioEventoComparadoConDateRecorriendo === 0
              ? evento.fechaEvento.inicio
              : {
                dia: dateRecorriendo.getDate(),
                mes: dateRecorriendo.getMonth() + 1,
                year: dateRecorriendo.getFullYear(),
                hora: 0,
                minuto: 0,
              };
            dateInicioEventoEnElDia = this.objectDatosDiaADate(dateInicioEventoEnElDia);

            let encontrado = false;
            let posicionOcupadas = [];
            let eventosEnHoraInicio = eventosPorDiaYMinuto[keyDiaRecorriendo][dateInicioEventoEnElDia.getTime()];
            for (let i = 0; !encontrado && i < eventosEnHoraInicio.length; i++) {
              
              if (eventosEnHoraInicio[i] === evento.idEvento) {

                encontrado = true;

                let primeraPosicionDisponible = false;
                for (let j = 0; !primeraPosicionDisponible && j < eventosEnHoraInicio.length; j++) {
                  if (!posicionOcupadas.includes(j)) {
                    primeraPosicionDisponible = j;
                  }
                }

                posicionEventoPorDiaPorIdEvento[keyDiaRecorriendo][evento.idEvento] = {
                  posicion: primeraPosicionDisponible,
                  ancho: numMaximoEventosALaVezPorDiaPorIdEvento[keyDiaRecorriendo][evento.idEvento],
                };

              }
              else {
                posicionOcupadas.push(posicionEventoPorDiaPorIdEvento[keyDiaRecorriendo][eventosEnHoraInicio[i]].posicion);
              }

            }

          }

        });

      }
console.log('Tiempo ejecución posicionEventoPorDiaPorIdEvento: '+(new Date().getTime() - timeInicio))

      return posicionEventoPorDiaPorIdEvento;
      
    },
  },
  methods: {
    eventoNoEsDiaCompleto(evento) {
        return shared.containsKey(evento.fechaEvento, 'inicio');
    },
    ordenarEventosNoDiaCompletoPorFechaInicio(evento1, evento2) {

      let timeInicioEvento1 = this.objectDatosDiaADate(evento1.fechaEvento.inicio).getTime();
      let timeInicioEvento2 = this.objectDatosDiaADate(evento2.fechaEvento.inicio).getTime();

      if (timeInicioEvento1 === timeInicioEvento2) {

        let timeFinEvento1 = this.objectDatosDiaADate(evento1.fechaEvento.fin).getTime();
        let timeFinEvento2 = this.objectDatosDiaADate(evento2.fechaEvento.fin).getTime();
        let duracionMilisegundosEvento1 = timeFinEvento1 - timeInicioEvento1;
        let duracionMilisegundosEvento2 = timeFinEvento2 - timeInicioEvento2;

        if (duracionMilisegundosEvento1 > duracionMilisegundosEvento2) {
          return -1
        }
        if (duracionMilisegundosEvento1 < duracionMilisegundosEvento2) {
          return 1
        }

        return evento1.idEvento < evento2.idEvento ? -1 : 1;
      }

      return timeInicioEvento1 < timeInicioEvento2 ? -1 : 1;

    },
    mismoDia(dia1, dia2) {
      return dia1.getDate() === dia2.getDate() && this.mismoMes(dia1, dia2);
    },
    mismoMes(dia1, dia2) {
      return dia1.getMonth() === dia2.getMonth() && dia1.getFullYear() === dia2.getFullYear();
    },
    diaColumnaMostrando(numColumnaDiaPintando) {
      return shared.diaColumnaMostrando(this.primerDiaSemanaMostrando, numColumnaDiaPintando);
    },
    esFinde(dia) {
      return shared.esFinde(dia);
    },
    cambioSizeVentana() {
      this.actualizarAlturaHora();
    },
    actualizarAlturaHora() {
      this.alturaHora = document.querySelector('.filaHoraEventos').offsetHeight;
    },
    filtrarEventosDia(dia, eventos) {
      return eventos.filter(evento => this.eventoEnDia(dia, evento));
    },
    objectDatosDiaADate(objectDatosDia) {
      return new Date(objectDatosDia.year, objectDatosDia.mes - 1, objectDatosDia.dia, objectDatosDia.hora, objectDatosDia.minuto);
    },
    compararDateConDate(date1, date2) {// -1 si date1 es anterior a date2, 0 iguales, 1 e.o.c
      let datesComparadosSoloDiaMesYear = this.compararDateConDateMirandoDiaMesYear(date1, date2);
      if (datesComparadosSoloDiaMesYear !== 0) {
        return datesComparadosSoloDiaMesYear;
      }
      if (date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes()) {
        return 0;
      }
      if (date1.getHours() < date2.getHours() || (date1.getHours() === date2.getHours() && date1.getMinutes() < date2.getMinutes())) {
        return -1
      }
      return 1;
    },
    compararDateConDateMirandoDiaMesYear(date1, date2) {
      if (
        date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()
      ) {
        return 0;
      }
      if (
        date1.getFullYear() < date2.getFullYear()
        || (
          date1.getFullYear() === date2.getFullYear()
          && date1.getMonth() < date2.getMonth()
        )
        || (
          date1.getFullYear() === date2.getFullYear()
          && date1.getMonth() === date2.getMonth()
          && date1.getDate() < date2.getDate()
        )
      ) {
        return -1;
      }
      return 1;
    },
    compararHoraMinuto(hora1, minuto1, hora2, minuto2) {
      if (hora1 === hora2 && minuto1 === minuto2) {
        return 0;
      }
      if (hora1 < hora2 || (hora1 === hora2 && minuto1 < minuto2)) {
        return -1;
      }
      return 1;
    },
    eventoEnDia(dateDia, evento) {

      if (!shared.containsKey(evento.fechaEvento, 'inicio') ) {
        return false;
      }
      
      let dateInicio = this.objectDatosDiaADate(evento.fechaEvento.inicio);
      let dateFin = this.objectDatosDiaADate(evento.fechaEvento.fin);
      return (
        this.compararDateConDateMirandoDiaMesYear(dateInicio, dateDia) < 1
        && this.compararDateConDateMirandoDiaMesYear(dateDia, dateFin) < 1
      );

    },
    calcularEstiloEvento(dateColumna, eventos, evento) {

      /* 
        - Cómo se colocan los eventos
        Partiendo de que parece ser un milagro (no es perfecto pero funciona sorprendentemente bastante bien), procedamos a explicarlo un poco.
        1. Se calcula con cuantos eventos máximos va a coincidir a la vez. Ese es su ancho (ej. con otros 4 => ancho = 100 / (4 + 1) = 20%)
        2. Se ordenan los eventos por fecha y hora de inicio, si iguales por duración, si iguales por idEvento
        2. Se van recorriendo los eventos ordenados y se van colocando en columnas. Veámoslo con un ejemplo (recomiendo pintar para verlo mejor):
         - Tienes 6 eventos. 
            Evento1 de 12:00 a 16:00 (Sus máximas coincidencias son con Evento3, Evento4, Evento5 y Evento6 => ancho 20%)
            Evento2 de 12:30 a 13:30 (Sus máximas coincidencias son con Evento1, Evento3 y Evento4 => ancho 25%)
            Evento3 de 13:00 a 15:00
            Evento4 de 13:00 a 15:30
            Evento5 de 14:00 a 14:30
            Evento6 de 14:15 a 14:20
          Se ordenan e irían: Evento1, Evento2, Evento4, Evento3, Evento5 y Evento6
          Se van colocando:
            Evento1: Es el único cuando empieza => columna 0
            Evento2: Cuando empieza, ya hay otro evento (Evento1) y está en la columna 0 => se pone en la columna1
            Evento3: Cuando empieza, ya hay 2 eventos (Evento1 y Evento2). La primera columna libre es la 2
            Evento4: Cuando empieza, ya hay 3 eventos (Evento1, Evento2 y Evento3). La primera columna libre es la 3
            Evento5: Cuando empieza, ya hay 3 eventos (Evento1 en la columna 0, Evento3 en la columna 2 y Evento4 en la columna 3). La primera columna libre es la 1
            Evento6: Cuando empieza, ya hay 4 eventos (Evento1 en la columna 0, Evento3 en la columna 2, Evento4 en la columna 3 y Evento5 en la columna 1). La primera columna libre es la 4
      */

      let dateInicioEvento = this.objectDatosDiaADate(evento.fechaEvento.inicio);
      let dateInicioEventoEnElDia = this.compararDateConDateMirandoDiaMesYear(dateInicioEvento, dateColumna) === 0
        ? evento.fechaEvento.inicio
        : {
          dia: dateColumna.getDate(),
          mes: dateColumna.getMonth() + 1,
          year: dateColumna.getFullYear(),
          hora: 0,
          minuto: 0,
        };
      dateInicioEventoEnElDia = this.objectDatosDiaADate(dateInicioEventoEnElDia);

      let dateFinEvento = this.objectDatosDiaADate(evento.fechaEvento.fin);
      let dateFinEventoEnElDia = this.compararDateConDateMirandoDiaMesYear(dateFinEvento, dateColumna) === 0
        ? evento.fechaEvento.fin
        : {
          dia: dateColumna.getDate(),
          mes: dateColumna.getMonth() + 1,
          year: dateColumna.getFullYear(),
          hora: 23,
          minuto: 59,
        };
      dateFinEventoEnElDia = this.objectDatosDiaADate(dateFinEventoEnElDia);
      
      let keyDiaRecorriendo = dateColumna.getFullYear()+shared.dosDigitos(dateColumna.getMonth() + 1)+shared.dosDigitos(dateColumna.getDate());
      let posicionEvento = this.posicionEventoPorDiaPorIdEvento[keyDiaRecorriendo][evento.idEvento];

      let top = (  (dateInicioEventoEnElDia.getHours() / 24) + (dateInicioEventoEnElDia.getMinutes() / (24 * 60))  ) * 100;
      let duracion = (dateFinEventoEnElDia.getHours() - dateInicioEventoEnElDia.getHours()) + (( dateFinEventoEnElDia.getMinutes() - dateInicioEventoEnElDia.getMinutes() ) / 60);
      let alto = (duracion / 24) * 100;
      let ancho = (100 / posicionEvento.ancho)+'%';
      // Si no es el último
      if (posicionEvento.posicion + 1 !== posicionEvento.ancho) {
        ancho = 'calc('+ancho+' + '+this.paddingDerechaEventos+'px)'
      }
      let left = ((posicionEvento.posicion * 100) / posicionEvento.ancho)+'%';
      
      let respuesta = {
        top : top+'%',
        height : alto+'%',
        width : ancho,
        left : left,
        zIndex : posicionEvento.posicion
      }
      if (duracion < 0.7) {
        respuesta.padding = (duracion < 0.4) ? '1px 4px' : '2px 4px';
      }
      
      return respuesta;
    },
    sacarEventosMaximosALaVez(dateInicio, dateFin) {

      let keyDiaRecorriendo = dateInicio.getFullYear()+shared.dosDigitos(dateInicio.getMonth() + 1)+shared.dosDigitos(dateInicio.getDate());
      let numEventosPorMinuto = this.numEventosPorDiaYMinuto[keyDiaRecorriendo];
      
      let eventosMaximos = 0;
      for (let minutoEventoRecorriendo = dateInicio.getTime(); minutoEventoRecorriendo <= dateFin.getTime(); minutoEventoRecorriendo += (1000 * 60)) {
        if (numEventosPorMinuto[minutoEventoRecorriendo] > eventosMaximos) {
          eventosMaximos = numEventosPorMinuto[minutoEventoRecorriendo];
        }
      }

      return eventosMaximos;
      
    },
    numEventosOcurriendoEnElDate(eventos, date) {
      return eventos.filter(evento => {
        
        let dateInicioEvento = this.objectDatosDiaADate(evento.fechaEvento.inicio);
        let inicioEventoComparadoConDate = this.compararDateConDate(dateInicioEvento, date);

        let dateFinEvento = this.objectDatosDiaADate(evento.fechaEvento.fin);
        let finEventoComparadoConDate = this.compararDateConDate(dateFinEvento, date);

        return inicioEventoComparadoConDate <= 0
          && finEventoComparadoConDate >= 0;
      });
    },
    sacarEventosHanEmpezadoAntesDeYTerminanDespuesDeOIgual(eventos, dateInicio) {
      return eventos.filter(evento => {
        
        let dateInicioEvento = this.objectDatosDiaADate(evento.fechaEvento.inicio);
        let inicioEventoComparadoConDateInicio = this.compararDateConDate(dateInicioEvento, dateInicio);

        let dateFinEvento = this.objectDatosDiaADate(evento.fechaEvento.fin);
        let finEventoComparadoConDateInicio = this.compararDateConDate(dateFinEvento, dateInicio);

        return inicioEventoComparadoConDateInicio < 0
          && finEventoComparadoConDateInicio >= 0;
      });
    },
    sacarEventosQueEmpecienanALas(eventos, dateInicio) {
      return eventos.filter(evento => {
        let dateInicioEvento = this.objectDatosDiaADate(evento.fechaEvento.inicio);
        return this.compararDateConDate(dateInicioEvento, dateInicio) === 0;
      });
    },
    sacarEventosQueEmpiezanEntreDosDates(eventos, dateInicio, dateFin) {
      return eventos.filter(evento => {
        
        let dateInicioEvento = this.objectDatosDiaADate(evento.fechaEvento.inicio);
        let inicioEventoComparadoConDateInicio = this.compararDateConDate(dateInicioEvento, dateInicio);
        let inicioEventoComparadoConDateFin = this.compararDateConDate(dateInicioEvento, dateFin);

        return inicioEventoComparadoConDateInicio > 0
          && inicioEventoComparadoConDateFin <= 0;
      });
    },
  },
  mounted() {
    this.cambioSizeVentana();
    this.$emit("horasResumenSemanaMontada");
  },
  created() {
    window.addEventListener("resize", this.cambioSizeVentana);
  },
  unmounted() {
    window.removeEventListener("resize", this.cambioSizeVentana);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.zonaPrincipalCalendarioResumenSemana {
  float: left;
  width: 100%;
  height: calc(100% - 100px);
  overflow: auto;
}
.lateralZonaHoraria {
  float: left;
  width: 50px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.filaHora {
  float: left;
  width: 100%;
  position: relative;
  flex: 1;
  min-height: 30px;
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
  height: 100%;
}
.columnaDiaEventos {
  float: left;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.columnaDiaEventos.esFinde {
  background-color: #dbdbdb;
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
  flex: 1;
  min-height: 30px;
}
.filaHoraEventos:first-child {
  border-top: none;
  padding-top: 1px;
}
.eventos {
  position: absolute;
  left: 0;
  top: 0;
  width: calc(100% - 15px);
  height: 100%;
}
.evento {
  position: absolute;
  background-color: #559dea;
  border-radius: 4px;
  border: 1px solid #3678bf;
  color: white;
  font-size: 12px;
  text-align: left;
  padding: 5px;
  cursor: pointer;
  overflow: hidden;
}
</style>
