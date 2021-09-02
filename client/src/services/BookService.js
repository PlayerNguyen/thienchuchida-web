import axiosInstance from "../helpers/axiosInstance";

function getLatestUpdateBook(limit, page) {
  return axiosInstance.get(`/books/?limit=${limit}&page=${page}`);
}

const BookService = {
  getLatestUpdateBook,
};
export default BookService;
