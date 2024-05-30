
import {permission} from "@/directive/permission/permission";
import type {App} from "vue";
export function getDirective(app:App) {
    app.directive('v-permission', permission)
    return app
}
