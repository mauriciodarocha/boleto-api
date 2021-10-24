const request = require("supertest");
const app = require("../app");
const { Boleto } = require("../helpers/boleto-validator");

/**
 * BOLETO TESTES
 * 
 * Boleto gerado 
 * http://www.sicadi.com.br/mhouse/boleto/boleto3.php?numero_banco=341-7&local_pagamento=PAG%C1VEL+EM+QUALQUER+BANCO+AT%C9+O+VENCIMENTO&cedente=Microhouse+Inform%E1tica+S%2FC+Ltda&data_documento=23%2F10%2F2021&numero_documento=DF+00113&especie=&aceite=N&data_processamento=23%2F10%2F2021&uso_banco=&carteira=179&especie_moeda=Real&quantidade=&valor=&vencimento=23%2F10%2F2021&agencia=0049&codigo_cedente=10201-5&meunumero=00010435&valor_documento=263%2C01&instrucoes=Taxa+de+visita+de+suporte%0D%0AAp%F3s+o+vencimento+R%24+0%2C80+ao+dia&mensagem1=&mensagem2=&mensagem3=ATEN%C7%C3O%3A+N%C3O+RECEBER+AP%D3S+15+DIAS+DO+VENCIMENTO&sacado=&Submit=Enviar
 * 
 */

describe('Boleto (Validação)', () => {
    it('Boleto bancário é válido.', () => {
        const boleto = new Boleto();
        const boletoObj = boleto.validate('34191.79001 01043.510047 91020.150008 9 87820026300')
        const boletoObjMock = {
            barcode: "34191790010104351004791020150008987820026300",
            amount: "263,00",
            expirationDate: "23/10/2021",
            status: "Boleto válido."
        }
        return expect(boletoObj).toMatchObject(boletoObjMock);
    })
    it('Boleto bancário é inválido. (digito verificador)', () => {
        const boleto = new Boleto();
        const boletoObj = boleto.validate('34191.79002 01043.510047 91020.150008 9 87820026300')
        const boletoObjMock = {
            barcode: "34191790020104351004791020150008987820026300",
            status: "Boleto inválido."
        }
        return expect(boletoObj).toMatchObject(boletoObjMock);
    })
    it('Boleto bancário é inválido. (linha digitavel < 44)', () => {
        const boleto = new Boleto();
        const boletoObj = boleto.validate('34191.79001 01043.510047 91020.150008 87820026300')
        const boletoObjMock = {
            barcode: "3419179001010435100479102015000887820026300",
            status: "Boleto inválido."
        }
        return expect(boletoObj).toMatchObject(boletoObjMock);
    })
    it('Boleto concessionárias é válido.', () => {
        const boleto = new Boleto();
        const boletoObj = boleto.validate('83680000003-3 00230048100-5 22218056921-2 00183609383-9')
        const boletoObjMock = {
            barcode: "836800000033002300481005222180569212001836093839",
            amount: "300,23",
            status: "Boleto válido."
        }
        return expect(boletoObj).toMatchObject(boletoObjMock);
    })
    it('Boleto concessionárias é inválido.', () => {
        const boleto = new Boleto();
        const boletoObj = boleto.validate('83680000003 00230048100-5 22218056921-2 00183609383-9')
        const boletoObjMock = {
            barcode: "83680000003002300481005222180569212001836093839",
            status: "Boleto inválido."
        }
        return expect(boletoObj).toMatchObject(boletoObjMock);
    })
})
describe('Requisições (HTTP)', () => {
    it('Requisição válida.', () => {
        const boleto_num = '34191.79001 01043.510047 91020.150008 9 87820026300';
        const boletoObjMock = {
            barcode: "34191790010104351004791020150008987820026300",
            amount: "263,00",
            expirationDate: "23/10/2021",
            status: "Boleto válido."
        }
        return request(app)
                .get(`/boleto/${boleto_num}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body).toMatchObject(boletoObjMock)
                })
    })
    it('Requisição inválida.', () => {
        const boleto_num = '34191.79001 01043.510047 91020.150008 87820026300';
        const boletoObjMock = {
            barcode: "3419179001010435100479102015000887820026300",
            status: "Boleto inválido."
        }
        return request(app)
                .get(`/boleto/${boleto_num}`)
                .expect('Content-Type', /json/)
                .expect(400)
                .then((response) => {
                    expect(response.body).toMatchObject(boletoObjMock)
                })
    })
})