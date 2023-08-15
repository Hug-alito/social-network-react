import PropTypes from 'prop-types';
import { useAtom } from 'jotai';
import { loginAtom } from '../atoms/authAtom2';
import { useState } from 'react';

function CreatePost({ onPostCreated }) {
  const [postContent, setPostContent] = useState('');
  const [loginState] = useAtom(loginAtom);

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:1337/api/posts', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${loginState.token}`,
        },
        body: JSON.stringify({
          text: postContent,
          user: loginState.userId,
        }),
      });
  
      if (response.ok) {
        console.log('Post created successfully');
        setPostContent('');
  
        onPostCreated({
          text: postContent, // Utilisez "text" au lieu de "content"
          user: loginState.userId,
        });
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };
  

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={postContent}
          onChange={handleContentChange}
          placeholder="Write your post here..."
          rows="4"
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

CreatePost.propTypes = {
  onPostCreated: PropTypes.func.isRequired,
};

export default CreatePost;
