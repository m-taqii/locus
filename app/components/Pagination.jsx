"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
  Pagination Component
  
  A reusable component that displays page navigation controls.
  Shows: "Showing X to Y of Z results" + page buttons
  
  Props:
  - currentPage: The current active page number (starts at 1)
  - totalPages: Total number of pages
  - onPageChange: Function to call when user clicks a page
  - totalItems: Total number of items in the list
  - itemsPerPage: How many items are shown per page
 */
const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {

    // Calculate which items are being shown
    // Example: Page 2 with 10 items per page = showing items 11-20
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    // Don't show pagination if there's only 1 page or less
    if (totalPages <= 1) {
        return null
    }

    // Check if we can go to previous/next page
    const canGoPrevious = currentPage > 1
    const canGoNext = currentPage < totalPages

    // Handle page change
    const goToPage = (pageNumber) => {
        onPageChange(pageNumber)
    }

    const goToPreviousPage = () => {
        if (canGoPrevious) {
            onPageChange(currentPage - 1)
        }
    }

    const goToNextPage = () => {
        if (canGoNext) {
            onPageChange(currentPage + 1)
        }
    }

    // Generate array of page numbers to display
    // For small page counts, show all pages: [1, 2, 3, 4, 5]
    // For large page counts, show with ellipsis: [1, "...", 4, 5, 6, "...", 10]
    const getPageNumbers = () => {
        const pages = []

        // If 5 or fewer pages, show all of them
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
            return pages
        }

        // For more than 5 pages, use ellipsis
        // Always show first page
        pages.push(1)

        // If current page is near the start (1, 2, 3)
        if (currentPage <= 3) {
            pages.push(2, 3, 4, '...', totalPages)
        }
        // If current page is near the end
        else if (currentPage >= totalPages - 2) {
            pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
        }
        // If current page is in the middle
        else {
            pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-700/50'>

            {/* Left side: Item count info */}
            <p className='text-gray-500 text-sm'>
                Showing <span className='text-white font-medium'>{startItem}</span> to{' '}
                <span className='text-white font-medium'>{endItem}</span> of{' '}
                <span className='text-white font-medium'>{totalItems}</span> results
            </p>

            {/* Right side: Page navigation buttons */}
            <div className='flex items-center gap-1'>

                {/* Previous Page Button */}
                <button
                    onClick={goToPreviousPage}
                    disabled={!canGoPrevious}
                    className={`p-2 rounded-lg transition-colors ${canGoPrevious
                            ? 'text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer'
                            : 'text-gray-600 cursor-not-allowed'
                        }`}
                >
                    <ChevronLeft className='w-5 h-5' />
                </button>

                {/* Page Number Buttons */}
                <div className='flex items-center gap-1'>
                    {pageNumbers.map((page, index) => {
                        // If it's an ellipsis, just show "..."
                        if (page === '...') {
                            return (
                                <span key={`dots-${index}`} className='px-2 text-gray-500'>
                                    ...
                                </span>
                            )
                        }

                        // Otherwise, show a clickable page button
                        const isCurrentPage = currentPage === page

                        return (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${isCurrentPage
                                        ? 'bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    })}
                </div>

                {/* Next Page Button */}
                <button
                    onClick={goToNextPage}
                    disabled={!canGoNext}
                    className={`p-2 rounded-lg transition-colors ${canGoNext
                            ? 'text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer'
                            : 'text-gray-600 cursor-not-allowed'
                        }`}
                >
                    <ChevronRight className='w-5 h-5' />
                </button>
            </div>
        </div>
    )
}

export default Pagination
