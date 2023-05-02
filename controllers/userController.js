const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const { authenticateToken, authorize } = require('../auth');
const secretKey = 'my-secret-key';

exports.userController = {
  async getAllUsers(req, res) {
    try {
      const docs = await User.find({});
      console.log(docs);
      res.status(200).json(docs);
    } catch (err) {
      res.status(400);
      res.json(`Error getting data from db: ${err}`);
    }
  },

  async getUserByEmail(req, res) {
    const email = req.params.email;

    try {
      const doc = await User.findOne({ email: email });
      console.log(doc);
      if (!doc) {
        res.status(404);
        res.json(`User with email ${email} not found`);
      } else {
        res.status(200);
        res.json(doc);
      }
    } catch (err) {
      res.status(400);
      res.json(`Error getting data from db: ${err}`);
    }
  },

  async addUser(req, res) {
    const { name, email, orgName, password, role } = req.body;

    if (!name || !email || !orgName || !password || !role) {
      res.status(400);
      return res.json(`Missing required parameters`);
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        orgName,
        password: hashedPassword,
        role
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(400);
      res.json(`Error saving data to db: ${err}`);
    }
  },

  async deleteUserByEmail(req, res) {
    const email = req.params.email;
    try {
      const doc = await User.findOneAndDelete({ email: email });
      console.log(doc);
      if (!doc) {
        res.status(404);
        res.json(`User with email ${email} not found`);
      } else {
        res.status(204).send();
      }
    } catch (err) {
      res.status(400);
      res.json(`Error deleting data from db: ${err}`);
    }
  },

  async updateUserByEmail(req, res) {
    const email = req.params.email;
    const { name, orgName, password, role } = req.body;
    if (!name && !orgName && !password && !role) {
      res.status(400);
      return res.json(`No fields to update`);
    }

    try {
      let updateObj = {};
      if (name) {
        updateObj.name = name;
      }
      if (orgName) {
        updateObj.orgName = orgName;
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateObj.password = hashedPassword;
      }
      if (role) {
        updateObj.role = role;
      }

      const updatedDoc = await User.findOneAndUpdate({ email: email }, updateObj, {
        new: true
      });

      if (!updatedDoc) {
        res.status(404);
        res.json(`User with email ${email} not found`);
      } else {
        res.status(200);
        res.json(updatedDoc);
      }
    } catch (err) {
      res.status(400);
      res.json(`Error updating data in db: ${err}`);
    }
  },
  async loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res.status(400);
      return res.json(`Missing email or password`);
    }

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(401);
        return res.json(`User not found`);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(401);
        return res.json(`Incorrect password`);
      }

      const accessToken = jwt.sign({ email: email }, secretKey);
      res.status(200).json({ accessToken: accessToken });
    } catch (err) {
      res.status(400);
      res.json(`Error logging in: ${err}`);
    }
  },

  async testAuth(req, res) {
    res.status(200).json(req.user);
  }
};