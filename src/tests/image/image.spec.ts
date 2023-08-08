import { app } from '../../index';
import request from 'supertest';

describe('GET /images', () => {
  it('should get fjord image', async (done) => {
    request(app)
      .get('/images?filename=fjord')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'image/jpeg')
      .expect(200, done);
  });
});
