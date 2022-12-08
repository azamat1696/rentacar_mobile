import {Notify} from "quasar";
import { routerInstance } from 'boot/customRouteInstance'
export function ErrorHandlePrint (errorsObj) {
  const statusCode = errorsObj.response.status
  if (statusCode === 401) {
    routerInstance.push({name : 'login'})
  }
  let errors = errorsObj.response.data.payload
  let errorMsgTimeout = 1000;
  for (const [k,v] of Object.entries(errors))
  {
    errorMsgTimeout += 1000
    errors[k].forEach(e => {
      Notify.create({
        type:'negative',
        message: e,
        timeout:errorMsgTimeout,
        position:'bottom-right',
        progress:true
      })
    })
  }
}
