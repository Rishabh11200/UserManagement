declare global {
  namespace NodeJS {
    interface ProcessEnv {
      URL: string;
      REFRESHSECRET: string;
      ACCESSSECRET: string;
      SESSIONKEY: string;
    }
  }
}

export {};
