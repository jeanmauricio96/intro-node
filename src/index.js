const express = require("express");
const { response } = require("express");
const app = express();

app.use(express.json());

const { uuid } = require("uuidv4");

const projects = [];

/**
 * Métodos HTTP:
 *
 * GET: Buscar informação do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * DELETE: Deletar uma informção no back-end
 */

/**
 * Tipos de Parâmetros:
 *
 * Query Params: Filtros de paginação
 * Route Params: Identificar Recursos (atualizar/deletar)
 * Request Params: Conteúdo na hora de criar ou editar um recurso
 */

app.get("/projects", (request, response) => {
  return response.json(projects);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

//http://localhost:3333/projects/2

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
  return response.json(["projeto 2", "projeto 3"]);
});

const port = 3333;

app.listen(3333, () => {
  console.log(`Server up and running on PORT ${port}`);
});
