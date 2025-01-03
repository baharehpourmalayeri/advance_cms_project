import Layout from "./layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./css/globals.css";
import "./css/index.css";
import "./css/project-index.css";
import "./css/project-single.css";
import "./css/about.css";
import "./css/contact.css";
import "./css/404.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <style jsx global>{`
        html,
        body {
          max-width: 100vw;
          overflow-x: hidden;
          background-color: #171717;
          height: 100%;
          margin: 0;
        }

        * {
          font-family: "Inter", sans-serif;
        }
        body {
          margin: 0;
          padding: 0;
        }

        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
      <Component {...pageProps} />
    </Layout>
  );
}
