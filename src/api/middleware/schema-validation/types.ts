export type ValidationConfig =
    | {
          validateBody?: true;
          validateParams?: false;
      }
    | {
          validateBody?: false;
          validateParams?: true;
      };
