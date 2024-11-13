/// <reference types="vite/client" />

// Vite env
interface ImportMetaEnv {
	readonly VITE_API_KEY: string;
	readonly VITE_TENANT_ID: string;
	readonly VITE_TENANT_NAME: string;
	readonly VITE_URL: string;
}
