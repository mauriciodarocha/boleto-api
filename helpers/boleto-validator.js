const { BoletoHelpers } = require("./boleto-helpers")
class Boleto {

    /**
     * Validate boleto
     * @param {String} boleto_param
     * @returns boolean
     */
    validate(boleto_param) {
        const boletoHelpers = new BoletoHelpers();
        const boleto_num = boletoHelpers.clear(boleto_param);
        if (boleto_num.length < 44) {
            return {
                barcode: boleto_num,
                status: "Boleto inválido."
            };
        }
        return boleto_num.length > 44 ? boletoHelpers.validateConcessionaria(boleto_num) : boletoHelpers.validateBoletoBancario(boleto_num);
    }

}
module.exports = {
    Boleto
};