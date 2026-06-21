#!/usr/bin/env python3
"""Validate the watercolor icon PNG exports."""

from __future__ import annotations

import sys
from collections import Counter
from pathlib import Path

from PIL import Image


NAVIGATION_ICONS = (
    "icon-home.png",
    "icon-discover.png",
    "icon-gallery.png",
    "icon-itinerary.png",
    "icon-japan.png",
    "icon-korea.png",
    "icon-budget.png",
    "icon-stays.png",
    "icon-transport.png",
    "icon-map.png",
    "icon-souvenirs.png",
    "icon-settings.png",
)

PLACE_TYPE_ICONS = (
    'temple.png',
    'palace.png',
    'viewpoint.png',
    'camera.png',
    'restaurant.png',
    'market.png',
    'museum.png',
    'park.png',
    'nature.png',
    'beach.png',
    'nightlife.png',
    'shopping.png',
    'transport.png',
    'hotel.png',
    'activity.png',
    'cultural.png',
    'waterfall.png',
    'onsen.png',
    'default.png',
)


def border_pixels(image: Image.Image):
    width, height = image.size
    pixels = image.load()
    for x in range(width):
        yield pixels[x, 0]
        yield pixels[x, height - 1]
    for y in range(1, height - 1):
        yield pixels[0, y]
        yield pixels[width - 1, y]


def validate(path: Path) -> list[str]:
    errors: list[str] = []
    with Image.open(path) as image:
        if image.format != "PNG":
            errors.append(f"format={image.format}, expected PNG")
        if image.mode != "RGBA":
            errors.append(f"mode={image.mode}, expected RGBA")
            return errors

        alpha = image.getchannel("A")
        alpha_min, alpha_max = alpha.getextrema()
        if alpha_min != 0:
            errors.append(f"alpha minimum={alpha_min}, expected 0")
        if alpha_max == 0:
            errors.append("image contains no visible object pixels")

        border = list(border_pixels(image))
        opaque_border = [rgba for rgba in border if rgba[3] >= 250]
        white_border = [
            rgba for rgba in opaque_border if min(rgba[:3]) >= 245
        ]
        if white_border:
            errors.append("opaque white background pixels remain on the border")

        # A baked checkerboard has repeated opaque gray/white colors at the border.
        common_opaque = Counter(rgba[:3] for rgba in opaque_border).most_common(2)
        checker_colors = sum(
            count
            for rgb, count in common_opaque
            if max(rgb) - min(rgb) <= 8 and 160 <= min(rgb) <= 255
        )
        if checker_colors > max(8, len(border) // 20):
            errors.append("possible opaque checkerboard background remains")

        width, height = image.size
        corners = (
            image.getpixel((0, 0))[3],
            image.getpixel((width - 1, 0))[3],
            image.getpixel((0, height - 1))[3],
            image.getpixel((width - 1, height - 1))[3],
        )
        if any(corner != 0 for corner in corners):
            errors.append(f"corners are not fully transparent: {corners}")

        print(
            f"{path.name}: {width}x{height}, mode={image.mode}, "
            f"alpha=({alpha_min}, {alpha_max}), transparent corners=OK"
        )
    return errors


def main() -> int:
    project_dir = Path(__file__).resolve().parents[1]
    if len(sys.argv) > 1:
        icon_dir = Path(sys.argv[1]).resolve()
        icon_sets = ((icon_dir, tuple(path.name for path in sorted(icon_dir.glob('*.png')))),)
    else:
        icon_sets = (
            (project_dir / 'src' / 'assets' / 'icons', NAVIGATION_ICONS),
            (project_dir / 'public' / 'icons', PLACE_TYPE_ICONS),
        )

    failures: list[str] = []
    validated = 0
    for icon_dir, expected in icon_sets:
        display_dir = icon_dir.relative_to(project_dir) if icon_dir.is_relative_to(project_dir) else icon_dir
        print(f'\n[{display_dir}]')
        for filename in expected:
            path = icon_dir / filename
            if not path.is_file():
                failures.append(f'{filename}: missing from {icon_dir}')
                continue
            validated += 1
            failures.extend(f'{filename}: {error}' for error in validate(path))

    if failures:
        print('\nValidation failed:', file=sys.stderr)
        for failure in failures:
            print(f'- {failure}', file=sys.stderr)
        return 1

    print(f'\nValidated {validated} transparent RGBA PNG icons.')
    return 0


def legacy_main() -> int:
    default_dir = Path(__file__).resolve().parents[1] / "src" / "assets" / "icons"
    icon_dir = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else default_dir
    failures: list[str] = []

    for filename in EXPECTED:
        path = icon_dir / filename
        if not path.is_file():
            failures.append(f"{filename}: missing")
            continue
        failures.extend(f"{filename}: {error}" for error in validate(path))

    if failures:
        print("\nValidation failed:", file=sys.stderr)
        for failure in failures:
            print(f"- {failure}", file=sys.stderr)
        return 1

    print(f"\nValidated {len(EXPECTED)} transparent RGBA PNG icons.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
