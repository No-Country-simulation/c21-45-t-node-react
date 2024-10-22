import { Command } from "commander";

const commandLine = new Command();
commandLine.option("--mode <mode>").option("--port <port>");
commandLine.parse();
const clOptions = commandLine.opts();

const mode = clOptions.mode || "dev";

const config = {
  MODE: mode,
  MODO: mode == "dev" ? "Desarrollo" : "Produccion",
  IP: "localhost",
  PORT: process.env.PORT || clOptions.port || 3000,
  get URL() {
    return `http://${this.IP}:${this.PORT}`;
  },
  SECRET: process.env.SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,

  GMAIL_APP_USER: process.env.GMAIL_APP_USER,
  GMAIL_APP_PASS: process.env.GMAIL_APP_PASS,

  CLOUD_NAME: process.env.CLOUD_NAME || "dt2v9rbk0",
  CLOUD_KEY: process.env.CLOUD_KEY || "987739829919385",
  CLOUD_SECRET: process.env.CLOUD_SECRET || "UH-STdRT_mVF_WTSghHuDiSE4Xc",
};

export const MIN_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_NUMBER = 1;
export const MIN_PAGE_SIZE = 1;
export const DEFAULT_PAGE_SIZE = 9;
export const MAX_PAGE_SIZE = 100;

export default config;
