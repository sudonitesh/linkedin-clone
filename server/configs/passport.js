const mongoose = require('mongoose')
const JwtStrategy = require('passport-jwt').Strategy;
const JwtExtract = require('passport-jwt').ExtractJwt;

const User = mongoose.model('users')

const opts = {
	jwtFromRequest: '',
	secretOrKey: ''
};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload.id)
				.then(user => {
					if(user) {
						return done(null, user)
					}
					return done(null, false)
				})
				.catch(err => {
					return err;
					console.log(err);
				})

		})
	)
}