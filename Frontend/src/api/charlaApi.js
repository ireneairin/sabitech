import { Charla } from '../models/charla.js';
import { ApiError } from './ApiError.js';
import { Page } from '../models/page.js';

const API_BASE_URL = 'http://localhost:8080/api'; //parte común en una variable de entorno
const CHARLAS_URL = `$ {API_BASE_URL}/charlas`;

export async function list() { //sin método es get por defecto
	const response = await fetch(`${CHARLAS_URL}`);
	const json = await response.json();
	if (!response.ok) {
		throw new ApiError(response.status, json.message);
	}

    // El JSON es un array de charlas, convertir de json array a js array
    const charlas = Page.fromJSON(json, 'data', Charla.fromJSON); //buscas dentro de la raíz data

	return charlas;
}

/*export async function getById(id) {
	const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
		headers: { Authorization: `Bearer ${getToken()}` },
	});
	const json = await response.json();
	if (!response.ok) {
		throw new ApiError(response.status, json.message);
	}

	return Todo.fromJSON(json);
}

export async function add(todo) {
	const response = await fetch(`${API_BASE_URL}/todos/add`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken()}`,
		},
		body: JSON.stringify(todo),
	});
	const json = await response.json();
	if (!response.ok) {
		throw new ApiError(response.status, json.message);
	}

	return Todo.fromJSON(json);
}

export async function update(todo) {
	const response = await fetch(`${API_BASE_URL}/todos/${todo.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken()}`,
		},
		body: JSON.stringify({ todo: todo.text, completed: todo.completed }),
	});
	const json = await response.json();
	if (!response.ok) {
		throw new ApiError(response.status, json.message);
	}

	return Todo.fromJSON(json);
}

export async function remove(id) {
	const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${getToken()}` },
	});
	const json = await response.json();
	if (!response.ok) {
		throw new ApiError(response.status, json.message);
	}

	return json;
}
*/