<template>
  <div :class="{
    'diaEnSemanaMirando' : diaEnSemanaMirando, 
    'inicioSemanaMirando' : inicioSemanaMirando(), 
    'finSemanaMirando' : finSemanaMirando(), 
    }">
      <div @click="irADia(dia)" :class="{
        'diaEnMes' : true, 
        'otroMes': (dia.getMonth() + 1) != mesMostrando, 
        'hoy': mismoDia(dia, hoy),
        }">{{ dia.getDate() }}</div>
    </div>
</template>

<script>
export default {
  name: 'DiaMiniCalendario',
  emits: ["irADia"],
  props: {
    dia: {
      type: Date,
      required: true,
    },
    hoy: {
      type: Date,
      required: true,
    },
    primerDiaSemanaMostrando: {
      type: Date,
      required: true,
    },
    numDiasMostrando: {
      type: Number,
      required: true,
    },
    mesMostrando: {
      type: Number,
      required: true,
    },
  },
  data() {
      return {
      };
  },
  computed: {
    diaEnSemanaMirando() {
      for(let i = 0; i < this.numDiasMostrando; i++) {
        if (this.mismoDia(this.dia, new Date(this.primerDiaSemanaMostrando.getTime() + (1000 * 60 * 60 * 24 * i)))) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    inicioSemanaMirando() {
      return (
        this.diaEnSemanaMirando
        && this.mismoDia(this.dia, this.primerDiaSemanaMostrando)
      );
    },
    finSemanaMirando() {
      return (
        this.diaEnSemanaMirando
        && this.mismoDia(this.dia, new Date(this.primerDiaSemanaMostrando.getTime() + (1000 * 60 * 60 * 24 * (this.numDiasMostrando - 1))))
      );
    },
    mismoDia(dia1, dia2) {
      return dia1.getDate() === dia2.getDate() && this.mismoMes(dia1, dia2);
    },
    mismoMes(dia1, dia2) {
      return dia1.getMonth() === dia2.getMonth() && dia1.getFullYear() === dia2.getFullYear();
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
.otroMes {
  color: #848383;
}
.hoy {
  background-color: #57a4e8;
  color: white;
}
.diaEnMes {
  position: absolute;
  left: 50%;
  width: 30px;
  border-radius: 100%;
  transform: translate(-50%, -50%);
  height: 30px;
  cursor: pointer;
  top: 50%;
}
.diaEnMes:hover {
  background-color: #c0ddf7;
  color: #57a4e8;
}
.diaEnMes.hoy:hover {
  background-color: #4a9ae1;
  color: white;
}
.diaEnSemanaMirando {
  background-color: #cbe7ff;
  color: #57a4e8;
}
.inicioSemanaMirando {
  border-radius: 20px 0 0 20px;
}
.finSemanaMirando {
  border-radius: 0 20px 20px 0;
}
</style>
