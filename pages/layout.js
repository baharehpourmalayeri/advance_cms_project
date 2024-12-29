import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "./css/globals.css";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Project: Bahareh's Portfolio</title>
        <meta name="description" content={``} />
      </Head>
      <div className="content-frame">
        <nav className="container">
          <h3>BP</h3>
          <ul className="nav">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/project-index">Projects</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="main-content">{children}</div>
        <footer className="footer">
          <p>Copyright &copy; BP</p>
        </footer>
      </div>
    </>
  );
}
