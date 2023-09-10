import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { VueFire, VueFireAuth } from 'vuefire';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDOBH_5P28IITRoitlPefM1pwAcDyrm3Lw',
  authDomain: 'game-project-253d4.firebaseapp.com',
  projectId: 'game-project-253d4',
  storageBucket: 'game-project-253d4.appspot.com',
  messagingSenderId: '962338734218',
  appId: '1:962338734218:web:68cfdca92052ee4982ad73'
});

export default boot(async ({app}) => {

  app.use(VueFire, {
    firebaseApp,

    modules: [
      VueFireAuth()
    ]
  })
});
