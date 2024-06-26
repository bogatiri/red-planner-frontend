import { AlignLeft } from 'lucide-react'
import { UseFormRegister } from 'react-hook-form'

import { TypeCardFormState } from '@/types/card.types'
import { TypeListFormState } from '@/types/list.types'

import { TransparentFieldTextarea } from '../fields/TransparentFieldTextarea'
import { TypeBoardFormState } from '@/types/board.types'

interface IDescriptionProps {
	register: UseFormRegister<TypeListFormState | TypeCardFormState | TypeBoardFormState>
	placeholder?: string
}

const Description = ({ register, placeholder }: IDescriptionProps) => {
	return (
		<div className='h-full w-full'>
			<div className='flex  gap-x-3'>
				<AlignLeft className='h-5 w-5 mt-0.5 text-white' />
				<p className='font-semibold text-white mb-2'>Description</p>
			</div>
			<TransparentFieldTextarea
				placeholder={placeholder}
				className='h-auto overflow-y-auto max-h-36 md:h-[200px]'
				{...register('description')}
			/>
		</div>
	)
}

export default Description
