declare global {
  namespace NodeJS {
    interface ProcessEnv {
      URL: string;
      SECRET: string;
      SESSIONKEY: string;
    }
  }
}

export {};
