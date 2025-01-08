import { fetchContentByLink } from "../../lib/contentful";

export async function getServerSideProps(context) {
  // Extracting the 'link' parameter from the URL context
  const { link } = context.params;

  if (!link) {
    return {
      notFound: true,
    };
  }
  // Fetching the content from Contentful based on the 'link' parameter
  const data = await fetchContentByLink("projectSinglePage", link);

  if (!data || data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: data,
    },
  };
}

export default function ProjectSinglePage({ content }) {
  console.log(content);
  return (
    <>
      <Head>
        <title>Project: Bahareh's Portfolio - SingleProject</title>
        <meta
          name="description"
          content={`Discover the details of a specific project. Learn about the technologies used, challenges overcome, and the creative process behind this project in my portfolio.`}
        />
      </Head>
      <div className="project-single-page">
        {/* Looping through the content data and rendering each project item */}
        {content.map((item) => (
          <div key={item.sys.id} className="project-single-content">
            <h1 className="project-title">{item.fields.title}</h1>
            <div className="project-description">
              <p>{item.fields.description}</p>
              <p>
                <strong>Category:</strong>
                {item.fields.category[0].fields.title}
              </p>
            </div>

            <div className="image-collage">
              {item.fields.image &&
                // Looping through all the images associated with the project
                item.fields.image.map((image) => (
                  <div key={image.sys.id} className="image-item">
                    {/* Using image.sys.id as the unique key for each image to help React efficiently track and update individual items in the list. */}
                    <img
                      src={`https:${image.fields.file.url}`}
                      alt={item.fields.title}
                    />
                  </div>
                ))}
            </div>

            <div className="project-link">
              <a
                href="/project-index"
                className="btn btn-primary btn-project-index"
              >
                Back to Projects
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
