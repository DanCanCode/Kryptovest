const Sequelize = require("sequelize");
const sequelize = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Transaction = require("./Transaction");
require("dotenv").config();

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  image: {
    type: Sequelize.STRING,
    defaultValue:
      "https://www.creative.travel/wp-content/uploads/2017/05/blank-profile-picture-973460_960_720-e1501484141348.png",
  },
});

User.beforeCreate((user, option) => {
  const hash = bcrypt.hashSync(user.getDataValue("password"), 5);
  user.setDataValue("password", hash);
});

User.prototype.generateToken = function () {
  return jwt.sign({ userId: this.id }, process.env.JWT);
};

User.findByToken = async (token) => {
  try {
    console.log(token);
    const { userId } = await jwt.verify(token, process.env.JWT);

    const user = await User.findByPk(userId, { include: Transaction });
    if (user) {
      return user;
    }
  } catch (ex) {
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.authenticate = async ({ email, password }) => {
  const hash = await User.findOne({
    where: {
      email,
    },
  });

  if (!hash) {
    const error = Error("bad credentials email");
    error.status = 401;
    throw error;
  } else {
    const user = await User.findOne({
      where: {
        password: (await bcrypt.compare(password, hash.password))
          ? hash.password
          : null,
      },
    });
    if (user) {
      return jwt.sign(
        { userId: user.id, userEmail: user.email },
        process.env.JWT
      );
    } else {
      const error = Error("bad credentials password");
      error.status = 401;

      throw error;
    }
  }
};

module.exports = User;
