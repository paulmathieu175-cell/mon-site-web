const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Préfixe un chemin de /public avec le basePath (utile sur GitHub Pages). */
export const asset = (path: string) => `${basePath}${path}`;
