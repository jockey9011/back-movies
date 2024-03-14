const request = require('supertest');
const app = require('../app');

let id;

 test('GET /actors debe traer todos los actores', async () => {
  const response = await request(app).get('/actors');
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
})

test('POST /actors debe crear un nuevo genero', async () => {
  const newActor = {
    firstName: 'Adam',
    lastName: 'Sandler',
    nationality: 'USA',
    image: 'htttp://www.image.com',
    birthday: '1966-09-09'
  };
  const response = await request(app).post('/actors').send(newActor);
  id = response.body.id;
  expect(response.status).toBe(201);
  expect(response.body.id).toBeDefined();
  expect(response.body.firstName).toBe(newActor.firstName);
});

test('PUT /actors/:id debe actualizar un actor existente', async () => {
  const updatedActor = {
    firstName: 'Adam Actualizado'
  }
  const response = await request(app).put(`/actors/${id}`).send(updatedActor);
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(id);
  expect(response.body.firstName).toBe(updatedActor.firstName);
});


test('DELETE /actors/:id debe eliminar un actor existente', async () => {
  const response = await request(app).delete(`/actors/${id}`);
  expect(response.status).toBe(204);
});

 
