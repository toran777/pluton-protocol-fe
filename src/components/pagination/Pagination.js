import {Pagination} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import './Pagination.css';

export function Page({items, loading, onItemsChange, itemsPerPage=10}) {
    const offset = items.length % itemsPerPage === 0 ? 0 : 1
    const lastPage = Math.floor(items.length / itemsPerPage + offset)
    const [currentPage, setCurrentPage] = useState(1)
    const [done, setDone] = useState(false)

    useEffect(() => {
        const getItems = async() => {
            if (items.length > 0) {
                onItemsChange(items.slice(0, itemsPerPage))
                setDone(true)
            }
        }

        !done && getItems()
    })

    function goToFirstPage() {
        const page = 1
        setCurrentPage(page)
        onItemsChange(items.slice((page - 1) * itemsPerPage, page * itemsPerPage))
    }

    function goToPreviousPage() {
        const page = currentPage - 1
        setCurrentPage(page)
        onItemsChange(items.slice((page - 1) * itemsPerPage, page * itemsPerPage))
    }

    function goToNextPage() {
        const page = currentPage + 1
        setCurrentPage(page)
        onItemsChange(items.slice((page - 1) * itemsPerPage, page * itemsPerPage))
    }

    function goToLastPage() {
        const page = lastPage
        setCurrentPage(page)
        onItemsChange(items.slice((page - 1) * itemsPerPage, page * itemsPerPage))
    }

    return !loading && lastPage > 1 && (
        <Pagination className="mt-2 pb-2 custom-pagination justify-content-center">
            {currentPage > 1 && <Pagination.Prev onClick={goToPreviousPage}/>}
            {currentPage > 2 && <Pagination.Item onClick={goToFirstPage}>{1}</Pagination.Item>}
            {currentPage > 3 && <Pagination.Ellipsis/>}
            {currentPage > 1 && <Pagination.Item onClick={goToPreviousPage}>{currentPage - 1}</Pagination.Item>}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {currentPage < lastPage && <Pagination.Item onClick={goToNextPage}>{currentPage + 1}</Pagination.Item>}
            {currentPage < lastPage - 2 && <Pagination.Ellipsis/>}
            {currentPage < lastPage - 1 && <Pagination.Item onClick={goToLastPage}>{lastPage}</Pagination.Item>}
            {currentPage < lastPage && <Pagination.Next onClick={goToNextPage}/>}
        </Pagination>
    )
}
