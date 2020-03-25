import React, { useState } from "react";
import { findRenderedComponentWithType } from "react-dom/test-utils";

const AddCommentForm = ({ articleName, setArticleInfo }) => {
  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    const result = await fetch(`/api/articles/${articleName}/add-comment`, {
      method: "post",
      body: JSON.stringify({ userName, text: commentText }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await result.json();
    setArticleInfo(body);
    setUserName("");
    setCommentText("");
  };

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      <label>
        Name:
        <input
          type="text"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
      </label>
      <label>
        Comment:
        <textarea
          rows="4"
          cols="50"
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
      </label>
      <button onClick={() => addComment()}>Add Comments</button>
    </div>
  );
};

export default AddCommentForm;
