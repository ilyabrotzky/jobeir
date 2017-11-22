// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { media } from '../../../../styles/breakpoints';
import FormWrapper from '../containers/FormWrapper';
import FormRow from '../components/FormRow';
import { email, required, url, wysiwygLength } from '../../validation';
import {
  Currency,
  Percentage,
  Radio,
  SelectSearch,
  Text,
  Wysiwyg,
  SubmitButton,
} from '../../inputs/input';
import { jobOptions, jobTypeOptions, yesNoOptions } from '../../options/';
import { FormListRemoveIcon } from '../../../../icons/';
import { updateJob } from '../../../account/create/job/ducks/';
import { parseNumber } from '../../parse';

const renderEmailFields = ({ fields }) => (
  <FormListWrapper>
    {fields.map(renderFields)}
    <FormListButton onClick={() => fields.push({})}>
      Add additional email
    </FormListButton>
  </FormListWrapper>
);
const renderFields = (member, index, fields) => (
  <FormListItem key={member}>
    {index > 0 && (
      <FormListRemoveItem onClick={() => fields.remove(index)}>
        <FormListRemoveIcon />
      </FormListRemoveItem>
    )}
    <Field
      name={`${member}.email`}
      label={`${index === 0
        ? 'Send applications to the following emails:'
        : ''}`}
      validate={[email, required]}
      component={Text}
    />
  </FormListItem>
);

class JobEditFrom extends Component {
  buildLocationsDropdown() {
    const { companies } = this.props;
    const activeCompany = companies.created.find(
      comp => comp._id === companies.activeCompany._id,
    );

    return (
      activeCompany &&
      activeCompany.locations.map(location => {
        const {
          unit,
          street_number,
          route,
          locality,
          country,
        } = location.address;
        const noUnit = `${street_number} ${route}, ${locality}, ${country}`;
        const completeAddress = unit ? `${unit} - ${noUnit}` : noUnit;

        return {
          name: completeAddress,
          value: location.address,
        };
      })
    );
  }

  formSubmit = (data): void => {
    const { dispatch, companies, params, showJobPReview } = this.props;

    dispatch(
      updateJob(
        companies.activeCompany._id,
        params.jobId,
        data,
        showJobPReview,
      ),
    );
  };

  render() {
    const { handleSubmit, offersEquity, jobs, initialValues } = this.props;
    return (
      <FormWrapper
        handleSubmit={handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={jobs.errors}
        theme="marble"
      >
        <FormEditContainer>
          {initialValues !== undefined ? (
            <FormEditForm>
              <Field
                name="title"
                label="What's the job title?"
                placeholder="Senior Product Designer, Backend Engineer"
                validate={[required]}
                component={Text}
              />
              <Field
                name="role"
                label="What's the main role of this position?"
                placeholder="Search roles"
                validate={[required]}
                options={jobOptions}
                component={SelectSearch}
                selectedValue={initialValues && initialValues.role}
              />
              <div style={{ paddingBottom: '1rem' }} />
              <Field
                label="Describe the role"
                name="description"
                ui={{ maxWidth: '100%' }}
                validate={[required, wysiwygLength(25)]}
                initialValue={initialValues && initialValues.descriptionRaw}
                component={Wysiwyg}
              />
              <div style={{ paddingBottom: '1rem' }} />
              <Field
                name="employmentType"
                label="Employment Type"
                validate={[required]}
                options={jobTypeOptions}
                type="list"
                component={Radio}
              />
              <Field
                name="address"
                label="Where will the employee be working?"
                validate={[required]}
                options={this.buildLocationsDropdown()}
                type="list"
                row="full"
                component={Radio}
              />
              <Field
                name="remote"
                label="Is this a remote position?"
                validate={[required]}
                options={yesNoOptions}
                type="yes/no"
                component={Radio}
              />
              <FormRow>
                <Field
                  name="salary.min"
                  label="Salary minimum"
                  placeholder="$"
                  parse={parseNumber}
                  component={Currency}
                />
                <Field
                  name="salary.max"
                  label="Salary maximum"
                  placeholder="$"
                  parse={parseNumber}
                  component={Currency}
                />
              </FormRow>
              <Field
                name="equity.offer"
                label="Do you offer equity?"
                validate={[required]}
                options={yesNoOptions}
                type="yes/no"
                component={Radio}
              />
              {offersEquity === 'Yes' && (
                <FormRow>
                  <Field
                    name="equity.min"
                    label="Equity minimum"
                    type="number"
                    placeholder="%"
                    validate={[required]}
                    component={Percentage}
                  />
                  <Field
                    name="equity.max"
                    label="Equity maximum"
                    type="number"
                    placeholder="%"
                    validate={[required]}
                    component={Percentage}
                  />
                </FormRow>
              )}
              <Field
                name="externalLink"
                label="Is there a URL you'd like to link to?"
                placeholder="https://example.com/careers/job-posting"
                validate={[required, url]}
                component={Text}
              />
              <FieldArray
                name="receivingEmails"
                component={renderEmailFields}
              />
              <div style={{ marginTop: '3rem' }}>
                <Field
                  name="submitButton"
                  buttonText="Update"
                  isSubmitting={jobs.isUpdating}
                  component={SubmitButton}
                />
              </div>
            </FormEditForm>
          ) : null}
        </FormEditContainer>
      </FormWrapper>
    );
  }
}

const selector = formValueSelector('job-edit');

const mapStateToProps = state => ({
  companies: state.account.companies,
  jobs: state.account.jobs,
  offersEquity: selector(state, 'equity.offer'),
});

JobEditFrom = reduxForm({
  form: 'job-edit',
})(JobEditFrom);

export default connect(mapStateToProps)(JobEditFrom);

const FormEditContainer = styled.div`
  margin: 0 auto;

  ${media.hd`
    padding: 0 24px;
  `};
`;

const FormEditForm = styled.div`
  max-width: 700px;
  margin: 75px auto 0;
  padding: 40px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.11);
  border-radius: 6px;

  ${media.tablet`
    box-shadow: none;
    padding: 0;
  `};
`;

const FormListWrapper = styled.div`padding-top: 1rem;`;

const FormListItem = styled.div`
  position: relative;
  margin-top: -1rem;
`;

const FormListRemoveItem = styled.div`
  position: absolute;
  right: 18px;
  top: 18px;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.85);
  border-radius: 50%;
  cursor: pointer;
`;

const FormListButton = styled.div`
  position: relative;
  cursor: pointer;
  color: ${props => props.theme.colors.purple};
  text-decoration: underline;
  padding-left: 30px;

  &::before {
    content: '+';
    position: absolute;
    left: 0;
    top: -3px;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.purple};
    height: 16px;
    width: 15px;
    display: flex;
    padding: 2px 0 2px 5px;
    text-align: center;
  }
`;
