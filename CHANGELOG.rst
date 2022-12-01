##########
Change log
##########

0.4.0 (2022-12-01)
==================

Added "crop" variants of all full-size and intermediate-size Rubin imagotype assets.
For example, ``assets/rubin-imagotype/rubin-imagotype-color-on-white-crop.svg`` is a cropped version of ``assets/rubin-imagotype/rubin-imagotype-color-on-white.svg``.
The original imagotypes included a default margin.
These new "crop" variants are cropped right to the art, so that the imagotype can align with other content in CSS/HTML layouts.

0.3.0 (2021-05-06)
==================

- Added image assets from the Rubin Visual Identity, including imagotypes (full scale, intermediate, and favicon), watermarks, and partner logos.
The full and intermediate-scale imagotypes in this distribution are additionally cropped so that the clearance corresponds to the desired "N" spacing.

  These files can be imported from the NPM package as regular static assets.
  Additionally, these assets are distributed in JSON files as Base 64-encoded strings.

- Support for theming with next-themes.

- Initial design tokens from components originating in the Squareone application (https://github.com/lsst-sqre/rsp-squareone).

- Fixed ``color.green.500`` to be the correct color from the Visual Identity Manual (previously it was the same as ``color.purple.500``).

- Development dependencies:

- Updated lodash to 4.17.21
- Updated style-dictionary to 3.0.0-rc.8

0.2.1 (2021-02-17)
==================

This version features a revised organization of design tokens:

- Global design tokens are abstract values taken from the Rubin Visual Identity Manual, such as colors.
- Component design tokens tie the global tokens to semantically relevant components, such as the color of text in a button.
- Component design tokens can be themed.

0.1.0 (2021-01-27)
==================

This initial release of rubin-style-dictionary demonstrates how design tokens from the Rubin Visual Identity Manual can be encoded with Style Dictionary and exported to formats ready to use in applications.
