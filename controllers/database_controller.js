const db = require("../database_init.js")



class DB_{
    constructor(){
        
    }

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
            db.close()
        //  db.serialize(() => {
        // //  db.run( `CREATE TABLE ${name}(info TEXT)` )
        //  db.close()  
        // })
        return `messages TABLE CREATED`
       }




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
            db.close()
        //  db.serialize(() => {
        // //  db.run( `CREATE TABLE ${name}(info TEXT)` )
        //  db.close()  
        // })
        return `user TABLE CREATED`
       }
    
    
    insert_message_table(value){ 
    
        var insert = `INSERT INTO messages (subject,name,avatar, content, isread, senderid, receiverid) VALUES (?,?,?,?,?,?,?)`
        db.run(insert, [value.subject,value.name,value.avatar,value.content,0,value.senderid,value.receiverid])
    
       return 201
      }

    insert_user_table(value){ 
    
        var insert = `INSERT INTO users (name, avatar, email) VALUES (?,?,?)`
        db.run(insert, [value.name,value.avatar, value.email])
    
       return 201
      }
    
    
    
    read_all_message_table(user){ 
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
            //   res.status(400).json({"error":err.message});
              return;
            }
            console.log(err,"Updated successfully");
            return "Updated"
            // res.json({
            //     "message":"success",
            //     "data":rows
            // })
          });
    
    
       
      }
}











module.exports =  DB_
