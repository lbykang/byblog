import fetch from "@/config/fetch";

/**
 * 登陆
 */

export const login = (data) => fetch("/auth/api/login", data, "POST");

/**
 * 退出
 */

export const signout = () => fetch("/admin/signout");

export const getLinks = () => fetch("/auth/link/getLink");

/**
 * 获取menu详情
 */

export const getMenuById = (category_id) =>
  fetch("/shopping/v2/menu/" + category_id);
