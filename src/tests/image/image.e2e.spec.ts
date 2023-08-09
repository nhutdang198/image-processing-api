import { app } from '../../index';
import request from 'supertest';

describe('GET /images enpoint testing', () => {
  it('should get fjord image', async () => {
    await request(app)
      .get('/images?filename=fjord')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'image/jpeg');
  });

  it('should get fjord image with specific width and height', async () => {
    await request(app)
      .get('/images?filename=fjord&width=500&height=500')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', 'image/jpeg');
  });

  it('should throw image not found error', async () => {
    const response = await request(app)
      .get('/images?filename=noimage')
      .set('Accept', 'application/json')
      .expect(404);
    expect(response.text).toEqual('image not found');
  });

  it('should throw height validation error', async () => {
    const response = await request(app)
      .get('/images?filename=fjord&height=abc')
      .set('Accept', 'application/json')
      .expect(400);
    expect(response.body[0]?.constraints?.isNumber).toEqual(
      'height must be a number conforming to the specified constraints'
    );
    expect(response.body[0]?.constraints?.min).toEqual(
      'height must not be less than 0'
    );
  });

  it('should throw width validation error', async () => {
    const response = await request(app)
      .get('/images?filename=fjord&width=abc')
      .set('Accept', 'application/json')
      .expect(400);
    expect(response.body[0]?.constraints?.isNumber).toEqual(
      'width must be a number conforming to the specified constraints'
    );
    expect(response.body[0]?.constraints?.min).toEqual(
      'width must not be less than 0'
    );
  });
});
