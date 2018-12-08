import React, { useState } from 'react'
import { Mutation, Query, graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import * as log from 'loglevel'
import { Link, withRouter } from 'react-router-dom'

import Button from '@/components/Button'

import './EmployerLinkAccountRequests.sass'

const EmployeeRequestRow = ({ request, onApprove, onReject, onCancel }) => {
  return (
    <div className="EmployeeRequestRow">
      userId: {request.userId}
      status: {request.status}
      {['PENDING_REVIEW', 'REJECTED'].includes(request.status)  ? <Button onClick={onApprove}>Approve</Button> : null}
      {['PENDING_REVIEW', 'APPROVED'].includes(request.status) ? <Button onClick={onReject}>Reject</Button> : null}
    </div>
  )
}


const EmployerLinkAccountRequests = ({
  history,
  linkEmployeeToEmployerRequestsQuery,
}) => {
  if (linkEmployeeToEmployerRequestsQuery.loading) return '...loading'
  if (linkEmployeeToEmployerRequestsQuery.error) return '...error'

  const { linkEmployeeToEmployerRequests } = linkEmployeeToEmployerRequestsQuery

  return (
    <Mutation
      mutation={gql`
        mutation LinkEmployeeRequest($status: String, $linkEmployeeRequestId: Int) {
          updateLinkEmployeeToEmployerRequest(status: $status, linkEmployeeRequestId: $linkEmployeeRequestId) { status }
        }
      `}
      refetchQueries={() => ([{
        query: gql`{
          linkEmployeeToEmployerRequests { id userId status }
          myLinkEmployerRequest { status }
        }`,
      }])}
      awaitRefetchQueries
    >
      {(updateLinkEmployeeToEmployerRequest, { error, loading, data }) => {
        return (
          <div className="EmployerLinkAccountRequests">
            {linkEmployeeToEmployerRequests.map((request, i) => (
              <EmployeeRequestRow
                key={i}
                request={request}
                onApprove={async () => {
                  await updateLinkEmployeeToEmployerRequest({
                    variables: {
                      status: 'APPROVED',
                      linkEmployeeRequestId: parseInt(request.id, 10),
                    },
                  })
                }}
                onReject={async () => {
                  await updateLinkEmployeeToEmployerRequest({
                    variables: {
                      status: 'REJECTED',
                      linkEmployeeRequestId: parseInt(request.id, 10),
                    },
                  })
                }}
              />
            ))}
          </div>
        )
      }}
    </Mutation>
  )
}


export default compose(
  graphql(gql`{
    linkEmployeeToEmployerRequests { id userId status }
  }`,
  { name: 'linkEmployeeToEmployerRequestsQuery' })
)(EmployerLinkAccountRequests)
