export default function Custom404() {
  return (
    <div className="error-container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <div className="button-container">
        <a href="/" className="btn btn-primary btn-home">
          Back to home
        </a>
      </div>
    </div>
  );
}
