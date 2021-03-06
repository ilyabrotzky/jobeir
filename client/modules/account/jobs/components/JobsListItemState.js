// @flow
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
// import { showModal } from '../../../modal/ducks';
import { freePaymentRequest } from '../../../payments/stripe/ducks/';

/**
 * Commented out
 * 
 * // import { showModal } from '../../../modal/ducks';
 * // onClick={() => dispatch(showModal('JOB_PAYMENT_MODAL', job))}
 * 
 * because we're handling free payments for now. Once the launch period
 * is over we can start charging for postings
 */

const JobsListItemState = ({ company, dispatch, job }) => {
  switch (job.state) {
    case 'pending':
      return (
        <JobsState
          // onClick={() => dispatch(showModal('JOB_PAYMENT_MODAL', job))}
          onClick={() => dispatch(freePaymentRequest({ company, job }))}
        >
          <PublishButton>Publish</PublishButton>
        </JobsState>
      );
    case 'active':
      return <JobsState />;
    default:
      return null;
  }
};

export default JobsListItemState;

const JobsState = styled.div`
  font-size: 14px;
  text-transform: capitalize;
`;

const PublishButton = styled.button`
  width: 80px;
  font-size: 14px;
  color: ${props => props.theme.colors.purple};
  background: transparent;
  border: 1px solid ${props => props.theme.colors.purple};
  border-radius: 4px;
  cursor: pointer;
  padding: 4px 8px;
  transition: all 260ms ease;

  &:hover {
    background: ${props => props.theme.colors.purple};
    color: #fff;
  }

  ${media.phablet`
    width: 66px;
    padding: 2px 6px;
    font-size: 12px;
  `};
`;
