import express from "express";
import cors from "cors";
import routesV1 from "./routes/routesV1";
//cors é uma função/classe que fica entre a requisição e a controller, "é o porteiro da aplicação"-middleware
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

app.use(
  cors({
    origin: ["*"],
  })
);

app.use("/api/v1", routesV1);

app.get("/", (req, res) => {
  res.status(200).json(
    JSON.stringify({
      message: "Hello World!",
    })
  );
});

app.use((req, res) => {
  res.status(404).json(
    JSON.stringify({
      error: "Not Found",
      message: "Rota não encontrada.",
    })
  );
});

app.listen(process.env.PORT, () => {
  console.log(
    `Servidor executando em: ${process.env.HOST}: ${process.env.PORT}`
  ); //sempre que for acessar algo presente no .env, usar process.env.[o que for desejado]
});
