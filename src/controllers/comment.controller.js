const { success, failed } = require('../helpers/response');
const {
  getCountCommentByPostId,
  getCommentByPostId,
  postComment
} = require('../models/comment.model');

const { isPostAvalailable } = require('../models/post.model');

module.exports = {
  getComment: async (req, res) => {
    try {
      const { id } = req.params;
      let { limit, page } = req.query;

      page === undefined ? (page = 1) : (page = parseInt(page));
      limit === undefined ? (limit = 10) : (limit = parseInt(limit));

      const offset = (page - 1) * limit;
      const totalData = parseInt(await getCountCommentByPostId({ postId: id }));

      const totalPage = Math.ceil(totalData / limit);

      if (page > totalPage) {
        return failed(res, 400, 'Page not found');
      }

      const result = await getCommentByPostId({ offset, limit, postId: id });

      if (result.length > 0) {
        return success(res, 200, {
          message: 'Successfully get Comment',
          data: result,
          currentPage: page,
          totalPage
        });
      } else {
        return failed(res, 404, 'Comment not found');
      }
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },
  postComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { message } = req.body;
      const { userId } = req.userData;

      const isAvailablePost = await isPostAvalailable({ postId: id });

      if (!isAvailablePost) {
        return failed(res, 404, 'PostId not found');
      }

      const result = await postComment({
        userId,
        postId: id,
        message
      });

      if (result.affectedRows > 0) {
        return success(res, 201, 'Comment created');
      }

      return failed(res, 400, 'Failed to create comment');
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  }
};
