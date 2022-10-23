import Provider from "utils/provider";

//ToDo "ContextProvider" относится к значению, но здесь используется как тип. Возможно, вы имели в виду "typeof ContextProvider"?
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const useContext = (provider: ContextProvider) => provider.context;

export default function createContext(outerProps?: P) {

  return class ContextProvider extends Provider {
    static context: Record<string, unknown>
    constructor(props: P) {
      super({...props, ...outerProps});
      ContextProvider.context = { ...ContextProvider.context, ...this.props };
    }
  }
}
