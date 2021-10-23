const request = require("supertest")
const app = require("../app")
const { Boleto } = require("../helpers/boleto-validador")

/**
 * BOLETO TESTES
 * 
 * Boleto gerado 
 * http://www.sicadi.com.br/mhouse/boleto/boleto3.php?numero_banco=341-7&local_pagamento=PAG%C1VEL+EM+QUALQUER+BANCO+AT%C9+O+VENCIMENTO&cedente=Microhouse+Inform%E1tica+S%2FC+Ltda&data_documento=23%2F10%2F2021&numero_documento=DF+00113&especie=&aceite=N&data_processamento=23%2F10%2F2021&uso_banco=&carteira=179&especie_moeda=Real&quantidade=&valor=&vencimento=23%2F10%2F2021&agencia=0049&codigo_cedente=10201-5&meunumero=00010435&valor_documento=263%2C01&instrucoes=Taxa+de+visita+de+suporte%0D%0AAp%F3s+o+vencimento+R%24+0%2C80+ao+dia&mensagem1=&mensagem2=&mensagem3=ATEN%C7%C3O%3A+N%C3O+RECEBER+AP%D3S+15+DIAS+DO+VENCIMENTO&sacado=&Submit=Enviar
 * 
 */

describe('Boleto', () => {
    it('Boleto bancário é válido.', () => {
        const boleto = new Boleto();
        return boleto.validar('34191.79001 01043.510047 91020.150008 9 87820026300')
    })
    it('Boleto concessionárias é válido.', () => {
        const boleto = new Boleto();
        return boleto.validar('83640000003-7 16250048100-5 14329528611-4 00183609383-9')
    })
    it('Boleto bancário é inválido.', () => {
        const boleto = new Boleto();
        return boleto.validar('34191.79001 01043.510047 91020.150008 87820026300')
    })
    it('Boleto concessionárias é inválido.', () => {
        const boleto = new Boleto();
        return boleto.validar('83640000003-7 16250048100-5 14329528611-4 00183609383')
    })
    it('Boleto bancário caracter inválido.', () => {
        const boleto = new Boleto();
        return boleto.validar('34191.79001 01043.510047 91020.150008 87820026300')
    })
    it('Boleto concessionárias caracter inválido.', () => {
        const boleto = new Boleto();
        return boleto.validar('83640000003-7 16250048100-5 14329528611-4 00183609383')
    })
})
describe('Requisições', () => {
    it('Requesição válida.', () => {
        return false
    })
    it('Requesição inválida.', () => {
        return false
    })
})