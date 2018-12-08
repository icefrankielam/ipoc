import React, { useState } from 'react'
import { path } from 'ramda'
import { compose, graphql, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import * as log from 'loglevel'
import { Link, withRouter } from 'react-router-dom'
import { MdModeEdit, MdSave } from 'react-icons/md'
import ReactSelect from 'react-select'

import apollo from '@/constructors/apollo'
import SettingsRow from '@/components/SettingsRow'
import Button from '@/components/Button'
import Row from '@/components/Row'
import DetailRow from '@/components/DetailRow'

import './PaycheckInfo.sass'

const InlineInput = ({
  className = null,
  value = '',
  ...rest
}) => {
  return (
    <div className={cx({ InlineInput: true, [className]: Boolean(className) })}>
      <input value={value} {...rest} />
    </div>
  )
}


const EmployerRow = ({ employer, employers, status }) => {
  const employerToEmployerOption = emp => {
    if (!emp) return null
    return ({
      label: `${emp.name} / ${emp.employerCode || emp.id}`,
      value: emp.id,
    })
  }

  const [editMode, setEditMode] = useState(false)
  const [localEmployer, setLocalEmployer] = useState(employerToEmployerOption(employer))

  let content = null

  if (employer && !editMode) {
    content = employer.name
  } else if (!employer && !editMode) {
    content = 'n/a'
  } else {
    content = <ReactSelect
      className="EmployerSelect"
      placeholder="No Employer"
      value={localEmployer}
      onChange={selectedOption => setLocalEmployer(selectedOption)}
      options={employers.map(emp => employerToEmployerOption(emp))}
    />
  }

  return (
    <Mutation
      mutation={gql`
        mutation UpdateUser($employerId: Int) {
          updateUser(
            employerId: $employerId,
          ) { employerId }
          createLinkEmployeeToEmployerRequest(
            employerId: $employerId,
          ) { employerId }
        }
      `}
      refetchQueries={() => ([{
        query: gql`{
          myEmployer { name employerCode id }
        }`,
      }])}
      awaitRefetchQueries
    >
      {(mutate, { loading, error, data }) => {
        if (loading) return '...loading'
        if (error) return 'error'
        return (
          <DetailRow
            label={
              <>
                <span style={{ marginRight: '1em' }}>Employer</span>
                  {editMode ? (
                    path(['value'], localEmployer) ? (
                      <Button
                        onClick={async () => {
                          const { data, error } = await mutate({
                            variables: { employerId: parseInt(localEmployer.value, 10) },
                          })
                          if (!error) setEditMode(false)
                        }}
                      >
                        Request Employer Approval
                      </Button>
                    ) : (
                      <Button onClick={() => setEditMode(false)}>
                        X
                      </Button>
                    )
                  ) : (
                    <Button onClick={() => setEditMode(true)}>
                      <MdModeEdit />
                    </Button>
                  )}
              </>
            }
          >
            {content} {`(${status})` || null}
          </DetailRow>
        )
      }}
    </Mutation>
  )
}


const WalletRow = ({ me }) => {
  const [editWalletMode, setEditWalletMode] = useState(false)
  const [wallet, setWallet] = useState(me.wallet)
  return (
    <Mutation
      mutation={gql`
        mutation UpdateUser($wallet: String) {
          updateUser(wallet: $wallet) {
            wallet
            employerId
          }
        }
      `}
       refetchQueries={() => ([{
        query: gql`{
          me { wallet }
        }`,
      }])}
      awaitRefetchQueries
    >
      {(updateUser, { data, error }) => (
        <DetailRow className="WalletRow" label="My Wallet">
          <input
            type="text"
            readOnly={!editWalletMode}
            value={wallet}
            style={{ width: '370px' }}
            onChange={e => setWallet(e.target.value)}
          />
          {editWalletMode ? (
            <Button onClick={() => {
              updateUser({ variables: { wallet } })
              setEditWalletMode(false)
            }}>
              <MdSave />
            </Button>
          ) : <Button onClick={() => setEditWalletMode(true)}><MdModeEdit /></Button>}
        </DetailRow>
      )}
    </Mutation>
  )
}

const WagesRow = ({ me }) => {
  const [editWagesMode, setEditWagesMode] = useState(false)
  const [wagesPerDay, setWagesPerDay] = useState(me.wagesPerDay)
  return (
    <Mutation
      mutation={gql`
        mutation UpdateUser($wagesPerDay: Int) {
          updateUser(wagesPerDay: $wagesPerDay) {
            wagesPerDay
          }
        }
      `}
       refetchQueries={() => ([{
        query: gql`{
          me { wagesPerDay }
        }`,
      }])}
      awaitRefetchQueries
    >
      {(updateUser, { data, error }) => (
        <DetailRow className="WagesRow" label="My Daily Wages (DAI)">
          <input
            type="text"
            readOnly={!editWagesMode}
            value={wagesPerDay}
            style={{ width: '370px' }}
            onChange={e => setWagesPerDay(e.target.value)}
          />
          {editWagesMode ? (
            <Button onClick={() => {
              updateUser({ variables: { wagesPerDay: parseInt(wagesPerDay, 10) } })
              setEditWagesMode(false)
            }}>
              <MdSave />
            </Button>
          ) : <Button onClick={() => setEditWagesMode(true)}><MdModeEdit /></Button>}
        </DetailRow>
      )}
    </Mutation>
  )
}

const PaycheckInfo = (props) => {
  const { data } = props
  const {
    loading,
    me,
    myEmployer,
    employers,
    myLinkEmployerRequest,
  } = data

  if (loading) return '...loading...'

  return (
    <div className="PaycheckInfo">
      <DetailRow label={'My Balance'} value={`$${me.balance} DAI`} />
      <WalletRow me={me} />
      <WagesRow me={me} />
      <EmployerRow employer={myEmployer} employers={employers} status={myLinkEmployerRequest && myLinkEmployerRequest.status} />
    </div>
  )
}


export default compose(
  graphql(gql`{
    me { wallet wagesPerDay balance }
    myEmployer { name employerCode id }
    employers { name employerCode id }
    myLinkEmployerRequest { status }
  }`)
)(PaycheckInfo)
