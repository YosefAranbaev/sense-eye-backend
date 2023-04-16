const axios = require('axios');
const Org = require('../model/org')

exports.orgController = {
    getAllorganizations(req,res){
        console.log("hello");
        Org.find({})
            .then(docs => {
                console.log(docs);
                res.status(200).json(docs);
            })
            .catch(err => {res.status(400); res.json(`Error getting data from db: ${err}`)})
    },
    getOrgByName(req, res) {
        const name = req.params.name;
        Org.findOne({ name: name })
          .then(doc => {
            console.log(doc);
            if (!doc) {
              res.status(404);
              res.json(`Organization with name ${name} not found`);
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
    addOrg(req, res) {
        const { name} = req.body;
      
        // check if organization with the same name already exists
        Org.findOne({ name: name })
          .then(existingOrg => {
            if (existingOrg) {
              res.status(400);
              res.json(`Organization with name ${name} already exists`);
            } else {
              // create new organization
              const newOrg = new Org({
                name
              });
      
              newOrg.save()
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
          })
          .catch(err => {
            res.status(400);
            res.json(`Error getting data from db: ${err}`);
          });
      }
      
}
