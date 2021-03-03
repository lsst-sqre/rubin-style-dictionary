##########
Change log
##########

0.3.0 (unreleased)
==================

Added image assets from the Rubin Visual Identity, including imagotypes, favicons, and watermarks.
These files can be imported from the NPM package.
Additionally, these assets are distributed in JSON files as Base 64-encoded strings.

Development dependencies:

- Updated lodash to 4.17.21

0.2.1 (2021-02-17)
==================

This version features a revised organization of design tokens:

- Global design tokens are abstract values taken from the Rubin Visual Identity Manual, such as colors.
- Component design tokens tie the global tokens to semantically relevant components, such as the color of text in a button.
- Component design tokens can be themed.

0.1.0 (2021-01-27)
==================

This initial release of rubin-style-dictionary demonstrates how design tokens from the Rubin Visual Identity Manual can be encoded with Style Dictionary and exported to formats ready to use in applications.
