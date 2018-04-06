const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app.js');

chai.use(chaiHttp);

describe('Authentication', function() {
    it('should be a first test', function() {
        chai.request(app)
            .post('/signin')
            .end((err, res) => {

            });
    });
});
