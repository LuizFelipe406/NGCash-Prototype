import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { app } from '../../app';
import JWT from '../../auth/JWT';
import Account from '../../database/models/Account';
import User from '../../database/models/User';
import TransactionModel from '../../database/models/Transaction';
import { mockUser, mockUser2, mockAccount, mockTransaction } from './mock';
import sequelize from '../../database/models';
import { Transaction } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota de transações', function() {
  const expectedTransaction = {
    id: mockTransaction.id,
    creditedAccountId: mockTransaction.creditedAccountId,
    debitedAccountId: mockTransaction.debitedAccountId,
    value: mockTransaction.value,
    createdAt: mockTransaction.createdAt.toISOString()
  }

  describe('Testa a rota de cadastro de transação', function() {
    afterEach(sinon.restore);

    it('Faz uma requisição com token inválido e espera retornar um erro', async function () {
      const response = await chai
        .request(app)
        .post('/transaction')
        .set('authorization', '');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'invalid token' });
    });

    it('Faz um requisição com um usuario inexistente e espera retornar um erro', async function() {
      sinon.stub(JWT, 'validateToken').returns(mockUser.id);
      sinon.stub(User, 'findOne').resolves(null);

      const response = await chai
        .request(app)
        .post('/transaction')
        .set('authorization', 'token válido')
        .send({
          username: 'usuario inexistente',
          value: 10
        });

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: "user not found" });
    });

    it('Faz um requisição sem value e espera retornar um erro', async function() {
      sinon.stub(JWT, 'validateToken').returns(mockUser.id);
      sinon.stub(User, 'findOne').resolves(mockUser);

      const response = await chai
        .request(app)
        .post('/transaction')
        .set('authorization', 'token válido')
        .send({
          username: 'usuario',
        });

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: "fields missing" });
    });

    it('Faz um requisição de transferencia para si próprio e espera retornar um erro', async function() {
      sinon.stub(JWT, 'validateToken').returns(mockUser.id);
      sinon.stub(User, 'findOne').resolves(mockUser);

      const response = await chai
        .request(app)
        .post('/transaction')
        .set('authorization', 'token válido')
        .send({
          username: 'usuario',
          value: 10
        });

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.equal({ message: "invalid transfer" });
    });

    it('Faz um requisição de transferencia sem fundos disponiveis e espera retornar um erro', async function() {
      sinon.stub(JWT, 'validateToken').returns(mockUser.id);
      sinon.stub(User, 'findOne').onFirstCall().resolves(mockUser2).onSecondCall().resolves(mockUser);
      sinon.stub(Account, 'findOne').resolves(mockAccount);

      const response = await chai
        .request(app)
        .post('/transaction')
        .set('authorization', 'token válido')
        .send({
          username: 'usuario',
          value: 20
        });

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: "invalid funds" });
    });

    it('Faz um requisição de transferencia com sucesso e espera retornar uma nova transaction', async function() {
      sinon.stub(JWT, 'validateToken').returns(mockUser.id);
      sinon.stub(User, 'findOne').onFirstCall().resolves(mockUser2).onSecondCall().resolves(mockUser);
      sinon.stub(Account, 'findOne').resolves(mockAccount);
      sinon.stub(sequelize, 'transaction').resolves(mockTransaction as unknown as Transaction);

      const response = await chai
        .request(app)
        .post('/transaction')
        .set('authorization', 'token válido')
        .send({
          username: 'usuario',
          value: 5
        });

        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.deep.equal(expectedTransaction);
    });
  });

  describe('Testa rota de buscar transações', function() {
    it('Faz uma requisição com token inválido e espera retornar um erro', async function () {
      const response = await chai
        .request(app)
        .get('/transaction')
        .set('authorization', '');

        expect(response.status).to.be.equal(401);
        expect(response.body).to.be.deep.equal({ message: 'invalid token' });
    });

    it('Faz uma requisição e espera retornar as transações do usuario', async function () {
      sinon.stub(JWT, 'validateToken').returns(mockUser.id);
      sinon.stub(User, 'findOne').resolves(mockUser);
      sinon.stub(TransactionModel, 'findAll').resolves([mockTransaction]);

      const response = await chai
        .request(app)
        .get('/transaction')
        .set('authorization', '');

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal([{
          ...expectedTransaction,
          creditedUsername: 'usuario',
          debitedUsername: 'usuario'
        }]);
    });
  });
})