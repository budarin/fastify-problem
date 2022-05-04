const Fastify = require("fastify");
const cookiePlugin = require("@fastify/cookie");
const securityChecksPlugin = require("./plugin");

const app = Fastify({ logger: true });

app.register(cookiePlugin, { secret: [`key1`] }).register(securityChecksPlugin);

app.ready(() => {
  console.error(app.printPlugins());
});

app.route({
  method: "GET",
  url: "/",

  //   onRequest: app.checkSid,

  onRequest: (req, reply, done) => {
    void app.checkSid(req, reply).then(
      () => done(),
      (err) => done(err)
    );
  },

  handler: async (req) => {
    return { hello: "world" };
  },
});

const startServer = async () => {
  try {
    const address = "localhost";
    await app.listen(3000, address);
  } catch (error) {
    process.exit(1);
  }
};

void startServer();
