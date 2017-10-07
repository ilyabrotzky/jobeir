// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import ModalWrapper from '../../modal/components/ModalWrapper';
import SignupForm from '../../user-input/forms/form/SignupForm';
import LoginForm from '../../user-input/forms/form/LoginForm';
import AuthOAuth from '../components/AuthOAuth';

class AuthModal extends Component {
  state: {
    showLoginForm: boolean,
    signupWithEmail: boolean
  };

  constructor(props) {
    super(props);

    this.state = {
      showLoginForm: false,
      signupWithEmail: false
    };
  }

  renderSignup() {
    const { signupWithEmail } = this.state;

    return (
      <div>
        {signupWithEmail ? <SignupForm /> : <AuthOAuth />}
        <AuthModalSignupEmail
          onClick={() => this.setState({ signupWithEmail: !signupWithEmail })}
        >
          {signupWithEmail
            ? 'Sign up with Google, Facebook, or Github'
            : 'Sign up with email'}
        </AuthModalSignupEmail>
        <AuthModalFooter onClick={() => this.setState({ showLoginForm: true })}>
          Already have an account? Log in
        </AuthModalFooter>
      </div>
    );
  }

  renderLogin() {
    return (
      <div>
        <AuthOAuth />
        <LoginForm />
        <AuthModalFooter
          onClick={() => this.setState({ showLoginForm: false })}
        >
          Don’t have an account? Sign up?
        </AuthModalFooter>
      </div>
    );
  }

  render() {
    return (
      <ModalWrapper bgColor="white">
        <AuthModalBody>
          <AuthModalHeader>
            <AuthModalSolidBallPurpleLeft />
            <AuthModalSolidBallPurpleRight />
            <AuthModalHollowBallLeftTop />
            <AuthModalHollowBallLeftBottom />
            <AuthModalHollowBallRightTop />
          </AuthModalHeader>
          <AuthModalContent>
            {this.state.showLoginForm
              ? this.renderLogin()
              : this.renderSignup()}
          </AuthModalContent>
        </AuthModalBody>
      </ModalWrapper>
    );
  }
}

export default AuthModal;

const AuthModalBody = styled.div`
  max-width: 500px;
  width: 100%;
`;

const AuthModalHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.blue};
  min-height: 170px;
  overflow: hidden;

  ${media.tablet`min-height: 120px;`};
  ${media.phonePlus`min-height: 100px;`};
  ${media.phone`min-height: 80px;`};
`;

const AuthModalContent = styled.div`
  padding: 36px;

  ${media.tablet`padding: 24px`};
`;

const AuthModalFooter = styled.div`
  text-align: center;
  cursor: pointer;
  padding-top: 2rem;
  border-top: 1px solid #dce0e0;
`;

const AuthModalSignupEmail = styled.div`
  text-align: center;
  cursor: pointer;
  padding-bottom: 1.5rem;
`;

const AuthModalSolidBall = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.theme.colors.purple};
`;

const AuthModalSolidBallPurpleLeft = AuthModalSolidBall.extend`
  left: -144px;
  top: -201px;
  height: 340px;
  width: 340px;
`;

const AuthModalSolidBallPurpleRight = AuthModalSolidBall.extend`
  right: 20px;
  height: 220px;
  width: 220px;
`;

const AuthModalHollowBallLeftTop = styled.div`
  position: absolute;
  width: 170px;
  height: 170px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  left: 79px;
  top: -126px;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 15px;
    border-radius: 50%;
    width: 140px;
    height: 140px;
    box-shadow: 0px 0px 0px 2000px ${props => props.theme.colors.pink};
  }
`;
const AuthModalHollowBallRightTop = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  right: -45px;
  top: -22px;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 15px;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    box-shadow: 0px 0px 0px 2000px ${props => props.theme.colors.pink};
  }
`;

const AuthModalHollowBallLeftBottom = styled.div`
  position: absolute;
  width: 130px;
  height: 130px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  left: 114px;
  bottom: -57px;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 15px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    box-shadow: 0px 0px 0px 2000px ${props => props.theme.colors.pink};
  }
`;
