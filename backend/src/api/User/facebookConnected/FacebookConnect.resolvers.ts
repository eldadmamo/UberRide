import User from "../../../entities/User";
import { FacebookConnectMutationArgs, FacebookConnectResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
     FacebookConnect:async (
            _,
            args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
        const {fbId} = args;
        try{
            const existingUser = await User.findOne({where: { fbId }});
            if(existingUser){
                return {
                    ok: true, 
                    error:null,
                    token: "Coming soon, already"
                }
             } else {

             }
           }
    catch(error){
            return {
                ok: false,
                error: error.message,
                token: null 
            }
        }
        try{
            await User.create({
                ...args, 
                profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
            }).save();
            
                return {
                    ok: true, 
                    error: null,
                    token: "Coming soon"
                }
            
        }catch(error){
            return{
                ok:false,
                error:error.message,
                token: null
            }
        }
        
    }
}
}

export default resolvers;