const request = require('supertest');
const app = require('../app');

let id;

 test('GET /directors debe traer todos los directores', async () => {
  const response = await request(app).get('/directors');
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
})

test('POST /directors debe crear un nuevo director', async () => {
  const newDirector = {
    firstName: 'Guillermo',
    lastName: 'Del Toro',
    nationality: 'USA',
    image: 'htttp://www.image.com',
    birthday: '1966-09-09'
  };
  const response = await request(app).post('/directors').send(newDirector);
  id = response.body.id;
  expect(response.status).toBe(201);
  expect(response.body.id).toBeDefined();
  expect(response.body.firstName).toBe(newDirector.firstName);
});

test('PUT /directors/:id debe actualizar un director existente', async () => {
  const updatedDirector = {
    firstName: 'Guillermo Actualizado'
  }
  const response = await request(app).put(`/directors/${id}`).send(updatedDirector);
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(id);
  expect(response.body.firstName).toBe(updatedDirector.firstName);
});

test('DELETE /directors/:id debe eliminar un director existente', async () => {
  const response = await request(app).delete(`/directors/${id}`);
  expect(response.status).toBe(204);
});


