import Container from 'react-bootstrap/Container'
export default function Routines({ routines }) {
  if (!routines) return <h1>Loading</h1>

  return (
    <>
      {routines &&
        routines.map((routine, idx) => {
          console.log('routine -->', routine)
          return (
            <Container
              key={routine.id}
              className='d-flex border flex-column gap-3 p-3 m-2'
            >
              <h1>{routine.name}</h1>
              <h4>{routine.goal}</h4>
            </Container>
          )
        })}
    </>
  )
}
