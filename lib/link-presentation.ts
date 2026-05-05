import { FileText, Mail } from "lucide-react"
import { FaLinkedin } from "react-icons/fa6"
import { SiGithub } from "react-icons/si"

import type { LinkKind, PortfolioLink } from "@/lib/portfolio-content"

const socialLinkKinds = ["github", "linkedin"] satisfies LinkKind[]

export const linkKindIcons = {
  github: SiGithub,
  linkedin: FaLinkedin,
  resume: FileText,
  email: Mail,
}

export function getExternalAnchorProps(link: { external?: boolean }) {
  return link.external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {}
}

export function getNavbarSocialLinks(links: PortfolioLink[]) {
  return links.filter((link) =>
    (socialLinkKinds as readonly LinkKind[]).includes(link.kind),
  )
}

export function getContactDisplayLabel(link: PortfolioLink) {
  return link.label.toLowerCase()
}

export function getAccessibleLinkLabel(link: PortfolioLink) {
  return link.label
}
