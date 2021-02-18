function template(
    { template },
    opts,
    { jsx, newline = '\n' },
  ) {
    return template.ast`
    import React from 'react';
    ${newline}
    export default () => (
        ${jsx}
    )`
  }
  module.exports = template