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
  return axiosInstance.get(`/books/book/${book}/chapters/${chapterId}`);
}

function getAllBooks() {
  return axiosInstance.get(`/books/`);
}

async function getChaptersInBook(bookId) {
  return axiosInstance.get(`/books/book/${bookId}/chapters/`);
}

async function findTagByName(name) {
  return axiosInstance.get(`/books/tags/tag/${name}/`);
}

const BookService = {
  getLatestUpdateBook,
  getBookBySlug,
  getChapterById,
  getAllBooks,
  getChaptersInBook,
  findTagByName,
};
export default BookService;
