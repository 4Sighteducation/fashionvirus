"""One-shot: remove the black background from the clothing-label logo.

Flood-fills the connected near-black region from the image edges so the
dark text/care icons inside the label are untouched, then crops to content.
"""

from collections import deque

from PIL import Image

SRC = "public/assets/brand/label-on-black.png"
DST = "public/assets/brand/fashion-virus-label.png"
THRESHOLD = 48  # max channel value counted as background black

img = Image.open(SRC).convert("RGBA")
w, h = img.size
px = img.load()

visited = bytearray(w * h)
queue = deque()

def is_black(x: int, y: int) -> bool:
    r, g, b, _ = px[x, y]
    return r < THRESHOLD and g < THRESHOLD and b < THRESHOLD

# Seed from all four edges.
for x in range(w):
    for y in (0, h - 1):
        if is_black(x, y) and not visited[y * w + x]:
            visited[y * w + x] = 1
            queue.append((x, y))
for y in range(h):
    for x in (0, w - 1):
        if is_black(x, y) and not visited[y * w + x]:
            visited[y * w + x] = 1
            queue.append((x, y))

while queue:
    x, y = queue.popleft()
    px[x, y] = (0, 0, 0, 0)
    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
        if 0 <= nx < w and 0 <= ny < h and not visited[ny * w + nx] and is_black(nx, ny):
            visited[ny * w + nx] = 1
            queue.append((nx, ny))

# Soften the halo: make remaining dark edge pixels adjacent to transparency semi-transparent.
bbox = img.getbbox()
img = img.crop(bbox)
img.save(DST)
print("saved", DST, img.size)
