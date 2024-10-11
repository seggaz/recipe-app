import { useRecipeStore } from '../store/useRecipeStore'
import { Button, Stack } from '@mui/material'

interface PaginationProps {
	totalPages: number
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
	const { currentPage, setCurrentPage } = useRecipeStore()

	const handlePageClick = (page: number) => {
		setCurrentPage(page)
	}

	const pageNumbers = []

	if (totalPages <= 10) {
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i)
		}
	} else {
		if (currentPage <= 7) {
			pageNumbers.push(...[1, 2, 3, 4, 5, 6, 7, '...', totalPages])
		} else if (currentPage > totalPages - 7) {
			pageNumbers.push(
				1,
				'...',
				totalPages - 6,
				totalPages - 5,
				totalPages - 4,
				totalPages - 3,
				totalPages - 2,
				totalPages - 1,
				totalPages
			)
		} else {
			pageNumbers.push(
				1,
				'...',
				currentPage - 1,
				currentPage,
				currentPage + 1,
				'...',
				totalPages
			)
		}
	}

	return (
		<Stack direction='row' spacing={1} sx={{ mt: 2 }} justifyContent='center'>
			{currentPage > 1 && (
				<Button
					onClick={() => handlePageClick(currentPage - 1)}
					variant='contained'
					color='primary'
				>
					&lt;
				</Button>
			)}
			{pageNumbers.map((number, index) =>
				number === '...' ? (
					<span key={index} style={{ margin: '0 8px' }}>
						{number}
					</span>
				) : (
					<Button
						key={index}
						onClick={() => handlePageClick(Number(number))}
						variant={currentPage === number ? 'contained' : 'outlined'}
						color={currentPage === number ? 'primary' : 'inherit'}
					>
						{number}
					</Button>
				)
			)}
			{currentPage < totalPages && (
				<Button
					onClick={() => handlePageClick(currentPage + 1)}
					variant='contained'
					color='primary'
				>
					&gt;
				</Button>
			)}
		</Stack>
	)
}

export default Pagination
