import { RolesEnum } from "@/enum/RolesEnum";
import { forEach, forIn } from "cypress/types/lodash";
import { defineStore } from "pinia"

export const AuthorizationStore = defineStore('AuthorizationStore', {
  state: () => ({
    authenticaded: localStorage.getItem("authenticaded"),
  }),
  actions: {
    getUserRoles() {
      const userInfoJSON = localStorage.getItem('userInfo');
      if (userInfoJSON) {
        const userInfo = JSON.parse(userInfoJSON);
        return userInfo.roles;
      } else {
        return null;
      }
    },
    hasAuthorization(roles: RolesEnum[]) {

      if (!roles)
        return false
      if (roles.includes(RolesEnum.ANY))
        return true
      return this.getUserRoles().some(role => roles.includes(role));;
    },
    hasAuthorizationOfThisAction(role: RolesEnum) {
      const userRoles = this.getUserRoles();
      return userRoles.includes(role) || userRoles.includes(RolesEnum.MASTER);
    }
  },
})