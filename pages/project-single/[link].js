import { fetchContentByLink } from "../../lib/contentful";
import "../css/project-single.css";

export async function getServerSideProps(context) {
  const { link } = context.params;

  if (!link) {
    return {
      notFound: true,
    };
  }

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
  console.log(content)
  return (
    <div className="project-single-page">
      {content.map((item) => (
        <div key={item.sys.id} className="project-single-content">
          <h1 className="project-title">{item.fields.title}</h1>
          <div className="project-description">
            <p>{item.fields.description}</p>
            <p><strong>Category:</strong>{item.fields.category[0].fields.title}</p>
          </div>

          <div className="image-collage">
            {item.fields.image &&
              item.fields.image.map((image) => (
                <div key={image.sys.id} className="image-item">
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
  );
}
