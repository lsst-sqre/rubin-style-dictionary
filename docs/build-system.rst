#####################
Build system overview
#####################

|RSD| uses |SD| through its `API <https://amzn.github.io/style-dictionary/#/api>`_ rather than as a command-line app configured with a JSON file.
This approach makes it possible to substantially customize the build process to accommodate feature such as component tokens and themed tokens.

Build script
============

The ``build.js`` script, for reference:

.. literalinclude:: ../build.js
