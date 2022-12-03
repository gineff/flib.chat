import Provider from "utils/provider";

export interface ContextProviderInterface extends Provider {
  context: Record<string, unknown>
}

export const useContext = (provider: any) => provider.context;

export default function createContext(outerProps?: P) {
  return class ContextProvider extends Provider {
    static context: P = outerProps ? outerProps : ({} as P);
    constructor(props: P&{children: string}) {
      const { children, ...rest } = props;
      (true || children)
      ContextProvider.context = { ...ContextProvider.context, ...rest };
      super({ ...props, ...outerProps });
    }
  };
}
