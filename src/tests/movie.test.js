const request = require('supertest');
const app = require('../app');
let server;
let id;

beforeAll(done => {
  server = app.listen(done);
});

afterAll(done => {
  server.close(done);
});

test('GET /movies debe traer todas las movies', async () => {
  const response = await request(server).get('/movies');
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una nueva pelicula', async () => {
  const newMovie = {
    name: 'Matrix',
    image: 'htttp://www.image.com',
    synopsis: 'dhskjlsjafds',
    releaseYear: 2000
  };
  const response = await request(app).post('/movies').send(newMovie);
  id = response.body.id;
  expect(response.status).toBe(201);
  expect(response.body.id).toBeDefined();
  expect(response.body.name).toBe(newMovie.name);
});

test('PUT /movies/:id debe actualizar una pelicula existente', async () => {
  const updatedMovie = {
    name: 'Matrix Actualizada'
  }
  const response = await request(app).put(`/movies/${id}`).send(updatedMovie);
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(id);
  expect(response.body.name).toBe(updatedMovie.name);
});

test('DELETE /movies/:id debe eliminar una pelicula existente', async () => {
  const response = await request(app).delete(`/movies/${id}`);
  expect(response.status).toBe(204);
});



test('POST /movies/:id/actors debe agregar un actor existente a una película', async () => {
  // Crear una nueva película
  const newMovie = {
    name: 'Matrix',
    image: 'htttp://www.image.com',
    synopsis: 'dhskjlsjafds',
    releaseYear: 2000
  };
  const movieResponse = await request(app).post('/movies').send(newMovie);
  const movieId = movieResponse.body.id;

  // Crear un nuevo actor
  const newActor = {
    firstName: 'Keanu',
    lastName: 'Reeves',
    nationality: 'USA',
    image: 'htttp://www.image.com',
    birthday: '1966-09-09'
  };
  const actorResponse = await request(app).post('/actors').send(newActor);
  const actorId = actorResponse.body.id;

  // Intentar asociar el actor con la película
  const response = await request(app).post(`/movies/${movieId}/actors`).send([actorId]);
  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: actorId }),
    ]),
  );
});

test('POST /movies/:id/directors debe agregar un director existente a una película', async () => {
  // Crear una nueva película
  const newMovie = {
    name: 'Matrix',
    image: 'htttp://www.image.com',
    synopsis: 'dhskjlsjafds',
    releaseYear: 2000
  };
  const movieResponse = await request(app).post('/movies').send(newMovie);
  const movieId = movieResponse.body.id;
  // Crear un nuevo director
  const newDirector = {
    firstName: 'Lana',
    lastName: 'Wachowski',
    nationality: 'USA',
    image: 'htttp://www.image.com',
    birthday: '1965-06-21'
  };
  const directorResponse = await request(app).post('/directors').send(newDirector);
  const directorId = directorResponse.body.id;
  // Intentar asociar el director con la película
  const response = await request(app).post(`/movies/${movieId}/directors`).send([directorId]);
  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: directorId }),
    ]),
  );
});

test('POST /movies/:id/genres debe agregar un género existente a una película', async () => {
  // Crear una nueva película
  const newMovie = {
    name: 'Matrix',
    image: 'htttp://www.image.com',
    synopsis: 'dhskjlsjafds',
    releaseYear: 2000
  };
  const movieResponse = await request(app).post('/movies').send(newMovie);
  const movieId = movieResponse.body.id;
  // Crear un nuevo género
  const newGenre = {
    name: 'Fantasy'
  };
  const genreResponse = await request(app).post('/genres').send(newGenre);
  const genreId = genreResponse.body.id;
  // Intentar asociar el género con la película
  const response = await request(app).post(`/movies/${movieId}/genres`).send([genreId]);
  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: genreId }),
    ]),
  );
});