import { MongoClient } from "mongodb";
import { connectDatabase,insertDocument,getDocument } from "../../../helpers/db-util";

async function handler(req,res){
    let client,result;
    const eventId = req.query.eventId;
    try{
        client = await connectDatabase()
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'connecting to database failed'});
        return;
    }
    if(req.method === 'POST'){
        const {email, name, text} = req.body.commentData;
        if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
            res.status(422).json({message:'Invalid Input',success:false})
            client.close();
            return;
        }
        const newComment = {
            eventId,
            email,
            name,
            text
        }
        try{
            const result = await insertDocument(client,'comments',newComment);

            setTimeout(()=>res.status(201).json({message:'comment added',newComment,result:result,success:true}), 5000)
            
        }
        catch(error){
            res.status(500).json({message:'Inserting Data failed',success:false});
        }
    }
    else if(req.method === 'GET'){

    try{
            result = await getDocument(client,'comments',{ eventId: eventId },{_id:-1})

            res.status(201).json({comments:result})
        }
        catch(error){
            res.status(500).json({message:'getting Data failed'});
        }
    }
    client.close();

    return;
    
}

export default handler;