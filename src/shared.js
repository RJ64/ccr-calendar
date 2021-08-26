export default {
    esFinde: function(dia) { 
        return dia.getDay() === 0 || dia.getDay() === 6 
    },
    mismoDia: function(dia1, dia2) {
        return dia1.getDate() === dia2.getDate() && this.mismoMes(dia1, dia2);
    },
    mismoMes: function(dia1, dia2) {
        return dia1.getMonth() === dia2.getMonth() && dia1.getFullYear() === dia2.getFullYear();
    },
    diaColumnaMostrando: function(primerDiaSemanaMostrando, numColumnaDiaPintando) {
      return new Date(primerDiaSemanaMostrando.getTime() + (1000 * 60 * 60 * 24 * (numColumnaDiaPintando - 1)));
    },
}