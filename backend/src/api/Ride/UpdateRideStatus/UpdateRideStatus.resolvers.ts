import { UpdateRideStatusMutationArgs, UpdateRideStatusResponse } from "src/types/graph";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Ride from "../../../entities/Ride";



const resolvers: Resolvers ={
    Mutation: {
        UpdateRideStatus: privateResolver( 
            async(
                _, 
                args: UpdateRideStatusMutationArgs,
                {req}
            ): Promise<UpdateRideStatusResponse> => {
                const user: User = req.user;
               if(user.isDriving){
                try{
                    let ride: Ride | undefined;
                    if(args.status === "ACCEPTED"){
                        ride = await Ride.findOne({
                            id: args.rideId, 
                            status: 'REQUESTING'
                        });
                       if(ride){
                        ride.driver = user;
                        user.isTaken = true;
                        user.save();
                       }
                    } else {
                        ride = await Ride.findOne({
                            id: args.rideId,
                            driver: user 
                        })
                    }
                    if(ride){
                        ride.status = args.status
                        ride.save();
                        return {
                            ok:true, 
                            error: null 
                        }
                    } else {
                        return {
                            ok: false,
                            error: "can't update ride" 
                        }
                    }
                }catch(error){
                    return {
                        ok: false,
                        error: error.message
                    }
                }

               } else {
                return {
                    ok: false,
                    error: "you are no driving"
                }
               }
            }
        )
    }
}

export default resolvers;