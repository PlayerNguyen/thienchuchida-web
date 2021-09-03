import axiosInstance from "../helpers/axiosInstance";

function getLatestUpdateBook(limit, page) {
  return axiosInstance.get(`/books/?limit=${limit}&page=${page}&sort=-updatedAt`);
}

function getBookBySlug(slug) {
  return axiosInstance.get(`/books/?slug=${slug}`);
}

const BookService = {
  getLatestUpdateBook,
  getBookBySlug
};
export default BookService;
