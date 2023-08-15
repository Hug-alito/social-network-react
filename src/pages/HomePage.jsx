import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import { useAtom } from 'jotai';
import { loginAtom } from '../atoms/authAtom2';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [auth] = useAtom(loginAtom);
  const [posts, setPosts] = useState([]);

  const handleCreatePostClick = () => {
    setIsCreatingPost(true);
  };

  const handlePostCreated = (newPostContent) => {
    setIsCreatingPost(false);
    setPosts([...posts, newPostContent]);
  };

  const authToken = auth.token;

  console.log('authAtom:', auth);

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>Welcome on My Social Network. This website is a training to React, global state handling and tokens. Here, authentification and routing will be used to create a small social media website.</p>
      {!auth.isLoggedIn ? (
        <p>To create a post, log in. <Link to="/auth">Log in</Link></p>
      ) : (
        <>
          {!isCreatingPost ? (
            <button onClick={handleCreatePostClick}>Create a Post</button>
          ) : (
            <CreatePost authToken={authToken} onPostCreated={handlePostCreated} />
          )}
        </>
      )}
      {posts.map((postContent, index) => (
        <Post key={index} content={postContent} />
      ))}
    </div>
  );
}

export default HomePage;