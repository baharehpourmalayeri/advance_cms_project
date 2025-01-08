// Importing the function to fetch content by link from Contentful
import Head from "next/head";
import { fetchContent } from "../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function Home({ content }) {
  return (
    <>
      <Head>
        <title>Project: Bahareh's Portfolio - Home</title>
        <meta
          name="description"
          content={`Welcome to my portfolio website, showcasing my web development skills and projects. Explore my work and learn more about my journey as a frontend developer.`}
        />
      </Head>
      <div className="main-content index-content">
        <main className="main">
          {/* Map over content array, rendering a section for each item */}
          {content.map((item) => (
            <div key={item.sys.id} className="content-container">
              <div className="content-left">
                <h4>{item.fields.title}</h4>
                <div>{documentToReactComponents(item.fields.description)}</div>
                <div className="button-container">
                  <a href="/" className="btn btn-primary btn-resume">
                    Resume
                  </a>
                  <a href="/" className="btn btn-primary btn-linkedin">
                    LinkedIn
                  </a>
                </div>
              </div>
              <div className="content-right">
                {item.fields.image && (
                  <img
                    className="image"
                    src={`https:${item.fields.image.fields.file.url}`}
                    alt={item.fields.title}
                  />
                )}
              </div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const data = await fetchContent("homepage"); // Fetch content data from Contentful
  return {
    props: {
      content: data,
    },
  };
}
