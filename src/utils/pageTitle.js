import { title } from '@/config/setting.config.js'

/**
 * @description 设置标题
 * @param pageTitle
 * @returns {string}
 */
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}-${title}`
  }
  return `${title}`
}
