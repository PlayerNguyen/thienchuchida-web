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
  return axiosInstance.get(`/chapters/book/${bookId}`);
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
  return axiosInstance.post(`/books/`, data);
}

async function createNewChapter(bookId, name) {
  return axiosInstance.post(`/chapters/`, {
    name: name,
    book: bookId,
  });
}

async function updateChapter(chapterId, data) {
  return axiosInstance.put(`/chapters/chapter/${chapterId}`, data);
}

async function isBookContainsPassword(bookId) {
  return axiosInstance.post(`/books/has-password`, { book: bookId });
}

async function getChapterBySlug(book, chapter) {
  return axiosInstance.get(`/chapters/book/${book}/chapter/${chapter}`);
}

async function deleteBook(bookId) {
  return axiosInstance.delete(`/books/book/${bookId}`);
}

async function deleteChapter(chapterId) {
  return axiosInstance.delete(`/chapters/chapter/${chapterId}`);
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
  createBook,
  createNewChapter,
  updateChapter,
  isBookContainsPassword,
  getChapterBySlug,
  deleteBook,
  deleteChapter,
};
export default BookService;
