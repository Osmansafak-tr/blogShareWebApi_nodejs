const app = require("express")();
const {
  KeywordRouter,
  RoleRouter,
  UserRouter,
  CommentRouter,
  BlogRouter,
} = require("./index");

app.use("/keywords", KeywordRouter);
app.use("/roles", RoleRouter);
app.use("/users", UserRouter);
app.use("/comments", CommentRouter);
app.use("/blogs", BlogRouter);

module.exports = app;
