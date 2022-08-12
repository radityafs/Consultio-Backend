const { success, failed } = require('../helpers/response');
const { postLike, destroyLike } = require('../models/like.model');
const { isPostAvalailable } = require('../models/post.model');

module.exports = {
  postLike: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.userData;

      const isAvailablePost = await isPostAvalailable({ postId: id });

      if (!isAvailablePost) {
        return failed(res, 404, 'PostId not found');
      }

      const like = await postLike({
        userId,
        postId: id
      });

      if (like.affectedRows > 0) {
        return success(res, 200, {
          message: 'Successfully liked'
        });
      }

      return failed(res, 400, 'Failed to like');
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },
  destroyLike: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.userData;

      const like = await destroyLike({
        userId,
        postId: id
      });

      if (like.affectedRows > 0) {
        return success(res, 200, {
          message: 'Successfully unliked'
        });
      }

      return failed(res, 400, 'Failed to unlike');
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  }
};
