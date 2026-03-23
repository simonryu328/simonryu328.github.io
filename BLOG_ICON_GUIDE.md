# Blog Icon Generation Guide

Use this guide to generate consistent, high-resolution artistic stone/mineral icons for your blog posts.

## 1. The Base Prompt
Always use this foundational structure. Replace `[OBJECT DESCRIPTION]` with one of the recipes below.

```text
A high-resolution, centered studio shot of a [OBJECT DESCRIPTION] isolated with ample black negative space on all sides. The object should occupy approximately 60% of the frame, surrounded by a pitch-black, void-like background. Use soft rim lighting to define the edges and highlight the intricate surface textures. Minimalist composition, cinematic macro photography, 8k resolution, clean aesthetic, no shadows or visible floor. Masterpiece, wide screen 16:9 aspect ratio.
```

---

## 2. Rock Recipes (Catalog of 24)

### The "Banded & Crystalline" (Agate Style)
1. **The Layered Geode**: "A perfectly sliced Brazilian agate, showing its circular blue and white crystalline geode center surrounded by warm brown, concentric banded layers."
2. **The Blue Lace Agate**: "A smooth, rounded stone of Blue Lace Agate, characterized by delicate, wavy, concentric bands of pale lavender-blue and soft white."
3. **The Fire Agate**: "A polished piece of Mexican Fire Agate, featuring unique iridescent bubbled layers of orange, gold, and red that seem to glow from within."
4. **The Malachite Wheel**: "A cross-section slice of African Malachite, showing concentric circular patterns of deep forest-green and vibrant mint-green."
5. **The Ocean Jasper**: "A perfectly polished piece of Ocean Jasper, displaying complex orbicular patterns in shades of olive green, cream, and deep ochre."
6. **The Rhodochrosite**: "A cross-section of a Rhodochrosite stalactite, revealing vibrant, zigzagged concentric layers of candy-pink and rose-red."

### The "Vibrant Chroma" (High Color)
7. **The Pink Tourmaline**: "A cluster of raw, hot-pink rubellite tourmaline crystals with intense neon saturation and translucent facets."
8. **The Electric Azurite**: "A rough, deeply saturated electric-blue Azurite specimen with a velvety, vibrating cobalt texture."
9. **The Ruby Fuchsite**: "A vibrant emerald-green Fuchsite rock embedded with large, hexagonal crystalline rubies in a shocking magenta-red."
10. **The Violet Charoite**: "A polished slab of Siberian Charoite, showing swirling, pearly flowing patterns of intense violet, lilac, and deep plum."
11. **The Lemon Sulfur**: "A geometric cluster of native sulfur crystals in a shocking, translucent neon-lemon-yellow."
12. **The Sunset Carnelian**: "A translucent, fiery gradient of burnt orange, honey, and blood-red with a polished waxy sheen."

### The "Classic & Minimalist"
13. **The Volcanic Glass**: "A smooth piece of snowflake obsidian, featuring a glossy black surface dotted with crisp, complex white crystal patterns."
14. **The Wishing Stone**: "A matte black river pebble, perfectly oval, featuring a single, flawless, uninterrupted white quartz ring."
15. **The Serene Jade**: "A tumbled, translucent Burmese jadeite stone, revealing a soothing gradient of pale mint-green to deep mossy tones."
16. **The Black Tourmaline**: "A raw, vertical column of black schorl tourmaline, showing sharp, parallel vertical striations and a glassy obsidian luster."

### The "Exotic & Rare"
17. **The Pyrite Cluster**: "A sharp, geometric cluster of cubic pyrite (fool's gold), showing brilliant metallic-gold luster and precise 90-degree edges."
18. **The Amethyst Cathedral**: "A dense cluster of deep-purple amethyst crystal points with sharp facets that sparkle under soft lighting."
19. **The Starfield Sphere**: "A polished sphere of royal-blue Lapis Lazuli with golden pyrite specks, resembling a field of distant stars."
20. **The Peacock Ore**: "A rough chunk of Bornite, displaying a vibrant, metallic iridescent tarnish of electric blues, purples, and magentas."
21. **The Shimmering Eye**: "A polished slice of golden-brown Tiger's Eye, showing its characteristic chatoyancy and shimmering fibrous bands."
22. **The Sand Rose**: "A blossom-shaped cluster of sandy-tan Barite, featuring delicate crystal blades that overlap like rose petals."
23. **The Ancient Fossil**: "A petrified wood fragment transformed into opalized stone that reveals a vivid mosaic of rainbow fire flashes."
24. **The Bismuth Staircase**: "An iridescent lab-grown Bismuth crystal, showing complex, rainbow-colored hopper crystal structures that look like a geometric staircase."

---

## 4. Nature Masterpieces (Non-Rock)
Use these for a more organic, systems-focused, or biological feel.

25. **The Iridescent Morpho**: "An extreme macro shot of a vibrant peacock-blue Morpho butterfly wing, revealing its microscopic shimmering scales and iridescent structural color."
26. **The Frozen Bubble**: "A single, perfectly spherical air bubble trapped inside a block of crystal-clear ice, featuring intricate radial frost patterns and sharp microscopic fractures."
27. **The Hummingbird Plume**: "A single iridescent hummingbird feather, showing microscopic barbs that shift between emerald green, deep purple, and gold."
28. **The Crystal Snowflake**: "A single, perfectly symmetrical six-sided macro-snowflake, showing its fragile, crystalline architecture and sharp ice facets."
29. **The Nautilus Spiral**: "A polished cross-section of a nautilus shell, revealing its perfect logarithmic spiral chambers and its shimmering, pearly iridescence from within."
30. **The Dragonfly Glass**: "An extreme macro shot of a dragonfly wing, showing its intricate network of black 'veins' and its translucent, shimmering glass-like membrane."
31. **The Ghost Orchid**: "A rare, floating Ghost Orchid, showing its long, white, tentacle-like petals and translucent, frog-like form."
32. **The Honeycomb Golden**: "wh."
33. **The Dandelion Orb**: "A single, perfect dandelion seed head, showing its microscopic star-shaped fluff and delicate filaments in sharp focus."
34. **The Peacock Spider**: "A macro shot of a Peacock Spider's abdomen, displaying its vivid, shield-like pattern with electric-blue and fiery-red iridescent 'scales'."
35. **The Skeletal Leaf**: "A translucent, skeletal leaf from an ancient fern, showing its intricate golden-brown fractal vein network and its lacy structure."
36. **The Bioluminescent Glow**: "A cluster of tiny, neon-blue bioluminescent mushrooms (Mycena chlorophos), with soft glowing gills and translucent stems."

---

## 5. Implementation
1. **Generate**: Use the Base Prompt + Description + `--ar 16:9`.
2. **Save**: Put the result in `/public/blog-icons/[slug].png`.
3. **Map**: Add the slug and path to the `IMAGE_ICONS` constant in `components/blog-icons.tsx`.
