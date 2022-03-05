import './Home.css'

export default function Home() {
  return (
    <div>
      <h1 className='flex'>HOME</h1>
      <div className='card'>
        <div className='row g-0'>
          <div className='col-5 col-sm-4'></div>
          <div className='col-7 col-sm-8'>
            <div className='card-body'>
              <h5 className='card-title'>Card title</h5>
              <p className='card-text'>
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <p className='card-text'>
                <small className='text-muted'>Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
