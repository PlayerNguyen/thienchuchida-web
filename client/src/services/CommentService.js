import axiosInstance from "../helpers/axiosInstance";

function createComment(book, content) {
  return axiosInstance.post(`/comments/`, { book, content });
}

function getComment(id) {
  return axiosInstance.get(`/comments/comment/${id}`);
}

function deleteComment(id) {
  return axiosInstance.delete(`/comments/comment/${id}`);
}

function updateComment(id, content) {
  return axiosInstance.put(`/comments/comment/${id}`, { content });
}

function getCommentsFromBook(bookId) {
  return axiosInstance.get(`/comments/book/${bookId}`);
}

const CommentService = {
  createComment,
  getComment,
  deleteComment,
  updateComment,
  getCommentsFromBook,
};
export default CommentService;
