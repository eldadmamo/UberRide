import Verification from "../../../entities/verification";
import { StartPhoneVerificationMutationArgs, StartPhoneVerificationResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import { sendVerificationSMS } from "../../../utils/sendSMS";

 const resolvers : Resolvers = {
    Mutation: {
        StartPhoneVerification: async (
            _, 
            args: StartPhoneVerificationMutationArgs
        ): Promise<StartPhoneVerificationResponse> => {
            const {phoneNumber} = args;
            try{
               const exisingVerification =  await Verification.findOne({where: {payload: phoneNumber}});

               if(exisingVerification){
                exisingVerification.remove();
               }

               const newVerification = await Verification.create({
                payload: phoneNumber,
                target : "PHONE",
               }).save();
               //to do : send sms
               console.log(newVerification);
            await sendVerificationSMS(newVerification.payload, newVerification.key);
               return {
                ok: true, 
                error:null
               }

            }catch(error){
                return {
                    ok: false,
                    error: error.message 
                }
            }
        }
    }
 }

 export default resolvers;