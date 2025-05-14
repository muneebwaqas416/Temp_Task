const { defineConfig } = require("vite");
const config = require("./src/villas");
const react = require("@vitejs/plugin-react-swc");
const airdrop_interface_markets = require('airdrop-interface-markets');

module.exports = defineConfig({
  plugins: [react(), airdrop_interface_markets()],
});
