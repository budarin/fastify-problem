const fastifyPlugin = require("fastify-plugin");

const cookieContent = "sid-cookie-value";

const securityChecksPlugin = async (fastifyInstance) => {
  const checkSid = async (req, reply) => {
    const sidCookie = req.cookies["sid"];

    if (sidCookie !== undefined) {
      if (sidCookie !== cookieContent) {
        void reply.setCookie("sid", cookieContent);

        throw new Error("sid is not valid");
      }
    } else {
      void reply.setCookie("sid", cookieContent);

      throw new Error("sid not found");
    }
  };

  fastifyInstance.decorate("checkSid", checkSid);
};

module.exports = fastifyPlugin(securityChecksPlugin, {
  fastify: ">3.0.0",
  name: securityChecksPlugin.name,
});
