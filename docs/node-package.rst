######################
Using the node package
######################

|RSD| is published as a Node package (|rsd-pkg|) on GitHub Packages, making it convenient to use from web projects.
This page describes how to install and use the design tokens in the |rsd-pkg| package.

Local authentication and installation
=====================================

You need to configure your package manager (``npm`` as a specific example) to authenticate with GitHub Packages to install your package though.

Log into GitHub and `create a new Personal Access Token <https://github.com/settings/tokens/new>`__.
The token needs the ``read:packages`` role, at a minimum.

Use the generated token value on the command line:

.. code-block:: sh

   npm login --scope=@lsst-sqre --registry=https://npm.pkg.github.com

The ``username`` is your GitHub username, and ``password`` is your token.
This command writes login information to your :file:`~/.npmrc` file.

Next, configure your project to use the ``@lsst-sqre`` scope.
In the root of your project repository (directory that contains :file:`package.json`), create a :file:`.npmrc` file with the following contents:

.. code-block:: text

   @lsst-sqre:registry=https://npm.pkg.github.com/

Finally, install the package:

.. code-block:: sh

   npm install @lsst-sqre/rubin-style-dictionary

Using the token files
=====================

Once the package is installed, you can access token files in different formats in the :file:`dist` directory of the installed package:

.. code-block:: text

   node_modules/@lsst-sqre/rubin-style-dictionary/dist/

For example, in a Next.js project you can directly import CSS into your app wrapper page:

.. code-block:: js

   import '@lsst-sqre/rubin-style-dictionary/dist/tokens.css';
   import '@lsst-sqre/rubin-style-dictionary/dist/tokens.dark.css';

Installing on GitHub Actions
============================

Your project's CI service also needs to use to authenticate with GitHub Packages to download and install |rsd-pkg|.
In the specific case of a GitHub Actions workflow, you can use the built-in ``$GITHUB_TOKEN`` environment variable.

.. code-block:: yaml

   name: CI

   on: [push, pull_request]

   jobs:

     build:
      runs-on: ubuntu-latest

       steps:
         - uses: actions/checkout@v2

         - name: Read .nvmrc
           id: node_version
           run: echo ::set-output name=NODE_VERSION::$(cat .nvmrc)

         - name: Set up node
           uses: actions/setup-node@v2

         - name: Install npm packages
           run: |
             echo "//npm.pkg.github.com/:_authToken=${NPM_PKG_TOKEN}" > ~/.npmrc
             npm install
           env:
             NPM_PKG_TOKEN: ${{ secrets.GITHUB_TOKEN }}

         - name: Build site
           run: npm run build  # replace with your build command
