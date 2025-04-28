import { GetRideQueryArgs, GetRideResponse } from "src/types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";


const resolvers: Resolvers = {
    Query: {
        GetRide: privateResolver(
            async(_,args: GetRideQueryArgs, {req}): Promise<GetRideResponse> => {
                const user: User = req.user;
                // await Ride.delete({})
                // user.isTaken = false;
                // user.isRiding = false;
                // user.save();
                try{
                    const ride = await Ride.findOne(
                        {id: args.rideId},
                        {relations: ["passenger","driver","passenger.chatsAsPassenger", "driver.chatsAsDriver"]}
                )
               
                    if(ride){
                        if(ride.passengerId === user.id || ride.driverId === user.id){
                            
                            return {
                                ok: true,
                                error: null,
                                ride 
                            }
                        } else {
                            return {
                                ok: false,
                                error: "not authorized",
                                ride: null 
                            }
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Ride not found",
                            ride: null
                        }
                    }
                }catch(error){
                    return {
                        ok: false,
                        error: error.message,
                        ride: null 
                    }
                }
            }
        )
    }
}

export default resolvers;