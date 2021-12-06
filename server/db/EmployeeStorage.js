const db = require('./index')
const TABLE_NAME = 'employees'

async function createEmployeeTable(){

    try{
        const sql = 'CREATE Table if not exists employeesbaru( id serial, nama varchar(50) not null,  gender varchar(7) not null, departement varchar(50) not null,  amout text,  PRIMARY KEY (id) )'
      await db.query(sql)

    } catch(error){
        console.error(error)
    }
}

module.exports = createEmployeeTable