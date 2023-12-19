import catchAsync from '../utils/catchAsync.mjs';
import AppError from '../utils/appError.mjs';

const getSecret = catchAsync(async (req, res, next) => {
  const secret = 'this is a secret';

  if (!secret) {
    return next(new AppError('Secret not found', 404));
  }
  res.send(secret);
});

export default getSecret;
