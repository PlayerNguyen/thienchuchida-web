const DatabaseConfig = {
  Model: {
    User: { Name: "User" },
    Book: { Name: "Book" },
    Tags: { Name: "BookTag" },
    BookComment: { Name: "BookComment" },
    BookChapter: { Name: "BookChapter" },
    BookChapterComment: { Name: "BookChapterComment" },
    Resource: { Name: "Resource" },
    Author: { Name: "Author" },
    Setting: { Name: "Setting" },
    Notify: { Name: "Notify" },
    Confession: {Name: "Confession"}
  },
  ConnectionDelay: 6000,
  Url: {
    Dev: "mongodb://localhost:27017/thienchuchida",
    Deploy: "mongodb://localhost:27017/thienchuchida"
  }
};

module.exports = DatabaseConfig;
