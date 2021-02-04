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

// Map component properties to style-dictionary's CTI taxonomy
// (In components, the "C" and "I" are reversed).
// From the component-cti example in style-dictionary
//
const propertiesToCTI = {
  width: { category: 'size', type: 'dimension' },
  'min-width': { category: 'size', type: 'dimension' },
  'max-width': { category: 'size', type: 'dimension' },
  height: { category: 'size', type: 'dimension' },
  'min-height': { category: 'size', type: 'dimension' },
  'max-height': { category: 'size', type: 'dimension' },
  'border-width': { category: 'size', type: 'border', item: 'width' },
  'border-radius': { category: 'size', type: 'border', item: 'width' },
  'border-color': { category: 'color', type: 'border' },
  'background-color': { category: 'color', type: 'background' },
  color: { category: 'color', type: 'font' },
  'text-color': { category: 'color', type: 'font' },
  padding: { category: 'size', type: 'padding' },
  'padding-vertical': { category: 'size', type: 'padding' },
  'padding-horizontal': { category: 'size', type: 'padding' },
  icon: { category: 'content', type: 'icon' },
  'font-size': { category: 'size', type: 'font' },
  'line-height': { category: 'size', type: 'line-height' },
  size: { category: 'size', type: 'icon' },
};

// Custom transform for components
const CTITransform = {
  transformer: (prop) => {
    // Only do this custom functionality in the 'component' top-level namespace.
    if (prop.path[0] === 'component') {
      // When defining component tokens, the key of the token is the relevant CSS property
      // The key of the token is the last element in the path array
      return propertiesToCTI[prop.path[prop.path.length - 1]];
    } else {
      // Fallback to the original 'attribute/cti' transformer
      return styleDictionary.transform['attribute/cti'].transformer(prop);
    }
  },
};

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
  transform: {
    // Override the built-in attribute/cti transform
    'attribute/cti': CTITransform,
  },
  source: [`src/**/*.yaml`],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      prefix: 'rsd',
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
      prefix: 'rsd',
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
