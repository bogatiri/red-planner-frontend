import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { cardService } from '@/services/card.service'
import { ICardResponse } from '@/types/card.types'

interface ICardOrderUpdate {
	id: string
	order: number
}

export function useUpdateOrderCard() {
	const queryClient = useQueryClient()

	const { mutate: updateOrderCard, isPending } = useMutation({
		mutationKey: ['update order card'],
		mutationFn: ( reorderedCards: ICardResponse[] ) =>
			cardService.updateOrder(reorderedCards),
		onSuccess: data => {
			console.log('data', data.data)
			toast.success(`Card reordered`)
			queryClient.invalidateQueries({ queryKey: ['list'] })
		},
		onError(error: unknown) {
			if (isAxiosError(error)) {
				const message = error.response?.data?.message || 'An error occurred'
				toast.error(message)
			} else {
				toast.error('An error occurred')
			}
		}
	})
	return { updateOrderCard, isPending }
}
