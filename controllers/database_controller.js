const db = require("../database_init.js")


// A constructor class for all the functions, I can export the Class and access all functions as methods from there
class DB_{
    constructor(){
        
    }

// this method creates a table for messages only
    create_message_table(){ 

        db.run(`CREATE TABLE messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject text, 
            name text, 
            avatar text, 
            content text,
            senderid INTEGER,
            receiverid Integer, 
            isread BOOL
            )`),
            console.log("Table Created successfully=========================>>>>");
        (err) => {
            if (err) {
                console.log(err,"Table already exist");
                // Table already created
            }}
            
        //  db.serialize(() => {
        // //  db.run( `CREATE TABLE ${name}(info TEXT)` )
        //  db.close()  
        // })
        return `messages TABLE CREATED`
       }


// this method creates a table for users only
    create_user_table(){ 

        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            avatar text,
            email TEXT NOT NULL UNIQUE
            
            )`),
            console.log("Table Created successfully=========================>>>>");
        (err) => {
            if (err) {
                console.log(err,"Table already exist");
                // Table already created
            }}
            
        //  db.serialize(() => {
        // //  db.run( `CREATE TABLE ${name}(info TEXT)` )
        //  db.close()  
        // })
        return `user TABLE CREATED`
       }
    
// this method inserts values for messages table only
    insert_message_table(value){ 
    
        var insert = `INSERT INTO messages (subject,name,avatar, content, isread, senderid, receiverid) VALUES (?,?,?,?,?,?,?)`
        db.run(insert, [value.subject,value.name,value.avatar,value.content,0,value.senderid,value.receiverid])
    
       return 201
      }
// this method inserts values for users table only
    insert_user_table(value){ 
    
        var insert = `INSERT INTO users (name, avatar, email) VALUES (?,?,?)`
        db.run(insert, [value.name,value.avatar, value.email])
    
       return 201
      }
    
// this method gets all messages from a sigle user  
    read_all_message_table(user){ 
        // A promise is used because the function was returning before the results were ready
        return new Promise( (resolve, reject) => {
            console.log(user,"==========>>>>")
            var sql = `select * from messages WHERE receiverid='${user}'`
            var params = []
            return db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log(err,"There was an error");
                    reject(err)
                //   res.status(400).json({"error":err.message});
                  return;
                }
                // console.log(err,"There was no error when reading++++========>>");
                console.log(rows)
                resolve(rows)
                // res.json({
                //     "message":"success",
                //     "data":rows
                // })
              });
        
        })
    
       
      }
// this method gets a single user by email 
    read_user_table(data){ 
        return new Promise( (resolve, reject) => {

        var sql = `SELECT * FROM users WHERE email="${data.email}";`
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.log(err,"There was an error");
                reject(err)
            //   res.status(400).json({"error":err.message});
              return;
            }
            
            resolve(rows)
            
            // res.json({
            //     "message":"success",
            //     "data":rows
            // })
          });
    
        })
       
      }

// this method updates the isread column only
    update_message_table(data){ 

        let query = `UPDATE messages SET `
        if(data.isread){
            query += `isread=${data.isread}`
        }

        var sql = `${query} WHERE id=${data.id}`
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.log(err,"There was an error");
           
              return;
            }
            console.log(err,"Updated successfully");
            return "Updated"
            
          });
    
    
       
      }
}











module.exports =  DB_
