# 🎨 Project Icon Generation Guide

To maintain the premium, consistent look for your featured projects, follow this "secret sauce" formula for generating new icons.

## The Secret Sauce Prompt
Use this exact template in your image generation tool (Midjourney, DALL-E 3, etc.):

> **[OBJECT] icon, minimalist design, premium 3D glassmorphism, frosted glass texture, soft ambient shadows, clean rounded edges, studio lighting, monochromatic blue and white theme, high resolution render, isolated on plain black background.**

### Why this works:
*   **[OBJECT]**: Replace this with a simple noun (e.g., "satellite", "brain", "server stack").
*   **Glassmorphism + Frosted Glass**: Creates that high-end "Apple" depth.
*   **Monochromatic Blue/White**: Ensures colors match your site's dark mode and link colors.
*   **Plain Black Background**: Makes it easier to handle transparency or frame it consistently.

---

## 🏗️ Technical Checklist for New Projects

1.  **Generate & Save**:
    *   Generate the image using the prompt above.
    *   Save it to `public/images/projects/your-project-name.png`.
    *   *Tip: For absolute perfection, use a background removal tool or set the CSS background to match the icon's black background.*

2.  **Update `app/page.tsx`**:
    Add the new project to the `featuredProjects` array:
    ```tsx
    {
      title: "New Project Name",
      description: "Brief 1-2 sentence overview of the technical challenge.",
      link: "/blog/new-project-slug",
      image: "/images/projects/your-project-name.png",
      github: "https://github.com/simonryu328/repository",
      tags: ["Tech1", "Tech2"],
    }
    ```

3.  **Create the Blog Post**:
    Ensure you create a corresponding `.mdx` file in `content/blog/` so the `link` has a destination!

---

## 💡 Style Consistency Tips
*   **Simplicity**: Avoid complex scenes. Stick to one central "hero" object.
*   **Angles**: If your icons start looking inconsistent, add "straight-on view" or "3/4 perspective view" to the prompt to force a specific angle.
*   **Lighting**: Keep "studio lighting" in the prompt to ensure the "glow" is consistent across the set.
