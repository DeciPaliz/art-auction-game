import {
  Context,
  createContext as reactCreateContext,
  ReactNode,
  useContext,
} from 'react';

export function createContext<T>(
  initValue: T | (() => T),
  defaultValue?: T,
): [
  Context<T | null>,
  (props: { children: ReactNode }) => JSX.Element,
  () => T,
] {
  const context = reactCreateContext<T | null>(defaultValue ?? null);

  const provider = (props: { children: ReactNode }) => (
    <context.Provider
      value={initValue instanceof Function ? initValue() : initValue}
    >
      {props.children}
    </context.Provider>
  );

  const use = () => {
    const usedContext = useContext(context);
    if (usedContext === null) {
      throw new Error(`context isn't initialized`);
    }
    return usedContext;
  };

  return [context, provider, use];
}
