const {
  createBooking,
  getBookingId,
  updateBooking,
  updateBookingReview,
  getBookingDetailbyId,
  countBooking,
  getBookingList
} = require('../models/booking.model');
const { success, failed } = require('../helpers/response');

const {
  isAvalaibleConsultant,
  getConsultantByUserId
} = require('../models/consultant.model');
const roleType = require('../utils/role.users');
const status = require('../utils/status.booking');

module.exports = {
  createBooking: async (req, res) => {
    try {
      const { userId } = req.userData;
      const { consultantId, problem } = req.body;

      const isAvailConsultant = await isAvalaibleConsultant({ consultantId });

      if (!isAvailConsultant) {
        return failed(res, 404, 'Consultant not found');
      }

      if (isAvailConsultant[0].isActive === 0) {
        return failed(res, 400, 'Consultant is not active');
      }

      const result = await createBooking({
        userId,
        consultantId,
        consultantUserId: isAvailConsultant[0].userId,
        problem,
        type: isAvailConsultant[0].type
      });

      if (result.affectedRows > 0) {
        return success(res, 200, {
          message: 'Successfully create booking'
        });
      }

      return failed(res, 400, 'Failed to create booking');
    } catch (e) {
      return failed(res, 500, {
        message: e.message
      });
    }
  },

  updateBooking: async (req, res) => {
    try {
      const { userId } = req.userData;
      const { solution } = req.body;
      const { id } = req.params;

      const isAvaialableBooking = await getBookingId({ bookingId: id });

      if (!isAvaialableBooking) {
        return failed(res, 404, 'Booking not found');
      }

      if (isAvaialableBooking[0].isActive === 0) {
        return failed(res, 400, 'Booking already ended');
      }

      const getConsultant = await getConsultantByUserId({ userId });

      const consultantId = getConsultant[0].consultantId;

      const result = await updateBooking({
        solution,
        consultantId,
        bookingId: id
      });

      if (result.affectedRows > 0) {
        return success(res, 200, {
          message: 'Successfully end booking'
        });
      }

      return failed(res, 400, 'Failed to end booking');
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },

  updateBookingReview: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.userData;
      const { rating, review } = req.body;

      const isAvaialableBooking = await getBookingId({ bookingId: id });

      if (!isAvaialableBooking) {
        return failed(res, 404, 'Booking not found');
      }

      if (isAvaialableBooking[0].isActive === 1) {
        return failed(
          res,
          400,
          'Booking not ended now, please wait booking ended'
        );
      }
      if (
        isAvaialableBooking[0].reviewStar !== null ||
        isAvaialableBooking[0].reviewContent !== null
      ) {
        return failed(res, 400, 'Booking already reviewed');
      }

      const result = await updateBookingReview({
        userId,
        rating,
        review,
        bookingId: id
      });

      if (result.affectedRows > 0) {
        return success(res, 200, {
          message: 'Successfully update review'
        });
      }

      return failed(res, 400, 'Failed to update review');
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },

  getBookingDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.userData;

      let result = await getBookingDetailbyId({ bookingId: id, userId });

      if (!result) {
        return failed(res, 404, 'Booking not found');
      }

      result[0].type = roleType(result[0].type);
      result[0].status = status(result[0]);

      return success(res, 200, result[0]);
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  },

  getBooking: async (req, res) => {
    try {
      let { page, limit, type, isActive } = req.query;

      const { userId, role } = req.userData;

      page === undefined ? (page = 1) : (page = parseInt(page));
      limit === undefined ? (limit = 10) : (limit = parseInt(limit));
      type === undefined ? (type = undefined) : (type = type);
      isActive === undefined ? (isActive = undefined) : (isActive = isActive);

      const offset = (page - 1) * limit;
      if (role !== 'USER') {
        const getConsultant = await getConsultantByUserId({ userId });
        userId = getConsultant[0].consultantId;
      }

      const totalData = parseInt(
        await countBooking({ userId, type, isActive })
      );
      const totalPage = Math.ceil(totalData / limit);

      let result = await getBookingList({
        userId,
        type,
        isActive,
        offset,
        limit
      });

      if (!result) {
        return failed(res, 404, 'Booking not found');
      }

      result = await Promise.all(
        result.map(async (item) => {
          item.type = roleType(item.type);
          item.status = status(item);
          return item;
        })
      );

      return success(res, 200, {
        message: 'Successfully get post',
        data: result,
        currentPage: page,
        totalPage
      });
    } catch (error) {
      return failed(res, 500, {
        message: error.message
      });
    }
  }
};
