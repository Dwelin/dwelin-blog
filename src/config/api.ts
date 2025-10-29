// API配置 - 前端使用
export const apiConfig = {
  // 获取当前环境的API URL
  getApiUrl(): string {
    const isDev = import.meta.env.DEV;
    if (isDev) {
      // 开发环境：使用环境变量或默认值
      const apiUrl = import.meta.env.VITE_API_URL || "http://dwelin.me/api/v1";
      console.log("🔧 开发环境：API 请求将直接访问", apiUrl);
      return apiUrl;
    }
    // 生产环境：直接使用 dwelin.cn 域名
    const apiUrl = import.meta.env.VITE_API_URL || "http://dwelin.cn/api/v1";
    console.log("🚀 生产环境：API 请求将直接访问", apiUrl);
    return apiUrl;
  },

  // API端点
  endpoints: {
    // 文章相关
    posts: {
      list: "/posts",
      detail: (id: string | number) => `/posts/${id}`,
      search: "/posts/search",
      popular: "/posts/popular",
      incrementViews: (id: string | number) => `/posts/${id}/views`
    },

    // 分类相关
    categories: {
      list: "/categories"
    },

    // 标签相关
    tags: {
      list: "/tags"
    },

    // 统计信息
    stats: "/stats",

    // 下拉列表
    select: {
      list: "/select"
    }
  },

  // 请求配置
  request: {
    timeout: 10000, // 10秒超时
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  },

  // 响应处理
  response: {
    // 成功状态码
    successCodes: [200, 201],

    // 错误状态码处理
    errorCodes: {
      400: "请求参数错误",
      401: "未授权访问",
      403: "禁止访问",
      404: "资源不存在",
      422: "数据验证失败",
      500: "服务器内部错误"
    }
  }
};

// API请求工具类
export class ApiClient {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || apiConfig.getApiUrl();
  }

  /**
   * 发送GET请求
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(this.baseURL + endpoint);

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key].toString());
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: apiConfig.request.headers
    });

    return this.handleResponse<T>(response);
  }

  /**
   * 发送POST请求
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(this.baseURL + endpoint, {
      method: "POST",
      headers: apiConfig.request.headers,
      body: data ? JSON.stringify(data) : undefined
    });

    return this.handleResponse<T>(response);
  }

  /**
   * 处理响应
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorMessage =
        apiConfig.response.errorCodes[response.status as keyof typeof apiConfig.response.errorCodes] || "请求失败";
      throw new Error(`${errorMessage} (${response.status})`);
    }

    const data = await response.json();

    if (data.code !== 200) {
      throw new Error(data.message || "请求失败");
    }

    return data;
  }
}

// 创建默认API客户端实例
export const apiClient = new ApiClient();

// API服务类
export class ApiService {
  /**
   * 获取文章列表
   */
  static async getPosts(params?: { page?: number; per_page?: number; category_id?: number; tag_id?: number; search?: string }) {
    return apiClient.get(apiConfig.endpoints.posts.list, params);
  }

  /**
   * 获取文章详情
   */
  static async getPost(id: string | number) {
    return apiClient.get(apiConfig.endpoints.posts.detail(id));
  }

  /**
   * 搜索文章
   */
  static async searchPosts(params: { keyword: string; page?: number; per_page?: number }) {
    return apiClient.get(apiConfig.endpoints.posts.search, params);
  }

  /**
   * 获取热门文章
   */
  static async getPopularPosts() {
    return apiClient.get(apiConfig.endpoints.posts.popular);
  }

  /**
   * 增加文章浏览量
   */
  static async incrementViews(id: string | number) {
    return apiClient.get(apiConfig.endpoints.posts.incrementViews(id));
  }

  /**
   * 获取分类列表
   */
  static async getCategories() {
    return apiClient.get(apiConfig.endpoints.categories.list);
  }

  /**
   * 获取标签列表
   */
  static async getTags() {
    return apiClient.get(apiConfig.endpoints.tags.list);
  }

  /**
   * 获取统计信息
   */
  static async getStats() {
    return apiClient.get(apiConfig.endpoints.stats);
  }

  /**
   * 获取下拉列表
   */
  static async getSelectList(params: { keys: string[] }) {
    return apiClient.post(apiConfig.endpoints.select.list, params);
  }
}

export default apiConfig;
