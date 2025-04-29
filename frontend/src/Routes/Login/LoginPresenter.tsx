import Helmet from 'react-helmet';
import styled from 'styled-components';
import bgImage from "../../../public/bg.png"
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  height: 70%;
  background: linear-gradient(rgba(0, 153, 196, 0.5), rgba(0, 153, 196, 0.4)),
    url(${bgImage});
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  width: 110px;
  height: 110px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 -14px 28px rgba(0, 0, 0, 0.22);
  text-transform: uppercase;
  font-weight: 500;
  font-size: 25px;
`;

const Title = styled.h1``;

const Footer = styled.div``;

const Subtitle = styled.h2`
  font-size: 30px;
`;

const FakeInput = styled.div`
  margin: 50px 0px;
  font-size: 25px;
  font-weight: 300;
`;

const PhoneLogin = styled.div`
  padding: 20px;
  cursor: pointer;
`;

const Grey = styled.span`
  color: ${props => props.theme.greyColor};
  margin-left: 10px;
`;

const SocialLogin = styled.div`
  border-top: 1px solid ${props => props.theme.greyColor};
  padding: 30px 20px;
`;

const SocialLink = styled.span`
  color: ${props => props.theme.blueColor};
  font-size: 20px;
  cursor: pointer;
`;

const LoginPresenter = () => {
return (
    <Container>
        <Helmet>
            <title>Login | Uber</title>
        </Helmet> 
        <Header>
          <Logo>
            <Title>Uber</Title>
          </Logo>
        </Header>  
        <Footer>
          <Link to={"/phone-login"}>
           <PhoneLogin>
             <Subtitle>Get moving with Uber</Subtitle>
             <FakeInput>
              +251 <Grey>Enter your mobile Number</Grey>
             </FakeInput>
           </PhoneLogin>
          </Link>  
          <Link to={"/social-login"}>
             <SocialLogin>
                <SocialLink>Or connect with social</SocialLink>
             </SocialLogin>
          </Link>
          
        </Footer>   
    </Container>   
)
}


export default LoginPresenter;