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
  return axiosInstance.get(`/books/?&sort=-updatedAt`);
}

async function getChaptersInBook(bookId) {
  return axiosInstance.get(`/books/book/${bookId}/chapters/`);
}

async function findTagByName(name) {
  return axiosInstance.get(`/books/tags/tag/${name}/`);
}

async function updateBook(data) {
  return axiosInstance.put(`/books/`, data);
}

async function getBookTag(id) {
  return axiosInstance.get(`/books/tags/tag/${id}`);
}

async function createBook(data) {
  return axiosInstance.post(`/books/`, data)
}

const BookService = {
  getLatestUpdateBook,
  getBookBySlug,
  getChapterById,
  getAllBooks,
  getChaptersInBook,
  findTagByName,
  updateBook,
  getBookTag,
  createBook
};
export default BookService;
