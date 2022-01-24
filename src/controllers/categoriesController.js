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
            let categories = await db.Category.findAll();

            let response = {
                meta: {
                    status: 200,
                    total: categories.length,
                    url: 'api/filter/categories'
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
                order: [['id', 'DESC']]
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
                    [req.params.type && req.params.category ? Op.and : Op.or]: [
                        { typeId: req.params.type ? req.params.type : null }, 
                        { categoryId: req.params.category ? req.params.category : null}
                    ]
                }
            });

            let response = {
                meta : { 
                    status: 200,
                    url: 'api/filter/by/'+req.params.type+'/'+req.params.category
                },
                data : filter
            }

            return res.status(200).json(response)
        } catch (error) {
            throwError(res, error);
        }
    }
}