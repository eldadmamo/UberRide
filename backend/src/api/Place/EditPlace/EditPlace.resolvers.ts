import privateResolver from "../../../utils/privateResolver";
import { Resolvers } from "../../../types/resolvers";
import { EditPlaceMutationArgs, EditPlaceResponse } from "src/types/graph";
import User from "src/entities/User";
import Place from "src/entities/Place";
import cleanNullArgs from "src/utils/cleanNullArg";


const resolvers: Resolvers = {
    Mutation: {
        EditPlace: privateResolver( 
            async(_,args: EditPlaceMutationArgs, {req}): Promise<EditPlaceResponse> => {
                const user: User = req.user;
                try{
                    const place = await Place.findOne({id: args.placeId})
                    if(place){
                        if(place.userId === user.id){
                            const notNull = cleanNullArgs(args);
                            await Place.update({id: args.placeId}, {...notNull});
                            return {
                                ok: false, 
                                error: null 
                            }
                        } else {
                            return {
                                ok: false,
                                error: "Not Authorized"
                            }
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Place not found"
                        }
                    }
                    return {
                        ok: false, 
                        error: null 
                    }
                }catch(error){
                    return {
                        ok: true,
                        error: error.message 
                    }
                }
            }
        )
    }
}

export default resolvers;