import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import RoutineCards from './RoutineCards'

export default function Routines({ routines }) {
  const navigate = useNavigate()
  if (!routines) return <h1>Loading</h1>

  return (
    <div className='d-flex gap-3 flex-column w-75'>
      <Button
        bg='info'
        variant='info'
        onClick={() => navigate('create-routine')}
      >
        Create New Routine
      </Button>
      <RoutineCards routines={routines} />
    </div>
  )
}
