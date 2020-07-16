import React from "react";
import { Pagination, Button } from "react-bootstrap";

//элементы на данной странице
function itemsOnPage({currentPage, itemsPerPage, listOfItems}) {
  //отображение нескольких голосование на странице
  const indexOfLastPoll = currentPage * itemsPerPage;
  const indexOfFirstPoll = indexOfLastPoll - itemsPerPage;
  const currentPolls = listOfItems.slice(indexOfFirstPoll, indexOfLastPoll);
  return currentPolls;
}

//номера страниц
function pages(itemsList, itemPerPage, currentPage, setCurrentPage) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(itemsList.length / itemPerPage); i++) {
    pageNumbers.push(
    <Pagination.Item className="page-item transparent--button" onClick={() => setCurrentPage(i)} key={i}>
      <Button type="button" disabled={currentPage === i ? true : false} variant="light" className="transparent--button button">{i}</Button>
    </Pagination.Item>
    );
  }
  return pageNumbers;
}

export {
  itemsOnPage,
  pages
};