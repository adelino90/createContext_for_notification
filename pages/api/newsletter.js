import { connectDatabase,insertDocument } from "../../helpers/db-util";


async function handler(req, res){
   
    if(req.method === 'POST'){
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes('@')){
            res.status(422).json({message:'Invalid Email Address'})
            return;
        }
        let client,result;

        try{
            client = await connectDatabase()
        }
        catch(error){
           res.status(500).json({message:'connecting to database failed'});
           return;
        }
        try{
            result = await insertDocument(client,'emails',{email:userEmail})
            client.close();
        }
        catch(error){
            res.status(500).json({message:'Inserting Data failed'});
            return;
        }

        setTimeout(()=>res.status(201).json({message:'Signed Up!',result:result}), 5000)
            
    }

}

export default handler;








