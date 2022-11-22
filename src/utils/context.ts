import Provider from "utils/provider";

//ToDo "ContextProvider" относится к значению, но здесь используется как тип. Возможно, вы имели в виду "typeof ContextProvider"?
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const useContext = (provider: ContextProvider) => provider.context;

export default function createContext(outerProps?: P) {
  return class ContextProvider extends Provider {
    static context: P = outerProps ? outerProps : ({} as P);
    constructor(props: P) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children, ...rest } = props;
      ContextProvider.context = { ...ContextProvider.context, ...rest };
      super({ ...props, ...outerProps });
    }
  };
}
