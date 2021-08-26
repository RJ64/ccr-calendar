<template>

  <div class="zonaLogo"></div>

  <div @click="irAHoy()" class="botonHoy">Hoy</div>

  <div class="zonaFlechasCambiarSemana">
    <div class="flechaCambiarMes anterior" @click="semanaAnterior()"></div>
    <div class="flechaCambiarMes siguiente" @click="semanaSiguiente()"></div>
  </div>

  <div class="mesViendo">
    {{ nombreMesCabecera() }} de {{ primerDiaSemanaMostrando.getFullYear() }}
  </div>

</template>

<script>
export default {
  name: 'Cabecera',
  emits: ["semanaAnterior", "semanaSiguiente", "irAHoy"],
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
    semanaAnterior() {
      this.$emit("semanaAnterior", "semanaAnterior");
    },
    semanaSiguiente() {
      this.$emit("semanaSiguiente", "semanaSiguiente");
    },
    irAHoy() {
      this.$emit("irAHoy", "irAHoy");
    },
    nombreMesCabecera() {
      let ultimoDiaViendoEnSemana = new Date(this.primerDiaSemanaMostrando.getTime() + (1000 * 60 * 60 * 24 * (this.numDiasMostrando - 1)));
      if (this.primerDiaSemanaMostrando.getMonth() === ultimoDiaViendoEnSemana.getMonth()) {
        return this.nombreMesCompleto(this.primerDiaSemanaMostrando.getMonth());
      }
      return this.nombreMesCompleto(this.primerDiaSemanaMostrando.getMonth()) + ' - ' + this.nombreMesCompleto(ultimoDiaViendoEnSemana.getMonth());
    },
    nombreMesCompleto(mes) {
      switch(mes) {
        case 0: return 'Enero';
        case 1: return 'Febrero';
        case 2: return 'Marzo';
        case 3: return 'Abril';
        case 4: return 'Mayo';
        case 5: return 'Junio';
        case 6: return 'Julio';
        case 7: return 'Agosto';
        case 8: return 'Septiembre';
        case 9: return 'Octubre';
        case 10: return 'Noviembre';
        case 11: return 'Diciembre';
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.zonaLogo {
  float: left;
  width: 250px;
  height: 100%;
  background-image: url(/imagenes/rigovi.png);
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center center;
}
.botonHoy {
  float: left;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  padding: 9px 11px 7px;
  border: 1px solid #b0b0b0;
  cursor: pointer;
  font-size: 14px;
  border-radius: 2px;
}
.botonHoy:hover {
  background-color: #f7f7f7;
}
.zonaFlechasCambiarSemana {
  float: left;
  width: 100px;
  height: 30px;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  margin-left: 20px;
}
.flechaCambiarMes {
  float: left;
  width: 30px;
  height: 100%;
  background-image: url(/imagenes/flecha.png);
  background-position: 60% center;
  background-size: 50%;
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
.mesViendo {
  float: left;
  line-height: 67px;
  font-size: 22px;
}
.mesViendo::selection {
  background-color: transparent;
}
</style>
