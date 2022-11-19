import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { app } from '../../app';
import User from '../../database/models/User';
import { mockUser } from './mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a Rota de Login', function () {
  afterEach(sinon.restore);

  it('Faz uma requisição sem body e espera retornar erro', async function() {
    const response = await chai
      .request(app)
      .post('/login')
      .send({});

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'fields missing' });
  });

  it('Faz uma requisição com username invalido e espera retornar erro', async function() {
    sinon.stub(User, 'findOne').resolves(null);
  
    const response = await chai
      .request(app)
      .post('/login')
      .send({
        username: 'username inválido',
        password: '1234567A'
      });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'invalid credentials' });
  });

  it('Faz uma requisição com password invalido e espera retornar erro', async function() {
    sinon.stub(User, 'findOne').resolves(mockUser);
  
    const response = await chai
      .request(app)
      .post('/login')
      .send({
        username: 'usuario',
        password: '1234567B'
      });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'invalid credentials' });
  });

  it('Faz uma requisição com sucesso e espera receber um token', async function() {
    sinon.stub(User, 'findOne').resolves(mockUser);
  
    const response = await chai
      .request(app)
      .post('/login')
      .send({
        username: 'usuario',
        password: '1234567A'
      });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
  });
})