import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {  GetNearbyRidesReponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { Between, getRepository } from "typeorm";


const resolvers: Resolvers ={
    Query:{
        GetNearbyRides: privateResolver(
            async(_, __, {req}): Promise<GetNearbyRidesReponse> => {
                const user: User = req.user;
                if(user.isDriving){
                    const { lastLng, lastLat} = user;
                    try{
                const ride  = await getRepository(Ride).findOne({
                    status: "REQUESTING",
                    pickUpLat: Between(lastLat -0.05 , lastLat + 0.05),
                    pickUpLng: Between(lastLng - 0.5, lastLng + 0.05)
                })
                
                    if(ride){
                        return {
                            ok: true, 
                            error: null,
                            ride
                        }
                    } else {
                        return {
                            ok: true,
                            error: null,
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
                } else {
                    return {
                        ok: false,
                        error: "you are not a driver",
                        ride: null 
                    }
                }
            }
        )
    }
}


export default resolvers;