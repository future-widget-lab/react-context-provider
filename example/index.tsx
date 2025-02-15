import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createContextProvider } from '../.';

const { ContextProvider: CounterProvider, hook: useCounter } = createContextProvider({
	name: 'counter',
	useGetState: () => {
    console.count("render:CounterProvider");

		const [count, setCount] = React.useState(0);

		const increment = () => setCount((prev) => prev + 1);

		const decrement = () => setCount((prev) => prev - 1);

		const reset = () => setCount(0);

		return { count, increment, decrement, reset };
	}
});

const NotAffectedCounter: React.FC = () => {
	const [count, setCount] = React.useState(0);

	const increment = () => setCount((prev) => prev + 1);

	const decrement = () => setCount((prev) => prev - 1);

	const reset = () => setCount(0);

  console.count("render:NotAffectedCounter");

	return (
		<section style={{ textAlign: 'center' }}>
			<h1>Counter: {count}</h1>
			<button onClick={increment}>+</button>
			<button onClick={decrement}>-</button>
			<button onClick={reset}>Reset</button>
		</section>
	);
};

const Counter: React.FC = () => {
	const { count, increment, decrement, reset } = useCounter();

  console.count("render:Counter");

	return (
		<section style={{ textAlign: 'center' }}>
			<h1>Counter: {count}</h1>
			<button onClick={increment}>+</button>
			<button onClick={decrement}>-</button>
			<button onClick={reset}>Reset</button>
		</section>
	);
};

const App: React.FC = () => {
	return (
		<CounterProvider>
			<Counter />
			<NotAffectedCounter />
		</CounterProvider>
	);
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
