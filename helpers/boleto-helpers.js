class BoletoHelpers {

    boletoObj = {
        barcode: "",
        amount: "123,45",
        expirationDate: "01/01/2021",
        status: "Boleto válido."
    }

    /**
     * Validate boleto from a bank
     * @param {String} boleto_param
     * @returns boolean
     */
    validateBoletoBancario(boleto_param) {
        const code_groups = this.getBoletoBancarioGroups(boleto_param);
        const validation = code_groups.codes.every((code) => this.module10(code.num) === Number(code.dv));
        if (!validation) {
            return { 
                barcode: code_groups.barcode,
                status: "Boleto inválido."
            }
        }
        this.boletoObj.barcode = code_groups.barcode;
        this.boletoObj.amount = this.formatNumberBR(code_groups.valor);
        this.boletoObj.expirationDate = this.formatDateBR(this.addDays(code_groups.fator));
        return this.boletoObj;
    }

    /**
     * Validate boleto from dealers
     * @param {String} boleto_param 
     * @returns boolean
     */
     validateConcessionaria(boleto_param) {
        return true
    }

    /**
     * Get the group numbers
     * @param {String} boleto_param 
     * @returns object with group numbers
     */
    getBoletoBancarioGroups(boleto_param) {
        let matches = boleto_param.match(/^(?<campo1>\d{9})(?<dv1>\d{1})(?<campo2>\d{10})(?<dv2>\d{1})(?<campo3>\d{10})(?<dv3>\d{1})(?<dv4>\d{1})(?<fator>\d{4})(?<valor>\d+)/);
        let fields = matches.groups;

        let codes = [];
        let field_keys = Object.keys(fields);
        for (let i = 0; i < field_keys.length - 4; i = i + 2) {
            const match_group = {};
            match_group['num'] = Number(fields[field_keys[i]]);
            match_group['dv'] = Number(fields[field_keys[i + 1]]);
            codes.push(match_group);
        }
        let code_groups = {
            codes
        };
        code_groups['barcode'] = matches[0];
        code_groups['dv'] = Number(fields['dv4']);
        code_groups['fator'] = Number(fields['fator']);
        code_groups['valor'] = Number(fields['valor']);
        return code_groups;
    }

    /**
     * Retorno do digito verificador
     * @param {Number} number_param 
     * @returns number
     */
    module10(number_param) {
        const num_str = String(number_param).replace(/\D/g, '');
        let mult = 2;
        let sum = 0;
        let acc = '';
    
        for (let i = num_str.length - 1; i >= 0; i--) {
            acc = (mult * Number(num_str.charAt(i))) + acc;
            if (--mult < 1) {
                mult = 2;
            }
        }
        for (let i = 0; i < acc.length; i++) {
            sum = sum + Number(acc.charAt(i));
        }
        sum = sum % 10;
        if (sum != 0) {
            sum = 10 - sum;
        }
        return sum;
    }

    /**
     * Return a brazilian currency number in the format "1.234.567,89"
     * @param {String} valor 
     * @returns string
     */
    formatNumberBR(valor) {
        return (Number(valor)/100).toFixed(2).replace(/\./g, '|').replace(/,/g, '').replace(/(\d)(?=((\d{3})+)(?:\|))/g, '$1.').replace(/\|/g, ',');
    }

    /**
     * Return a brazilian date in the format "01/01/2021"
     * @param {Date} date 
     * @returns string
     */
    formatDateBR(date) {
        const date_str = `${this.pad(date.getDate(), 1)}/${this.pad(date.getMonth()+1, 1)}/${date.getFullYear()}`
        return date_str;
    }

    /**
     * Return date + days
     * @param {Number} days 
     * @returns date
     */
    addDays(days_param) {
        const days = days_param || 0;
        const base = "1997-10-07T00:00:00";
        const date = new Date(base);
        date.setDate(date.getDate() + days);
        return date;
    }

    /**
     * Returns a string with leading zero
     * @param {Number} num_param
     * @returns string
     */
    pad(num_param) {
        return String(num_param).length === 1 ? "0" + String(num_param) : String(num_param);
    }

    /**
     * Clear invalid characters and keep only numbers
     * @param {String} boleto_param 
     * @returns 
     */
    clear(boleto_param) {
        if (!boleto_param) {
            return "";
        }
        return boleto_param.replace(/[^0-9]+/g, "")
    }
}
module.exports = {
    BoletoHelpers
};