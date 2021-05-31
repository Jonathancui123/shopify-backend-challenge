import superagent from "superagent";
import request from "supertest";

const agent = superagent.agent();
const testAccount = {
  firstName: "Tester",
  lastName: "McTest",
  email: "test@gmail.com",
  password: "test123",
};

const signup = (
  request: request.SuperTest<request.Test>,
  done: (agent: superagent.SuperAgentStatic & superagent.Request) => void
) => {
  request
    .post("/users")
    .send(testAccount)
    .end(function (err, res) {
      if (err) {
        throw err;
      }
      (agent as any).saveCookies(res);
      done(agent);
    });
};

export default signup;
