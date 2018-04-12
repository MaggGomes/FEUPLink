const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const app = require('../src/app.js');

chai.use(chaiHttp);

describe('Authentication', function() {
    describe('/POST signup user', () => {
        it('should fail with an invalid email address', (done) => {
            let user = {
                'name': 'teste1',
                'email': 'teste1',
                'hashedPassword': '123.4',
            };

            chai.request(app)
                .post('/signup')
                .send(user)
                .end((err, res) => {
                    // console.log(res.body.error);
                    expect(res).to.have.status(401);
                    done();
                });
        });

        it('should fail with an invalid password', (done) => {
            let user = {
                'name': 'teste1',
                'email': 'teste1@teste.teste',
                'hashedPassword': 'dj.@@a',
            };

            chai.request(app)
                .post('/signup')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(402);
                    done();
                });
        });

        it('should fail with an invalid registration information', (done) => {
            let user = {
                'name': 'teste@44ee',
                'email': 'teste@teste.teste',
                'hashedPassword': 'dj.@@a',
            };

            chai.request(app)
                .post('/signup')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                });
        });
    });
});

