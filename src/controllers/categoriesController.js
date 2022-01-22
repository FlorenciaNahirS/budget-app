const db = require('../database/models');
const { Op } = require("sequelize")

const throwError = (res, error) => {
    console.log(error);
    return res.status(error.status).json({
        meta: {
            status: error.status || 500
        },
        data: error.message
    })
}

module.exports = {
    categories:  async (req, res) => {
        try {
            let categories = await db.Category.findAll({
                include: [{ all: true }],
                where : {
                    typeId : 2
                }
            });

            let response = {
                meta: {
                    status: 200,
                    total: categories.length,
                    url: 'api/filter/categories/'
                },
                data: categories
            }

            return res.status(200).json(response)
        } catch (error) {
            throwError(res, error);
        }
    },
    category : async (req,res) => {
        try {
            if (isNaN(req.params.id)) {
                let error = new Error('Wrong ID type');
                error.status = 422;

                throw error;
            }

            let category = await db.Transaction.findAll({
                include: [{ all: true }],
                order: [['id', 'DESC']],
                where : {
                    categoryId : req.params.id
                }
            });

            if (!category) {
                let error = new Error('Nonexistent ID')
                error.status = 404; 

                throw error; 
            }

            let response = {
                meta : {
                    status: 200,
                    url: 'api/filter/categories/'+req.params.id
                },
                data : category
            }

            return res.status(200).json(response)
        } catch (error) {
            throwError(res, error);
        }
    },
    type : async (req,res) => {
        try {

            if (isNaN(req.params.id)) {
                let error = new Error('Wrong ID type');
                error.status = 422;

                throw error;
            }

            let type = await db.Transaction.findAll({
                include: [{ all: true }],
                order: [['id', 'DESC']],
                where : {
                    typeId : req.params.id
                }
            });

            if (!type) {
                let error = new Error('Nonexistent ID')
                error.status = 404; 

                throw error; 
            }

            let response = {
                meta : {
                    status: 200,
                    url: 'api/filter/types/'+req.params.id
                },
                data : type
            }

            return res.status(200).json(response)
        } catch (error) {
            throwError(res, error);
        }
    },
    filter: async  (req,res) => {
        try {
            let filter = await db.Transaction.findAll({
                include: [{ all: true }],
                order: [['id', 'DESC']],
                where : {
                    [req.query.type && req.query.category ? Op.and : Op.or]: [
                        { typeId: req.query.type ? req.query.type : null }, 
                        { categoryId: req.query.category ? req.query.category : null}
                    ]
                }
            });

            let response = {
                meta : { 
                    status: 200,
                    url: 'api/filter/by'
                },
                data : filter
            }

            return res.status(200).json(response)
        } catch (error) {
            throwError(res, error);
        }
    }
}