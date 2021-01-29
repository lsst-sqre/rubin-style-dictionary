const styleDictionary = require('style-dictionary');
const yaml = require('yaml');

/* From style-dictionary/lib/common/formats.js */
function fileHeader(options, commentStyle) {
  var to_ret = '';
  // for backward compatibility we need to have the user explicitly hide them
  var showFileHeader = options ? options.showFileHeader : true;
  if (showFileHeader) {
    if (commentStyle === 'short') {
      to_ret += '\n';
      to_ret += '// Do not edit directly\n';
      to_ret += '// Generated on ' + new Date().toUTCString() + '\n';
      to_ret += '\n';
    } else {
      to_ret += '/**\n';
      to_ret += ' * Do not edit directly\n';
      to_ret += ' * Generated on ' + new Date().toUTCString() + '\n';
      to_ret += ' */\n\n';
    }
  }

  return to_ret;
}

/* From style-dictionary/lib/common/formats.js */
function variablesWithPrefix(prefix, properties, commentStyle) {
  return properties
    .map(function (prop) {
      var to_ret_prop =
        prefix +
        prop.name +
        ': ' +
        (prop.attributes.category === 'asset'
          ? '"' + prop.value + '"'
          : prop.value) +
        ';';

      if (prop.comment) {
        if (commentStyle === 'short') {
          to_ret_prop = to_ret_prop.concat(' // ' + prop.comment);
        } else {
          to_ret_prop = to_ret_prop.concat(' /* ' + prop.comment + ' */');
        }
      }

      return to_ret_prop;
    })
    .filter(function (strVal) {
      return !!strVal;
    })
    .join('\n');
}

// Register css/dark custom format that uses a body.dark selector
// for "dark" mode tokens.
styleDictionary.registerFormat({
  name: 'css/dark',
  formatter: function (dictionary) {
    return (
      fileHeader(this.options) +
      'body.dark {\n' +
      variablesWithPrefix('  --', dictionary.allProperties) +
      '\n}\n'
    );
  },
});

const config = {
  parsers: [
    {
      pattern: /\.yaml$/,
      // The parse function takes a single argument, which is an object with
      // 2 attributes: contents which is a string of the file contents, and
      // filePath which is the path of the file.
      // The function is expected to return a plain object.
      parse: ({ contents, filePath }) => yaml.parse(contents),
    },
  ],
  source: [`src/**/*.yaml`],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      prefix: 'token',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
    cssDark: {
      transformGroup: 'css',
      buildPath: 'dist/',
      prefix: 'token',
      files: [
        {
          destination: 'tokens.dark.css',
          format: 'css/dark',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
  },
};
const SD = styleDictionary.extend(config);
SD.buildAllPlatforms();
