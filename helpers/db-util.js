import { MongoClient } from "mongodb";

export async function connectDatabase(){
    const url = "mongodb+srv://adelinojusto911:fWpQPz6b3T5545bo@cluster0.ozcth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client  = await MongoClient.connect(url)
    return client;
}

export async function insertDocument(client,collection,document){
    const db = client.db('newsLetter');
    const result =  await db.collection(collection).insertOne(document);
    return result;

}

export async function getDocument(client,collection,searchitem,sort){
    const db = client.db('newsLetter');
    const results = await db.collection(collection).find(searchitem).sort(sort).toArray();
    return results;

}
