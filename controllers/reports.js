'use strict'

const {MongoClient} = require("mongodb");
const { db } = require("../models/user");

const uri = "mongodb://localhost:27017"
connect();
async function connect() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db("incidencias");
        console.log(`Connected to database ${db.databaseName}`)

        //IMPRIMIR TODAS LAS COLECCIONES DE LA BASE DE DATOS
        /*
        const collections = await db.collections();
        collections.forEach(c=>console.log(c.collectionName));
        */

        //IMPRIMIR UNA COLECCIÓN EN ESPECÍFICO
        const problems = db.collection("problems");
        const searchCursor = await problems.find({
            code: "2"
        });
        const countCursor = await problems.countDocuments({
            state: "active"
        });
       
        console.log(countCursor);
        const problemsArray = await searchCursor.toArray();
        //console.table(subjectsArray);
        problemsArray.forEach(r=>console.log(r));
        //console.log(await searchCursor.hasNext());
        /*while (await searchCursor.hasNext()){
            console.log(await searchCursor.next())
        }*/
    }
    catch (ex){
        console.error(`Ha ocurrido un error ${ex}`)
    }
    finally{
        client.close();
    }
}




