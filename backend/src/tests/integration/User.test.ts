import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { app } from '../../app';
import Account from '../../database/models/Account';
import User from '../../database/models/User';
import mockUser from './mockUser';
import sequelize from '../../database/models/index';
import { Transaction } from 'sequelize';
import JWT from '../../auth/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para rota de usuario', function () {
  describe('Testes para rota de criação de usuario', function () {
    afterEach(sinon.restore);
    it('Faz uma requisição com username inválido e espera retorar um erro', async function () {
      const response = await chai
        .request(app)
        .post('/user')
        .send({
          username: 'a',
          password: '1234567A',
        });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: '"username" length must be at least 3 characters long' });
    });

    it('Faz uma requisição com password inválido e espera retorar um erro', async function () {
      const response = await chai
        .request(app)
        .post('/user')
        .send({
          username: 'abc',
          password: '1234567a',
        });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: '"password" with value "1234567a" fails to match the required pattern: /^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$/' });
    });

    it('Faz uma requisição com username já cadastrado e espera retorar um erro', async function () {
      sinon.stub(User, "findOne").resolves(mockUser);
  
      const response = await chai
        .request(app)
        .post('/user')
        .send({
          username: 'username',
          password: '1234567A',
        });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'username already used' });
    });

    it('Faz uma requisição com sucesso e espera retornar o id do usuario cadastrado', async function() {
      sinon.stub(User, "findOne").resolves(null);
      sinon.stub(sequelize, 'transaction').resolves(mockUser as unknown as Transaction);
      sinon.stub(Account, 'create').resolves(undefined);
      sinon.stub(User, 'create').resolves(mockUser);

      const response = await chai
        .request(app)
        .post('/user')
        .send({
          username: 'username',
          password: '1234567A',
        });

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({ id: mockUser.id });
    });
  });

  describe('Testes para rota de buscar um usuario', function () {
    it('Faz uma requisição com token inválido e espera retornar um erro', async function () {
      const response = await chai
        .request(app)
        .get('/user')
        .set('authorization', '');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'invalid token' });
    });

    it('Faz uma requisição com sucesso e espera retornar um usuario', async function () {
      sinon.stub(JWT, 'validateToken').returns(mockUser.id);
      sinon.stub(User, 'findOne').resolves(mockUser);

      const response = await chai
        .request(app)
        .get('/user')
        .set('authorization', '');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
          username: mockUser.username,
          password: mockUser.password,
          accountId: mockUser.accountId,
          id: mockUser.id,
        });
    });
  })
})