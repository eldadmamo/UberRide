import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import cleanNullArgs from "../../../utils/cleanNullArg";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
      EditPlace: privateResolver(
        async (
          _,
          args: EditPlaceMutationArgs,
          { req }
        ): Promise<EditPlaceResponse> => {
          const user: User = req.user;
          try {
            // Destructure the arguments first
            const { placeId, ...updateArgs } = args;
            
            const place = await Place.findOne({ id: placeId });
            if (place) {
              if (place.userId === user.id) {
                // Clean the remaining arguments (excluding placeId)
                const notNull = cleanNullArgs(updateArgs);
                
                await Place.update({ id: placeId }, { ...notNull });
                return {
                  ok: true,
                  error: null
                };
              } else {
                return {
                  ok: false,
                  error: "Not Authorized"
                };
              }
            } else {
              return {
                ok: false,
                error: "Place not found"
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        }
      )
    }
  };
  
  export default resolvers;