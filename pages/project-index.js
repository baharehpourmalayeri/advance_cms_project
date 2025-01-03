import { fetchContent } from "../lib/contentful";

export default function ProjectIndexPage({
  projectIndex,
  categories,
  selectedCategory,
}) {
  if (!projectIndex) return <p>Loading...</p>;

  const hasSelectedCategory = (categories, selectedCategory) => {
    return categories.some((category) => category.sys.id === selectedCategory);
  };

  const filteredProjects =
    selectedCategory === "all"
      ? projectIndex.fields.projects
      : projectIndex.fields.projects.filter(
          (project) =>
            project.fields.category &&
            hasSelectedCategory(project.fields.category, selectedCategory)
        );
  console.log(filteredProjects);
  return (
    <div className="project-index">
      <header className="project-index-header">
        <h1>{projectIndex.fields.title}</h1>
        <p className="project-index-description">
          {projectIndex.fields.description}
        </p>
      </header>

      <div className="category-filter">
        <label htmlFor="category">Select Category:</label>
        <select
    id="category"
    className="form-select"
    value={selectedCategory}
    onChange={(e) =>
      (window.location.href = `?category=${e.target.value}`)
    }
  >
    <option value="all">All</option>
    {categories.map((category) => (
      <option key={category.sys.id} value={category.sys.id}>
        {category.fields.title}
      </option>
    ))}
  </select>
      </div>

      {filteredProjects && (
        <div className="projects">
          {filteredProjects.map((project) => (
            <div key={project.sys.id} className="project-preview">
              <h2>
                <a
                  href={"/project-single/" + project.fields.link}
                  className="project-link"
                >
                  {project.fields.title}
                </a>
              </h2>
              <p className="project-summary">{project.fields.summary}</p>
              <a
                href={"/project-single/" + project.fields.link}
                className="project-link"
              >
                {project.fields.image &&
                  project.fields.image[0]?.fields?.file && (
                    <div className="project-image">
                      <img
                        src={`https:${project.fields.image[0].fields.file.url}`}
                        alt={project.fields.title}
                        className="project-img"
                      />
                    </div>
                  )}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const projectData = await fetchContent("projectIndexPage");

  const categoryData = await fetchContent("category");

  const selectedCategory = query.category || "all";

  return {
    props: {
      projectIndex: projectData[0] || null,
      categories: categoryData || [],
      selectedCategory,
    },
  };
}
