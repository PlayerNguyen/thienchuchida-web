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
  },
  ConnectionDelay: 6000
};

module.exports = DatabaseConfig;
