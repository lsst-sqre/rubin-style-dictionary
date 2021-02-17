#########
tokens.js
#########

:file:`tokens.js` is an ES6 module where tokens are published as importable variables (with camel-cased names).

.. note::

   Themed tokens are included in the module with a ``ThemedLight`` or ``ThemedDark`` suffix, unlike :doc:`tokens.css` and :doc:`tokens.dark.css`.

Example
=======

.. code-block:: js

   import { ComponentTextColorThemedDark } from '@lsst-sqre/rubin-style-dictionary';

Source
======

.. literalinclude:: ../dist/tokens.js
   :language: js
   :lines: 5-
