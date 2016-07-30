import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import Resource from 'vue-resource'
import App from './components/app'
import setFavicon from './lib/set-favicon'
import addManifest from './lib/add-manifest'

setFavicon()
addManifest()
Vue.use(Resource)
new Vue({el: 'body', components: {App}})
