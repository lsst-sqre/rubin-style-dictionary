###############
tokens.dark.css
###############

This CSS file contains tokens, as CSS custom properties, corresponding only to the ``dark`` theme.
Since these CSS custom properties are scoped with the ``body.dark`` selector, and shadow the names of default or ``light`` themed tokens, these tokens become active when the ``dark`` class is applied to the body.
See :doc:`tokens.css` for the tokens corresponding to the light theme and to unthemed tokens.

Example
=======

In a Next.js application, you can directly import this CSS file into your app wrapper (:file:`pages/_app.js`):

.. code-block:: js
   :emphasize-lines: 2

   import '@lsst-sqre/rubin-style-dictionary/dist/tokens.css';
   import '@lsst-sqre/rubin-style-dictionary/dist/tokens.dark.css';

Source
======

.. literalinclude:: ../dist/tokens.dark.css
   :language: css
   :lines: 5-
