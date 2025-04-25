import { Resolvers } from "../../../types/resolvers";
import { EmailSignInVerifyMutationArgs, EmailSignInVerifyResponse } from '../../../types/graph';
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignInVerify: async (_, args: EmailSignInVerifyMutationArgs): Promise<EmailSignInVerifyResponse> => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            error: "No user found with that email",
            token: null
          };
        }
        const checkPassword = await user.comparePassword(password);
        if (checkPassword) {
          const token = createJWT(user.id);
          return {
            ok: true,
            error: null,
            token
          };
        } else {
          return {
            ok: false,
            error: "Wrong password",
            token: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error instanceof Error ? error.message : "An unexpected error occurred",
          token: null
        };
      }
    }
  }
};
export default resolvers;