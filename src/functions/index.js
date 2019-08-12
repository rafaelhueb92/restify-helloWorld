module.exports = {
  temNome(req, res, next) {
    if (req.params.nome) next();
    else res.send("Inválido");
  },
  resposta(req, res, next) {
    res.send({ mensagem: `Fala ${req.params.nome}`, ...req.params });
    next();
  }
};
