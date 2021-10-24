const { urlencoded } = require('express');
var express = require('express');
var router = express.Router();
const { Boleto } = require("../helpers/boleto-validator");

/* GET users listing. */
router.get('/:boleto', function(req, res, next) {
  const boleto = new Boleto();
  const boleto_num = decodeURI(req.params.boleto);
  let boletoObj = boleto.validate(boleto_num);
  const status = !/inválido/.test(boletoObj.status) ? 200 : 400;
  res.status(status).json(boletoObj).end()
});

module.exports = router;
