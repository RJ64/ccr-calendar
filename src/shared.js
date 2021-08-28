export default {
    esFinde: function(date) { 
        return date.getDay() === 0 || date.getDay() === 6 
    },
    mismoDia: function(date1, date2) {
        return date1.getDate() === date2.getDate() && this.mismoMes(date1, date2);
    },
    mismoMes: function(date1, date2) {
        return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    },
    dosDigitos: function(numero) {
        if (numero < 10) return '0'+numero;
        return numero;
    },
    containsKey(obj, key) {
        return Object.keys(obj).includes(key);
    },
}