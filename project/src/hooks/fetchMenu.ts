import { apiKey, url } from "../types";

export async function fetchMenu<T>(apiKey: apiKey, url: url): Promise<T | []> {

	const settings = {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"x-zocom": apiKey,
		},
	};

    try {
		const response: Response = await fetch(url + "/menu", settings);
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const result = await response.json();

		if (result && result.items) {
			return result.items as T;
		} else {
			return [];
		}
	} catch (error) {
		console.error("Error:", error);
		return [];
	}
}
