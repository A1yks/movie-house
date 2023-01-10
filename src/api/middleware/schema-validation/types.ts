export type ValidationConfig =
    | {
          validateBody?: true;
          validateParams?: false;
          validateQuery?: false;
      }
    | {
          validateBody?: false;
          validateParams?: true;
          validateQuery?: false;
      }
    | {
          validateBody?: false;
          validateParams?: false;
          validateQuery?: true;
      };
