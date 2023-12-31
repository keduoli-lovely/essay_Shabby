// import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

// app.use(ElementPlus)



import { createSSRApp } from 'vue';
import * as Pinia from 'pinia';

export function createApp() {
	const app = createSSRApp(App);
	
	for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	  app.component(key, component)
	}
	app.use(ElementPlus)
	app.use(Pinia.createPinia());
	return {
		app,
		Pinia, // 此处必须将 Pinia 返回
	};
}
