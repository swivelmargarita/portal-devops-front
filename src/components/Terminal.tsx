import React, { type JSX } from 'react'
import { ReactTerminal } from 'react-terminal'

const Terminal = (): JSX.Element => {
  const commands: { whoami: string, cd: (arg: string) => string } = {
    whoami: 'jackharper',
    cd: (directory) => `changed path to ${directory}`
  }
  return (
    <div className={'ms-3'}>
      <ReactTerminal
        commands={commands}
      />
    </div>
  )
}
export default Terminal
