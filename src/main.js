import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import Resource from 'vue-resource'
import App from './components/app'

window.onerror = message => window.alert(message)

Vue.use(Resource)
new Vue({el: 'body', components: {App}})
