import { graphql } from "react-apollo";
import theme from "../../theme";
import reset from "styled-reset" 
import { ThemeProvider, injectGlobal } from "../../typed-components";
import AppPresenter from './AppPresenter';
import { IS_LOGGED_IN } from "./AppQueries";

// tslint:disable-next-line
injectGlobal`
  ${reset}
`;


type AppContainerProps = {
  data?: any;
};

const AppContainer = ({ data }: AppContainerProps) => (
    <ThemeProvider theme={theme}>
        <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </ThemeProvider>
)

export default graphql(IS_LOGGED_IN)(AppContainer);
