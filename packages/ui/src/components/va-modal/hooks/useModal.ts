import { getCurrentInstance } from 'vue'
import { createModalInstance } from '../modal'
import { ModalOptions } from '../types'

/** This hook can be used without plugin used */
export const useModal = () => {
  const appContext = getCurrentInstance()?.appContext

  if (!appContext) {
    throw new Error('useModal can be used only in setup function. You can use app.config.globalProperties.$vaModal outside setup function')
  }

  /**
   * @param options can be message string or options object
   */

  const init = (options: string | ModalOptions) => {
    const modalInstance = createModalInstance(options, appContext)
    const close = () => {
      console.log(modalInstance)
      modalInstance.props!.onClose()
    }
    return { modalInstance, close }
  }

  /**
   * @param options can be message string or options object
   * @returns Promise with boolean value. True if modal was confirmed, false if modal was canceled
   */
  const confirm = (options: string | ModalOptions) => {
    if (typeof options === 'string') {
      const modalInstance = (resolve:any) => {
        return createModalInstance({
          message: options as string,
          onOk () {
            resolve(true)
          },
          onCancel () {
            resolve(false)
          },
        }, appContext)
      }

      // const vNode = modalInstance()
      // console.log(vNode.props!.onOk)
      // const close = () => {

      //   // modalInstance.props!.onOk()
      // }
      const promiseInit = new Promise<boolean>((resolve, reject) => {
        modalInstance(resolve)
      })
      // console.log(promiseInit)

      return {
        promiseInit,
        close,
      }
    } else {
      const promiseInit = new Promise<boolean>((resolve, reject) => {
        createModalInstance({
          ...options,
          onOk () {
            options?.onOk?.()
            resolve(true)
          },
          onCancel () {
            options?.onCancel?.()
            resolve(false)
          },
        }, appContext)
      })

      // const promise = promiseInit.then(
      //   (result) => result,
      //   (error) => alert('error'),
      // )
      console.log(promiseInit)

      return {
        promiseInit,
      }
    }

    // const onOk = modalInstance.props!.onOk()
  }

  return { init, confirm, close }
}
