import RoutineCards from './RoutineCards'

export default function Routines({ routines }) {
  if (!routines) return <h1>Loading</h1>

  return (
    <div className='d-flex gap-3'>
      <RoutineCards routines={routines} />
    </div>
  )
}
