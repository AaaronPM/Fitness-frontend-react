import { forwardRef } from 'react'
import Popover from 'react-bootstrap/Popover'

const ErrPopover = forwardRef((props, ref) => (
  <Popover
    {...props}
    ref={ref}
    id='popover-basic'
    className='border-danger text-danger'
  >
    <Popover.Header as='h3' className='border-danger text-danger fw-bolder'>
      {props.errmessage.name}
    </Popover.Header>
    <Popover.Body className='text-danger fw-bold'>
      {props.errmessage.message}
    </Popover.Body>
  </Popover>
))

export default ErrPopover
