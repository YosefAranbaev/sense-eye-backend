const axios = require('axios');
const User = require('../model/user')

exports.userController = {
    getAllusers(req, res) {
        User.find({})
          .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
          })
          .catch(err => {
            res.status(400);
            res.json(`Error getting data from db: ${err}`);
          });
      },
      getUserByEmail(req, res) {
        const email = req.params.email;
        User.findOne({ email: email })
          .then(doc => {
            console.log(doc);
            if (!doc) {
              res.status(404);
              res.json(`User with email ${email} not found`);
            } else {
              res.status(200);
              res.json(doc);
            }
          })
          .catch(err => {
            res.status(400);
            res.json(`Error getting data from db: ${err}`);
          });
      },
      addUser(req, res) {
        const { name, email, orgName, password, role } = req.body;

        // check if all required parameters are present in the request body
        if (!name || !email || !orgName || !password || !role) {
            res.status(400);
            return res.json(`Missing required parameters`);
        }
    
        const newUser = new User({
            name,
            email,
            orgName,
            password,
            role
        });
    
        newUser
            .save()
            .then(doc => {
                console.log(doc);
                res.status(201);
                res.json(doc);
            })
            .catch(err => {
                res.status(400);
                res.json(`Error saving data to db: ${err}`);
            });
    }
}
