import 'dotenv/config';
import conectarAoBanco from "../config/dbConfig.js";
import { ObjectId } from "mongodb";

// Estabelece a conexão com o banco de dados usando a string de conexão obtida do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
  // Seleciona o banco de dados "imersao-instabytes"
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Busca todos os documentos (posts) da coleção e retorna como um array
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados
export async function criarPost(novoPost) {
  // Seleciona o banco de dados "imersao-instabytes"
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Insere um novo documento (post) na coleção e retorna um objeto com informações sobre a inserção
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id,novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}
