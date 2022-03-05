import "./Home.css";

export default function Home() {
  return (
    <div>
    <h1 className="flex">HOME</h1>
      <div class="card">
        <div class="row g-0">
          <div class="col-5 col-sm-4"></div>
          <div class="col-7 col-sm-8">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
