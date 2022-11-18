const makeValidation = require('@withvoid/make-validation');
const bcrypt = require('bcrypt');
const conn = require('../db');

module.exports = {
    
    onCreateCustomer: async (req, res) => {
        try {
            
            const validation = makeValidation(types => ({
                payload: req.body,
                checks: {
                    firstName: { type: types.string },
                    lastName: { type: types.string },
                    email: { type: types.string },
                    password: { type: types.string }
                }
            }));

            if (!validation.success) return res.status(400).json(validation);

            const { firstName, lastName, email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            conn.execute("Insert into customer (firstName, lastName, email, password) Values (?, ?, ?, ?)",

             [firstName, lastName, email, hashedPassword],

             (err, results, fields) => {

                console.log(err)

                if(err) {
                    res.status(200).json({ success: false, message: err.toString()})
                }

                if(results && results.affectedRows === 1) {
                  res.status(200).json({ success: true, message : "user created successfully"})
                }

            });

        } catch (error) {

            console.log(error)

            return res.status(500).json({
                success: false,
                error: error.toString()
            })
        }
    }
}