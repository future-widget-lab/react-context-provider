# @future-widget-lab/react-context-provider

A helper for creating React providers with an associated custom hook. It allows defining shared state logic in a structured way while maintaining type safety.

## Features

- Simplifies context creation with an intuitive API.
- Encapsulates state logic inside `useGetState` for clarity.
- Generates both a Context Provider and a hook for easy consumption.
- Supports TypeScript for strong typing.
- Supports render props for greater flexibility.

## Installation

```sh
npm install @future-widget-lab/react-context-provider
```

## Usage

### Basic Example

```tsx
import { createContextProvider } from '@future-widget-lab/react-context-provider';

const { ContextProvider: CounterProvider, hook: useCounter } = createContextProvider({
  name: 'counter',
  useGetState: () => {
    const [count, setCount] = React.useState(0);

    const increment = () => setCount((prev) => prev + 1);

    const decrement = () => setCount((prev) => prev - 1);

    const reset = () => setCount(0);

    return { count, increment, decrement, reset };
  }
});
```

### Using the Provider

```tsx
const App: FC = () => {
  return (
    <CounterProvider>
      <CounterComponent />
    </CounterProvider>
  );
};
```

### Using the Hook

```tsx
const CounterComponent: FC = () => {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <section style={{ textAlign: 'center' }}>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </section>
  );
};
```

### Using Render Props

```tsx
const App: FC = () => {
  return (
    <CounterProvider>
      {({ count, increment, decrement, reset }) => {
        return (
          <section style={{ textAlign: 'center' }}>
            <h1>Counter: {count}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Reset</button>
          </section>
        );
      }}
    </CounterProvider>
  );
};
```

## API Reference

### `createContextProvider(options: CreateContextProviderOptions<TContext, TProps>)`

Creates a new context provider with an associated hook.

#### Options

| Option        | Type                          | Description                                                  |
| ------------- | ----------------------------- | ------------------------------------------------------------ |
| `name`        | `string`                      | The name of the context provider, used for debugging.        |
| `useGetState` | `(props: TProps) => TContext` | A custom hook that returns the shared state for the context. |

### Returned Values

| Return Value      | Type               | Description                                                                               |
| ----------------- | ------------------ | ----------------------------------------------------------------------------------------- |
| `ContextProvider` | `React.FC<TProps>` | The generated context provider component. Supports both direct children and render props. |
| `hook`            | `() => TContext`   | A hook to access the context values.                                                      |

## License

MIT
