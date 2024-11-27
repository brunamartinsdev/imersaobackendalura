// Importa o framework Express para construir a API
import express from "express";
// Importa o Multer para lidar com requisições multipart/form-data (envio de arquivos)
import multer from "multer";
// Importa funções para lidar com requisições POST do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOption = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento para o Multer
const storage = multer.diskStorage({
  // Define o diretório para armazenar os arquivos enviados
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo enviado
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Configuração alternativa para ambientes Linux/Mac (não recomendada para produção)
// const upload = multer({ dest: "./uploads" }); // Usa o armazenamento padrão (sem controle de nomes)

// Define as rotas da API
const routes = (app) => {
  // Habilita o analisador de dados JSON para lidar com requisições JSON
  app.use(express.json());
  app.use(cors(corsOption));

  // Rota GET para listar todos os posts (implementada na função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (implementada na função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (utilizando upload.single("imagem") e a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};


// Exporta a função de rotas para ser usada no arquivo principal da aplicação
export default routes;