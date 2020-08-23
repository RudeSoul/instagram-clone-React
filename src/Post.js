import React, { useState, useEffect } from "react";
import "./post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";

function Post({ user, postId, username, caption, imageUrl }) {
  const [comments, setcomments] = useState([]);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    let unsubscribed;
    if (postId) {
      unsubscribed = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setcomments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribed();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="prabesh"
          src="/static/images/avatar/1.jpg"
        />

        <h3>{username}</h3>
      </div>
      {/* header -> + username */}

      <img className="post__image" src={imageUrl} alt="" />
      {/* image */}

      <h4 className="post__text">
        <strong>{username}</strong>: {caption}
      </h4>
      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong>
            {comment.text}
          </p>
        ))}
      </div>
      {/* username + caption */}
      {user && (
        <form className="post__commentBox">
          <input
            type="text"
            className="post__input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
