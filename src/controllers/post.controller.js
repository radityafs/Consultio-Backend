const { success, failed } = require('../helpers/response');

const {
  getCountAllPost,
  getPost,
  CreatePost,
  getPostById
} = require('../models/post.model');

module.exports = {
  getPost: async (req, res) => {
    try {
      const { userId } = req.userData;

      let { page, limit, search, user } = req.query;

      page === undefined ? (page = 1) : (page = parseInt(page));
      limit === undefined ? (limit = 10) : (limit = parseInt(limit));
      search === undefined ? (search = undefined) : (search = search);
      user === undefined ? (user = undefined) : (user = user);

      const offset = (page - 1) * limit;
      const totalData = parseInt(await getCountAllPost({ user, search }));
      const totalPage = Math.ceil(totalData / limit);

      if (page > totalPage) {
        return failed(res, 400, 'Page not found');
      }

      const result = await getPost({ offset, limit, search, user, userId });

      if (result.length > 0) {
        return success(res, 200, {
          message: 'Successfully get post',
          data: result,
          currentPage: page,
          totalPage
        });
      } else {
        return failed(res, 404, 'Post not found');
      }
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },

  createPost: async (req, res) => {
    try {
      const { story } = req.body;

      const result = await CreatePost({
        userId: req.userData.userId,
        story,
        attachment: req.file?.filename || undefined
      });

      if (result.affectedRows > 0) {
        return success(res, 201, {
          message: 'Successfully create post'
        });
      }

      return failed(res, 400, 'Failed to create post');
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },

  getDetailPost: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.userData;

      const result = await getPostById({ id, userId });

      if (result.length > 0) {
        return success(res, 200, {
          message: 'Successfully get post',
          data: result
        });
      } else {
        return failed(res, 404, 'Post not found');
      }
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { postId } = req.params;

      const result = await deletePost({ postId });

      if (result.affectedRows > 0) {
        return success(res, 200, {
          message: 'Successfully delete post'
        });
      }

      return failed(res, 400, 'Failed to delete post');
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  }
};
