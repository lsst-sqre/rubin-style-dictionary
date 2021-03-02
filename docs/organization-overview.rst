##############################
Overview of token organization
##############################

|RSD| is built around the `style-dictionary`_ tool, which allows us to express design tokens hierarchically in YAML files, and then export those tokens in a variety of formats.
|RSD| uses a customized build process that allows you to define both *global design tokens* and *component-level design tokens,* as well as associate specific token values with *themes* (such as light and dark).

This page provides an overview for what the different types of tokens are, and how these tokens are organized.

YAML files and token organization
=================================

Tokens are defined in YAML files that reside in the :file:`src` directory of the |rsd-repo|.

Tokens are arranged in hierarchical paths that are expressed as mappings in the YAML files.
For example:

For example, a token with path ``color.gray.900`` is expressed as:

.. code-block:: yaml

   color:
     gray:
       "900":
         value: #000000

For :ref:`global design tokens <global-design-tokens>`, these hierarchical mappings follow a "CTI" organization, which stands for Category-Type-Item.

**Category** is the token's type, which is typically color, size, time, or a text/content type.
The category indicates to |SD| how the token value should be handled and transformed if necessary.

**Type** is the token's family.
In the above example, the type is "gray" so all grayscale shade tokens are arranged under the ``color.gray`` path.

**Item** is, in most cases, the endpoint of the path and is where the ``value`` is found.
In the above example, the item is ``900``, which is the name we give to the darkest shade.
A middle gray might have an item name of ``500``, and white would have an item name of ``000``.

In addition to the basic CTI path, some tokens can have additional path components.
This comes up in the context of :ref:`component-design-tokens` where an item might have variant values corresponding to a theme, a sub-item, or a state (disabled, active, base).

.. seealso::

   Read about `Properties in the Style Dictionary documentation <https://amzn.github.io/style-dictionary/#/properties>`__ for more information and background.

.. _global-design-tokens:

Global design tokens
====================

Global design tokens define the essence of of the Rubin design system, and quite often these design tokens are based on the Rubin |VIM|.
For example, global design tokens are available for the primary observatory colors, the shades of gray, complementary primary colors, and so on.
Component design tokens reference these global design tokens to, for example, define the background color of a box as being the primary Rubin teal.

The global design tokens are defined in YAML files within a specific set of categorical directories inside the :file:`src` directory:

- :file:`src/color/` contains the color tokens
- :file:`src/size/` contains size tokens
- :file:`src/time/` contains time duration tokens (often used for animations)
- :file:`src/asset/` contains references to assets

.. note::

   :file:`src/component` is different: that's where component design tokens are stored.
   More about those in :ref:`component-design-tokens`

.. note::

   More categories can be added in the future.
   These are based on the |SD| examples.

Global color tokens
-------------------

Global color tokens have paths with the pattern ``color.[family].[shade]``.
The *family* is the color family, which might be "primary" for the primary color, "gray" for grayscales, or the name of a primary color like "green".
Shades are typically numeric values from ``000`` (lightest) to ``900`` (darkest).

For example, these are the ``color.primary`` design tokens (:file:`src/color/primary.yaml`):

.. literalinclude:: ../src/color/primary.yaml

.. _component-design-tokens:

Component design tokens
=======================

Components are entities in your interfaces and designs.
Components might be hyper-specific, like a login button, or actually quite general like the default color of links.
Thus with *component design tokens,* the abstract grid of token values specified as :ref:`global design tokens <global-design-tokens>` become semantically associated with entities in your UI.

All component tokens are contained within the :file:`src/component` directory, and the top-level path is always ``component``.

Component design tokens are arranged differently than global design tokens, which follow the CTI structure.
Instead, the "item" becomes the trunk of the path, and the categories like sizes or colors becomes the leaves:

.. code-block:: yaml

   component:
     button:
       background:
         color:
           value: "{color.primary.600}"
       text:
         color:
           value: "{color.primary.100}"

.. _themed-tokens:

Themed component design tokens
==============================

Component tokens can be themed.

Theming allows a design token to take on multiple values depending on a theme context.
Specifically in CSS custom properties (variables) this means that a single variable can have multiple values, but scoped by different selectors.

Themed tokens have paths that end with ``themed.[theme-name]``.
For example, a themed button:

.. code-block:: yaml

   component:
     button:
       background:
         color:
           themed:
             light:
               value: "{color.primary.600}"
             dark:
               value: "{color.primary.100}"
       text:
         color:
           themed:
             light:
               value: "{color.primary.100}"
             dark:
               value: "{color.primary.600}"

In the build process, "light" themed (and unthemed) variables are included in the default export:

.. code-block:: css

   :root {
     --rsd-component-button-background-color: #058B8C;
     --rsd-component-button-text-color: #F5F5F5;
   }

The "dark" theme export includes the ``themed.dark`` versions of those components, but with a ``body.dark`` selector:

.. code-block:: css

   body.dark {
     --rsd-component-button-background-color: #F5F5F5;
     --rsd-component-button-text-color: #058B8C;
   }

In a web project, the dark mode is activated by added a ``dark`` class to the ``body`` element.

At the moment, the only themes are "light" and "dark".
Again, the "light" theme is treated as the default.
