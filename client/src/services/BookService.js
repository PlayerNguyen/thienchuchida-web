import axiosInstance from "../helpers/axiosInstance";

function getLatestUpdateBook(limit, page) {
  return axiosInstance.get(
    `/books/?limit=${limit}&page=${page}&sort=-updatedAt`
  );
}

function getBookBySlug(slug) {
  return axiosInstance.get(`/books/book/${slug}`);
}

function getChapterById(book, chapterId) {
  return axiosInstance.get(`/books/book/${book}/chapters/{$chapterId}`);
}

const BookService = {
  getLatestUpdateBook,
  getBookBySlug,
  getChapterById
};
export default BookService;
