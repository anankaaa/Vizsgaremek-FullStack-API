const jwt = require("jsonwebtoken");
const User = require("./../models/user.model");

const refreshDB = [];

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!req.body["email"] || !req.body["password"]) {
    res.status(400).send("Missing email or password");
  }

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(404).send(`Invalid email or password`);
  }

  const accessToken = jwt.sign(
    {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      user_id: user._id,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  const refreshToken = jwt.sign(
    {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      user_id: user._id,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY
  );
  refreshDB.push(refreshToken);
  res.json({ accessToken, refreshToken, user });
};

exports.refresh = (req, res, next) => {
  const refreshToken = req.body["refreshToken"];
  if (!refreshToken) {
    return res.sendStatus(403);
  }

  const foundToken = refreshDB.includes(refreshToken);
  if (foundToken) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      (err, payLoad) => {
        if (err) {
          return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
          {
            name: payLoad.name,
            email: payLoad.email,
            password: payLoad.password,
            role: payLoad.role,
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
          }
        );
        res.json({ accessToken });
      }
    );
  }
};

exports.logout = (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.sendStatus(403);
  }
  const tokenId = refreshDB.findIndex((token) => token === refreshToken);
  if (tokenId >= 1) {
    refreshDB.splice(tokenId, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
};
