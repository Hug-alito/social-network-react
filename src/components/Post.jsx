import PropTypes from 'prop-types';

function Post({ content }) {
  return (
    <div className="post">
      <p>{content}</p>
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Post;
