const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app.js');

chai.use(chaiHttp);

describe('Authentication', function() {
    describe('/POST signup user', () => {
        it('should fail with an invalid email address', (done) => {
            let user = {
                'name': 'teste1',
                'email': 'teste1',
                'hashedPassword': '123.4'
            };

            const should = chai.should();

            chai.request(app)
                .post('/signup')
                .send(user)
                .end((err, res) => {
                    //console.log(res.body.error);
                    res.should.have.status(401);
                    done();
                });
        });

        it('should fail with an invalid password', (done) => {
            let user = {
                'name': 'teste1',
                'email': 'teste1@teste.teste',
                'hashedPassword': 'dj.@@a'
            };

            const should = chai.should();

            chai.request(app)
                .post('/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(402);
                    done();
                });
        });

        it('should fail with an invalid registration information', (done) => {
            let user = {
                'name': 'teste@44ee',
                'email': 'teste@teste.teste',
                'hashedPassword': 'dj.@@a'
            };

            const should = chai.should();

            chai.request(app)
                .post('/signup')
                .send(user)
                .end((err, res) => {
                    if(err)
                        res.should.have.status(403);

                    res.should.have.status(403);
                    done();
                });
        });
    });
});






