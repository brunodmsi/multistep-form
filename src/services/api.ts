import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3001',
	timeout: 15000
})

export const getDraftByPrimaryId = (primaryId: string) => {
	return api.get(`drafts?primary_id=${primaryId}`)
}

export const getPrimaryById = (id: string) => {
	return api.get(`primaries/${id}`)
}

export const updateDraft = (id: string, data: any) => {
	return api.put(`drafts/${id}`, data);
}
