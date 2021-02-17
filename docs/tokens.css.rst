##########
tokens.css
##########

This CSS file contains tokens, as CSS custom properties, corresponding to both "unthemed" tokens and tokens corresponding to the ``light`` theme.
See :doc:`tokens.dark.css` for the tokens corresponding to the dark theme.

Example
=======

In a Next.js application, you can directly import this CSS file into your app wrapper (:file:`pages/_app.js`):

.. code-block:: js
   :emphasize-lines: 1

   import '@lsst-sqre/rubin-style-dictionary/dist/tokens.css';
   import '@lsst-sqre/rubin-style-dictionary/dist/tokens.dark.css';

Source
======

.. literalinclude:: ../dist/tokens.css
   :language: css
   :lines: 5-
