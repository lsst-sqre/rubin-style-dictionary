import os
import sys
import re
from typing import List

import lsst_sphinx_bootstrap_theme

from documenteer.sphinxconfig.utils import form_ltd_edition_name

# Work around Sphinx bug related to large and highly-nested source files
sys.setrecursionlimit(2000)

# -- General configuration ------------------------------------------------

# If your documentation needs a minimal Sphinx version, state it here.
# needs_sphinx = '1.0'

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    "sphinx.ext.intersphinx",
    "documenteer.sphinxext",
]

# The suffix(es) of source filenames.
# You can specify multiple suffix as a list of string:
# source_suffix = ['.rst', '.md']
source_suffix = ".rst"

# The master toctree document.
master_doc = "index"

# General information about the project.
project = "Rubin Style Dictionary"
copyright = (
    "2021 "
    "Association of Universities for Research in Astronomy, Inc. (AURA)"
)
author = "Rubin Observatory"

# The version info for the project you're documenting, acts as replacement for
# |version| and |release|, also used in various other places throughout the
# built documents.
#
# The short X.Y version.
github_ref = os.getenv("GITHUB_REF", "")
if github_ref == "":
    git_ref = "master"
else:
    match = re.match(r"refs/(heads|tags|pull)/(?P<ref>.+)", github_ref)
    if not match:
        git_ref = "master"
    else:
        git_ref = match.group("ref")

version = form_ltd_edition_name(git_ref)
# The full version, including alpha/beta/rc tags.
release = version

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#
# This is also used if you do content translation via gettext catalogs.
# Usually you set "language" from the command line for these cases.
language = None

# There are two options for replacing |today|: either, you set today to some
# non-false value, then it is used:
# today = ''
# Else, today_fmt is used as the format for a strftime call.
# today_fmt = '%B %d, %Y'

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
exclude_patterns = ["_build", "conf.py", "Makefile"]

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = "sphinx"

# The reST default role cross-links Python (used for this markup: `text`)
default_role = "py:obj"

# Intersphinx

intersphinx_mapping = {
}

# Warnings to ignore
nitpick_ignore = [
    # This link to the base pybtex still never resolves because it is not
    # in pybtex's intersphinx'd API reference.
    ("py:class", "pybtex.style.formatting.plain.Style"),
]

# -- Options for linkcheck builder ----------------------------------------

linkcheck_retries = 2

# Since Jira is currently down at this time
linkcheck_ignore = [r"^https://jira.lsstcorp.org/browse/"]

linkcheck_timeout = 15

# -- Options for HTML output ----------------------------------------------

templates_path = [
    "_templates",
    lsst_sphinx_bootstrap_theme.get_html_templates_path(),
]

html_theme = "lsst_sphinx_bootstrap_theme"
html_theme_path = [lsst_sphinx_bootstrap_theme.get_html_theme_path()]


html_context = {
    # Enable "Edit in GitHub" link
    "display_github": True,
    # https://{{ github_host|default("github.com") }}/{{ github_user }}/
    #     {{ github_repo }}/blob/
    #     {{ github_version }}{{ conf_py_path }}{{ pagename }}{{ suffix }}
    "github_user": "lsst-sqre",
    "github_repo": "rubin-style-dictionary",
    "conf_py_path": "docs/",
    # TRAVIS_BRANCH is available in CI, but master is a safe default
    "github_version": os.getenv("TRAVIS_BRANCH", default="master") + "/",
}

# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.
html_theme_options = {"logotext": project}

# The name for this set of Sphinx documents.  If None, it defaults to
# "<project> v<release> documentation".
# html_title = None

# A shorter title for the navigation bar.  Default is the same as html_title.
html_short_title = "Rubin Style Dictionary"

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path: List[str] = []

# If true, links to the reST sources are added to the pages.
html_show_sourcelink = False

# Content that is added to the footer of every page
rst_epilog = """

.. _style-dictionary: https://amzn.github.io/style-dictionary/

.. |RSD| replace:: Rubin Style Dictionary
.. |rsd-pkg| replace:: ``@lsst-sqre/rubin-style-dictionary``
"""