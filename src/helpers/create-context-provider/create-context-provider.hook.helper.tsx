import type { FC } from 'react';
import * as React from 'react';
import { createContextHook } from '../create-context-hook/create-context-hook.helper';

export type CreateContextProviderOptions<TContext, TProps = unknown> = {
	/**
	 * @description
	 * Use this to indicate the name which will be used to identify this context provider.
	 *
	 * @example
	 * const { ContextProvider: CartProvider, hook: useCart } = createContextProvider({
	 *  name: "cart",
	 *  // ...
	 * });
	 *
	 * // The provider will be identified as `cart-context-provider` in the React component tree.
	 */
	name: string;
	/**
	 * @description
	 * Use this to generate the state that will be shared using this context provider.
	 *
	 * @example
	 * const { ContextProvider: CounterProvider, hook: useCounter } = createContextProvider({
	 *  name: "counter",
	 *  useGetState: () => {
	 *    const [count, setCount] = React.useState(0);
	 *
	 *    const increment = () => setCount((prev) => prev + 1);
	 *
	 *    const decrement = () => setCount((prev) => prev - 1);
	 *
	 *    const reset = () => setCount(0);
	 *
	 *    return { count, increment, decrement, reset };
	 *  }
	 * });
	 */
	useGetState: (props: TProps) => TContext;
};

type ChildrenOrRenderPropChildren<TData> =
	| React.ReactNode
	| Array<React.ReactNode>
	| ((props: TData) => React.ReactNode | Array<React.ReactNode>);

export const createContextProvider = <TContext, TProps = unknown>(
	options: CreateContextProviderOptions<TContext, TProps>
) => {
	const { name, useGetState } = options;

	const context = React.createContext<TContext>({} as TContext);

	type ContextProviderProps = TProps & { children: ChildrenOrRenderPropChildren<TContext> };

	const ContextProvider: FC<ContextProviderProps> = ({ children, ...rest }) => {
		const state = useGetState(rest as TProps);

		return (
			<context.Provider value={state}>{typeof children === 'function' ? children(state) : children}</context.Provider>
		);
	};

	const hook = createContextHook({ name, context });

	ContextProvider.displayName = `${name}-context-provider`;

	return { ContextProvider, hook };
};
