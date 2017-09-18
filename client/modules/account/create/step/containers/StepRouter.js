// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { media } from '../../../../../styles/breakpoints';

class StepRouter extends Component {
  componentDidMount() {
    const { params, user } = this.props;

    // If new user, take them through values first
    if (!user.agreedToValues) {
      return browserHistory.push('/create/company/onboarding');
    }

    // If user refreshes on create company take them back
    if (params.create === 'company') {
      return browserHistory.push('/create/company/about');
    }

    // If user refreshes on job company take them back
    if (params.create === 'job') {
      return browserHistory.push(`/create/job/about/${params.companyId}`);
    }

    return browserHistory.push(`/account/jobs`);
  }

  render() {
    return (
      <StepRouterContainer>
        {this.props.children}
      </StepRouterContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user
});

export default connect(mapStateToProps)(StepRouter);

const StepRouterContainer = styled.div`
  position: relative;
  width: 960px;
  margin: 0 auto;
  display: flex;
  min-height: calc(100vh - 175px);

  @media (max-width: 1280px) {
    margin-top: 50px;
  }

  ${media.desktop`
    width: 900px;
    padding: 0 50px;
  `};

  ${media.tablet`
    width; 100%;
    padding: 0 24px;
  `};
`;
