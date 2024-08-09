import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {

	if (!locals.user) {
		return
	}

	return {
		user: locals.user!
	}
}) satisfies LayoutServerLoad;
