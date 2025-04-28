import User from "../../../entities/User";
import { ToogleDrivingModeResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";


const resolvers: Resolvers = {
    Mutation: {
        ToggleDrivingMode: privateResolver(
            async(_, __, {req}): Promise<ToogleDrivingModeResponse> => {
                const user: User = req.user;
                user.isDriving = !user.isDriving;
                user.save() 
                console.log(user)
                return {
                    ok: true,
                    error: null 
                }
            }
        )
    }
}

export default resolvers;