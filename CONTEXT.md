# Portfolio Domain Context

## Terms

**Profile** — The personal introduction for Edoardo Galli: name, handle, location, a one-line `focus` (what the work is about), a one-line `now` (current role and study), and the primary call to action.

**Timeline Entry** — One dated row in the experience section: title, organization, period, and an optional note such as a final grade. Work and education entries share this shape.

**Publication** — A paper with a title, ordered author list, short and full venue names, and year. Rendered as compact rows grouped by year, with the author matching the Profile's citation name emphasised.

**Project** — A portfolio work item with a name, repository directory, concise summary, detailed focus points, outcomes, technology labels, and optional live demo.

**Project Detail Page** — A dedicated route for one Project. It expands the Project Card into project context, implementation focus, outcomes, technology labels, and external actions.

**Social Link** — A public identity link such as GitHub or LinkedIn.

**Contact Link** — A direct action link such as email, resume, GitHub, or LinkedIn.

**Portfolio Section** — A top-level page region: navigation, hero, experience, publications, projects, or contact.

**Traced Rule** — The thin vertical rule to the left of a label-column block. A soft highlight follows the pointer along it, and the block's label and emphasised text brighten on hover. `TracedRuleField` is the label-plus-content block; `TracedRuleBlock` is the bare rule surface.

**Terminal Cue** — A lightweight shell-inspired label, prompt, path, command, or monospace annotation. It gives developer context without requiring a full terminal window.

**Project Card** — The interactive shadcn Card surface used to present one Project. It owns the tactile tilt interaction.

**ASCII Mark** — The orange 3D ASCII name mark in the hero. It is the only retained Three.js/WebGL visual effect.
