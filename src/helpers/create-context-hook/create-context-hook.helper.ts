import * as React from 'react';

type CreateHookOptions<TContext> = {
	name: string;
	context: React.Context<TContext>;
};

/**
 * @description
 * Use this helper to create a hook that uses a specific context.
 */
export const createContextHook = <TContext>(options: CreateHookOptions<TContext>) => {
	const { name, context } = options;

	const useHook = () => {
		const provided = React.useContext<TContext>(context);

		if (!provided) {
			throw new Error(`Trying to use ${name} hook out of its context.`);
		}

		return provided;
	};

	Object.defineProperty(useHook, 'name', { value: `use-${name}-context-provider` });

	return useHook;
};
