const db = require('../database/models');
const dyajs = require('dayjs');

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
    total: async (req, res) => {
        try {
            let earnings = await db.Transaction.sum('amount', {
                where: {
                    typeId: 1
                }
            });

            let expenses = await db.Transaction.sum('amount', {
                where: {
                    typeId: 2
                }
            });

            let total;
            if (!expenses && !earnings) {
                total = 0;
            } else if (expenses === 1 || earnings === 1) {
                earnings === 0 ? total = earnings : total = expenses;
            } else {
                total = earnings - expenses;
            }

            let response = {
                meta: {
                    status: 200,
                    url: 'api/total'
                },
                data: total
            }

            return res.status(200).json(response)
        } catch (error) {
            throwError(res, error);
        }
    },
    latest: async (req, res) => {
        try {
            let latest = await db.Transaction.findAll({
                include: [{ all: true }],
                order: [['id', 'DESC']],
                limit: 10
            });

            let response = {
                meta: {
                    status: 200,
                    total: latest.length,
                    url: 'api/latest'
                },
                data: latest
            }

            return res.status(200).json(response)
        } catch (error) {
            throwError(res, error);
        }
    },
    all: async (req, res) => {
        try {
            let allTransactions = await db.Transaction.findAll({
                include: [{ all: true }],
                order: [['id', 'DESC']]
            });

            let response = {
                meta: {
                    status: 200,
                    total: allTransactions.length,
                    url: 'api/all'
                },
                data: allTransactions
            }

            return res.status(200).json(response)
        } catch (error) {
            throwError(res, error);
        }
    },
    earnings: async (req, res) => {
        try {
            let earnings = await db.Transaction.findAll({
                include: [{ all: true }],
                order: [['id', 'DESC']],
                where: {
                    typeId: 1
                }
            });

            let response = {
                meta: {
                    status: 200,
                    total: earnings.length,
                    url: 'api/earnings'
                },
                data: earnings
            }

            return res.status(200).json(response)
        } catch (error) {
            throwError(res, error);
        }
    },
    expenses: async (req, res) => {
        try {
            let expenses = await db.Transaction.findAll({
                include: [{ all: true }],
                order: [['id', 'DESC']],
                where: {
                    typeId: 2
                }
            });

            let response = {
                meta: {
                    status: 200,
                    total: expenses.length,
                    url: 'api/expenses'
                },
                data: expenses
            }

            return res.status(200).json(response)
        } catch (error) {
            throwError(res, error);
        }
    },
    detail: async (req, res) => {
        try {

            if (isNaN(req.params.id)) {
                let error = new Error('Wrong ID type');
                error.status = 422;

                throw error;
            }

            let detail = await db.Transaction.findOne({
                include: [{ all: true }],
                where: {
                    id: req.params.id
                }
            });

            if (!detail) {
                let error = new Error('Nonexistent ID')
                error.status = 404; 

                throw error; 
            }

            let response = {
                meta: {
                    status: 200,
                    url: 'api/detail/' + req.params.id
                },
                data: detail
            }

            return res.status(200).json(response)
        } catch (error) {
            throwError(res, error);
        }
    },
    create: async (req, res) => {
        try {
            req.body.date ? req.body.date = dyajs(req.body.date).format('DD-MM-YYYY') : req.body.date = new Date;
            let transaction = await db.Transaction.create({
                ...req.body
            })

            let response = {
                meta: {
                    status: 201,
                    url: 'api/create',
                    msg: 'New transaction successfully created'
                },
                data: transaction
            }

            return res.status(201).json(response)

        } catch (error) {
            throwError(res, error);
        }
    },
    update: async (req, res) => {
        try {

            if (isNaN(req.params.id)) {
                let error = new Error('Wrong ID type');
                error.status = 422;

                throw error;
            }

            req.body.date ? req.body.date = dyajs(req.body.date).format('DD-MM-YYYY') : req.body.date = new Date;
            let transaction = await db.Transaction.update(
                {
                    ...req.body
                },
                {
                    where : {
                        id : req.params.id
                    }
                }
            )

            let response;
            if(transaction[0] === 1){                
                response = {
                    meta: {
                        status: 201,
                        url: 'api/update' + transaction.id,
                        msg: 'Transaction updated successfully'
                    } 
                }
                return res.status(201).json(response)
            }else{
                transaction = {
                    meta: {
                        status: 204,
                        url: 'api/update' + transaction.id,
                        msg: 'The transaction could not be updated'
                    }
                }
                return res.status(204).json(response)
            }

        } catch (error) {
            throwError(res, error);
        }
    },
    destroy: async (req,res) => {
        try {

            if (isNaN(req.params.id)) {
                let error = new Error('Wrong ID type');
                error.status = 422;

                throw error;
            }

            let transaction = await db.Transaction.destroy(
                {
                    where : {
                        id : req.params.id
                    }
                }
            )

            let response;

            if(transaction[0] === 1){
                response = {
                    meta: {
                        status: 201,
                        url: 'api/delete/' + transaction.id,
                        msg: 'Transaction successfully deleted'
                    }
                }
                return res.status(201).json(response)
            }else{
                response = {
                    meta: {
                        status: 204,
                        url: 'api/delete' + transaction.id,
                        msg: 'The transaction could not be deleted'
                    }
                }
                return res.status(204).json(response)
            }
            
        } catch (error) {
            throwError(res, error);
        }
    }
}