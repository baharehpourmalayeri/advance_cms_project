import { fetchContent } from "../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"; // Used to render rich text content from Contentful

// This component renders the About Page
export default function About({ content }) {
  if (!content) return <p>Loading...</p>;

  const images = content.image || [];

  return (
    <>
      <Head>
        <title>Project: Bahareh's Portfolio - About</title>
        <meta
          name="description"
          content={`Learn more about me, my background, skills, and my journey as a web developer. Find out how I approach web design and development to create meaningful digital experiences.`}
        />
      </Head>
      <div className="about-container">
        <h2 className="about-title">{content.title}</h2>
        <section className="about-section about-content">
          <div className="about-image">
            {images[0] && (
              <img
                src={`https:${images[0].fields.file.url}`}
                alt="About Me"
                width={400}
              />
            )}
          </div>
          <div className="about-text">
            {/* Render the rich text content using Contentful's rich-text-renderer */}
            <div>{documentToReactComponents(content.presentation)}</div>
          </div>
        </section>

        <section className="about-section education-content reverse">
          <div className="education-image">
            {images[1] && (
              <img
                src={`https:${images[1].fields.file.url}`}
                alt="Education"
                width={400}
              />
            )}
          </div>
          <div className="education-text">
            <h2 className="headline">Education</h2>
            {Array.isArray(content.educationInformation) ? (
              <ul>
                {content.educationInformation.map((education, index) => (
                  <li key={index}>{education}</li>
                ))}
              </ul>
            ) : (
              <p>{content.educationInformation}</p>
            )}
          </div>
        </section>

        <section className="about-section experience-content">
          <div className="experience-image">
            {images[2] && (
              <img
                src={`https:${images[2].fields.file.url}`}
                alt="Experience"
                width={400}
              />
            )}
          </div>
          <div className="experience-text">
            <h2 className="headline">Experience</h2>
            {Array.isArray(content.workExperience) ? (
              <ul>
                {content.workExperience.map((experience, index) => (
                  <li key={index}>{experience}</li>
                ))}
              </ul>
            ) : (
              <p>{content.workExperience}</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetchContent("aboutMe"); // Fetching the "aboutMe" content from Contentful
    const content = response[0]?.fields || null; // Extract fields from the first result if available
    return { props: { content } };
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return { props: { content: null } };
  }
}
