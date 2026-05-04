export const PROJECT_RETURN_PATH_KEY = "portfolio:project-return-path"

const projectReturnPaths = ["/", "/projects"] as const

type ProjectReturnPath = (typeof projectReturnPaths)[number]

export function isProjectReturnPath(value: string | null): value is ProjectReturnPath {
  return projectReturnPaths.includes(value as ProjectReturnPath)
}
