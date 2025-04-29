import React from "react";
import PropTypes from 'prop-types'
import styled from '../../typed-components';

const Thing = styled.div`
background: ${props => props.theme.blueColor}
`

interface IProps {
    isLoggedIn: boolean;
}

const AppPresenter: React.FC<IProps> = ({isLoggedIn}) => 
    isLoggedIn ? <span>you are in</span>: <span>you are out</span>



AppPresenter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired 
}

export default AppPresenter;