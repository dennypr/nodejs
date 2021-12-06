const express = require('express')
const router = express.Router()
const db = require('../db/index')

router.delete('/:id', async(req, res, next) =>{

    try {
        const employee = req.body
        const sqlText = 'DELETE from employeesbaru where id = $1 RETURNING *'
        const sqlParam = [req.params.id]
        const result = (await db.query(sqlText, sqlParam)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }

} )


router.put('/:id', async(req, res, next) =>{

    try {
        const employee = req.body
        const sqlText = 'UPDATE employeesbaru SET nama= $1, gender=$2, departement=$3, amout=$4 where id = $5 RETURNING *'
        const sqlParam = [employee.nama, employee.gender, employee.departement, employee.amout, req.params.id]
        const result = (await db.query(sqlText, sqlParam)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }

} )

router.post('/', async(req, res, next) =>{
    try {
        const employee = req.body
        const sqlText = 'INSERT INTO employeesbaru(nama, gender, departement, amout) values($1, $2, $3, $4) RETURNING *'
        const sqlParam = [employee.nama, employee.gender, employee.departement, employee.amout]
        const result = (await db.query(sqlText, sqlParam)).rows
        res.json(result)
        
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.get('/', async(req, res, next) =>{
    try {
        let sql ='SELECT * FROM EMPLOYEESBARU'
	   // let sql ='SELECT * FROM oss_rba_pengawasan.t_profile'
        let result = (await db.query(sql)).rows
        res.send(result)
    } catch (error) {
        console.error(error)
        next(error)
    }

})

router.get('/:id', async(req, res, next) =>{
	try{
		const sqlText = 'SELECT * from EMPLOYEESBARU where id = $1'
        const sqlParam = [req.params.id]
        const result = (await db.query(sqlText, sqlParam)).rows
        res.json(result)
	}catch(error){
        console.error(error)
        next(error)
	}
})

module.exports = router