import { Charla } from '../models/charla.js';
import { ApiError } from './apiError.js';
import { Page } from '../models/page.js';
import { API_BASE_URL } from './config.js';

const CHARLAS_URL = `${API_BASE_URL}/charlas`;

export async function list() { // Sin método es get por defecto
	const response = await fetch(`${CHARLAS_URL}`);
	const json = await response.json();
	if (!response.ok) {
		throw new ApiError(response.status, json.message);
	}

    // El JSON es un array de charlas, convertir de json array a js array
    const charlas = Page.fromJSON(json, 'data', Charla.fromJSON); // Buscas dentro de la raíz data

	return charlas;
}