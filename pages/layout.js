import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./css/globals.css";
import { useEffect, useState } from "react";
import { fetchContent } from "@/lib/contentful";

export default function Layout({ children }) {
  const [menu, setMenu] = useState([]);

  const fetchMenu = async () => {
    try {
      const menuData = await fetchContent("menu");
      setMenu(menuData);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

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
            {menu && menu.length > 0 ? (
              menu
                .sort((a, b) => a.fields.order - b.fields.order)
                .map((item, index) => (
                  <li key={index}>
                    <a href={item.fields.link}>{item.fields.title}</a>
                  </li>
                ))
            ) : (
              <li>No menu items available</li>
            )}
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
