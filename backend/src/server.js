const http = require("http");
const app = require("./app");
const { port, env } = require("./config/env");
const { logger } = require("./config/logger");

const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`Server running on http://localhost:${port} in ${env} mode`);
});