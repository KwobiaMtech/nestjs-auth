import { TestClient } from './utils/test-client';

describe('AppController (e2e)', () => {
  let testClient: TestClient;

  beforeAll(async () => {
    testClient = new TestClient();
    await testClient.init();
  });

  afterAll(async () => {
    await testClient.close();
  });

  it('/ (POST) Admin Login Test', async () => {
    const login = await testClient.login('patrick@gmail.com', 'patrick');
    expect(login.token).toBeDefined();
    expect(login.refreshToken).toBeDefined();
  });
});
