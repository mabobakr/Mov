const lib = require('../auth');
const jwt = require('jsonwebtoken');

describe('json web tokens', ()=> {
  it('should return a valid json web token', () => {
    const token = lib.token();
    const result = jwt.verify(token, 'privatekey');
    expect(result).toMatchObject({id:'lol xD'});
  });
});