import { DeletePriceMutationArgs, DeletePriceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Place from "../../../entities/Place";



const resolvers: Resolvers ={
    Mutation: {
        DeletePrice: privateResolver( 
            async(_,args: DeletePriceMutationArgs, {req}): Promise<DeletePriceResponse> => {
                const user: User = req.user;
                try{
                    const place = await Place.findOne({id: args.placeId});
                    if(place){
                        if(place.userId === user.id){
                            place.remove();
                            return {
                                ok: true,
                                error: null 
                            }
                        } else {
                            return {
                                ok: false,
                                error: "Not Authorized "
                            }
                        }
                    } else {
                         return {
                            ok: false,
                            error: ""
                         }
                    }
                    return {
                        ok: true,
                        error: null 
                    }
                }catch(error){
                    return {
                        ok: false, 
                        error: error.message 
                    }
                }
            }
        )
    }
}

export default resolvers;