// Example of error from GraphQL: [{ path: '', message: '' }]
/**
 *
 * {
 *  email: ['error1', 'error2']
 * }
 *
 */

export default errors =>
  errors.reduce((acc, err) => {
    if (err.path in acc) {
      acc[err.path].push(err.message);
    } else {
      acc[err.path] = [err.message];
    }
    return acc;
  }, {});
