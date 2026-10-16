const nextjest = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({
  path: ".env.development",
})

const createNextConfig = nextjest({
  dir: ".",
});

const jestConfig = createNextConfig({
  moduleDirectories: ['node_modules', '<rootDir>'],
});

module.exports = jestConfig;