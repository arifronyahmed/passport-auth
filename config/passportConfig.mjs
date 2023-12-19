import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/userModel.mjs';

export default function (passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
  opts.secretOrKey = process.env.JWT_SECRET;

  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.userId)
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch((err) => done(err, false));
    }),
  );
}
