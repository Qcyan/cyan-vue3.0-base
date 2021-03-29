import { getCurrentInstance } from 'vue'
function useGlobal() {
  const {
    appContext: {
      config: { globalProperties }
    }
  } = getCurrentInstance()
  console.log(getCurrentInstance())
  return globalProperties
}
export default useGlobal
