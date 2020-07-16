const database = require('../../../utils/mocks/database');
const UserService = require('../userService');

beforeAll(async () => await database.connect());
afterEach(async () => await database.clearDatabase());
afterAll(async () => await database.closeDatabase());

describe('Service - User', () => {
  describe('Testing the class method create user', () => {
    it('Save a new User in the database', async () => {
      const newUser = {
        username: 'randomUser',
        email: 'unemail@email.com',
        password: 'sramAmdonF@12',
      };

      const userService = new UserService();
      const result = await userService.createUser({ user: newUser });
      expect(result).toHaveProperty('_id');
    });
  });
});
