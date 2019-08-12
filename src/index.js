const restify = require("restify");
const { temNome, resposta } = require("./functions");

const PORT = process.env.PORT || 3000;

const server = restify.createServer();

server.use((req, res, next) => {
  req.params.teste = "Next";
  next();
});

server.get("/", (req, res) =>
  res.send({ mensagem: "Restify Hello World!", ...req })
);

server.get("/mensagem/:nome", temNome, resposta);

server.get('/version/test', restify.plugins.conditionalHandler([
    {
      version: ['2.0.0', '2.1.0', '2.2.0'],
      handler: function (req, res, next) {
        res.send(200, {
          requestedVersion: req.version(),
          matchedVersion: req.matchedVersion()
        });
        return next();
      }
    }
  ]));

server.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
