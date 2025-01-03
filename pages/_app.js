import Layout from "./layout";
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
      <Component {...pageProps} />
    </Layout>
  );
}
