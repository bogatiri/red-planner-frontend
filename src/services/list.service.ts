import type { IListResponse, TypeListFormState } from '@/types/list.types'

import { axiosWithAuth } from '@/api/interceptors'

interface IListOrderUpdate {
	id: string
	order: number
}

class ListService {
	private BASE_URL = '/user/lists'

	async getListById(id: string) {
    const response = await axiosWithAuth.get<IListResponse[]>(`${this.BASE_URL}/${id}`)
    return response.data
  }

	async getLists() {
		const response = await axiosWithAuth.get<IListResponse[]>(this.BASE_URL)
		return response
	}

	async createList(data: TypeListFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateList(id: string, data: TypeListFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async updateOrder(listsWithNewOrder: IListOrderUpdate[]) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/update-order`, {
			lists: listsWithNewOrder
		})
		return response
	}

	async copyList({listId, boardId} : {listId: string, boardId: string}){
		const response = await axiosWithAuth.post(`${this.BASE_URL}/copy`, {listId, boardId})
		return response
	}

	async deleteList(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const listService = new ListService()
