// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAdXq1J9HeXUTKHYa_FyY64TN-jpdALwDw',
    authDomain: 'beans-react.firebaseapp.com',
    databaseURL: 'https://beans-react.firebaseio.com',
    projectId: 'beans-react',
    storageBucket: 'beans-react.appspot.com',
    messagingSenderId: '293029011654'
  }
};
